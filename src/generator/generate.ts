import { CombinatorDeclaration, ETypeIdentifier, OptionalVariableIdentifier, TLProgram } from "../parser/ast";
import { parseSchema } from "../parser/parseSchema";
import { CodeBuilder } from "./CodeBuilder";
import * as crc from "crc-32";

const BUILT_IN = [
    'false',
    'true',
    'bytes',
    'boolTrue',
    'boolFalse',
    'vector',
    'int128',
    'int256'
];

function normalizeName(name: string) {
    return name.replaceAll('.', '_');
}

function getTypeName(id: ETypeIdentifier) {
    if (id.id.name === 'string') {
        return 'TLString';
    }
    if (id.id.name === 'int256') {
        return 'TLInt256';
    }
    if (id.id.name === 'int') {
        return 'TLInt';
    }
    if (id.id.name === 'bytes') {
        return 'TLBytes';
    }
    if (id.id.name === 'long') {
        return 'TLLong';
    }
    if (id.id.name === '#') {
        return 'TLFlag';
    }
    if (id.id.name === 'Bool') {
        return 'TLBool';
    }

    return normalizeName(id.id.name)
}

function getEncoderFnForType(id: OptionalVariableIdentifier, type: ETypeIdentifier) {
    if (type.id.name === 'string') {
        return `encoder.writeString(this.${id.name})`;
    }
    if (type.id.name === 'int256') {
        return `encoder.writeInt256Buff(this.${id.name})`;
    }
    if (type.id.name === 'int') {
        return `encoder.writeInt32(this.${id.name})`;
    }
    if (type.id.name === 'bytes') {
        return `encoder.writeBuffer(this.${id.name})`;
    }
    if (type.id.name === 'long') {
        return `encoder.writeInt64(this.${id.name})`;
    }
    if (type.id.name === '#') {
        return `encoder.writeInt32(this.${id.name})`;
    }
    return `encoder.writeType(this.${id.name})`;
}

function getDecoderFnForType(id: OptionalVariableIdentifier, type: ETypeIdentifier) {
    if (type.id.name === 'string') {
        return `let ${id.name} = decoder.readBuff()`
    }
    if (type.id.name === 'int256') {
        return `let ${id.name} = decoder.readInt256Buff()`
    }
    if (type.id.name === 'int') {
        return `let ${id.name} = decoder.readInt32()`
    }
    if (type.id.name === 'bytes') {
        return `let ${id.name} = decoder.readBuff()`
    }
    if (type.id.name === 'long') {
        return `let ${id.name} = decoder.readInt64()`
    }
    if (type.id.name === '#') {
        return `let ${id.name} = decoder.readInt32()`
    }
    if (type.id.name === 'Bool') {
        return `let ${id.name} = decoder.readBool()`
    }
    return `let ${id.name} = decoder.readType(${normalizeName(type.id.name)})`
    // throw new Error('Unknown type')
    // return id.id.name
}

function generateType(decl: CombinatorDeclaration, typeId: number) {
    let code = new CodeBuilder()
    code.add(`export class ${normalizeName(decl.id.name)} extends TLType {`)
    code.inTab(() => {
        code.add(`static typeId = ${typeId};`)
        code.add();

        //
        // Constructor
        //

        let fields: string[] = []
        for (let field of decl.args) {
            if (field.argType.expression.type !== 'ETypeIdentifier') {
                continue
            }
            fields.push(`public ${field.id.name}: ${getTypeName(field.argType.expression)}`)
        }

        code.add(`constructor(${fields.join(', ')}) {`);
        code.inTab(() => {
            code.add('super();');
        });
        code.add('}');
        code.add();

        //
        // ID
        //

        code.add(`getId = () => ${typeId};`);
        code.add();

        //
        // Encoder
        //

        code.add(`encode = (encoder: TLWriteBuffer) => {`);
        code.inTab(() => {
            for (let field of decl.args) {
                if (field.argType.expression.type !== 'ETypeIdentifier') {
                    continue;
                }
                code.add(getEncoderFnForType(field.id, field.argType.expression));
            }
        });
        code.add('}');

        //
        // Decoder
        //

        code.add();
        code.add('static decode = (decoder: TLReadBuffer) => {');
        code.inTab(() => {
            let fs: string[] = [];
            for (let field of decl.args) {
                if (field.argType.expression.type !== 'ETypeIdentifier') {
                    continue
                }
                fs.push(field.id.name);
                code.add(getDecoderFnForType(field.id, field.argType.expression));
            }
            code.add(`return new ${normalizeName(decl.id.name)}(${fs.join(', ')})`);
        })
        code.add('}');

    });
    code.add('}')
    return code;
}

export function generate(schema: string) {

    // Parse
    let srcLines = schema.split('\n');
    let src = parseSchema(schema);

    // Header
    let code = new CodeBuilder();
    code.add('import { TLWriteBuffer, TLReadBuffer, TLType, TLFlag, TLInt, TLString, TLLong, TLInt256, TLInt128, TLBytes, TLBool } from "ton-tl";');
    code.add();

    // Process declaration
    for (let declaration of src.constructors.declarations) {
        if (declaration.type === 'CombinatorDeclaration') {
            if (BUILT_IN.includes(declaration.id.name)) {
                continue;
            }

            let declLine = srcLines[declaration.start.line - 1]
            let typeId = crc.str(declLine.slice(0, -1))
            code.append(generateType(declaration, typeId));
            code.add()

        } else if (declaration.type === 'BuiltinCombinatorDeclaration') {
            continue; // Ignores built in aliases
        } else {
            throw Error('Unknown declaration: ' + declaration.type);
        }
    }

    return code.render();
}