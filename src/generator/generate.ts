import { CombinatorDeclaration, ETypeIdentifier, OptionalVariableIdentifier } from "../parser/ast";
import { parseSchema } from "../parser/parseSchema";
import { CodeBuilder } from "./CodeBuilder";
import * as crc from "crc-32";
import { snakeToCamel } from 'case-shift';

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

function isTypeName(name: string) {
    let p = name.split('.');
    let s = p[p.length - 1][0];
    return s >= 'A' && s <= 'Z';
}

function normalizeTypeName(name: string) {
    return name.replaceAll('.', '_');
}
function normalizeFieldName(name: string) {
    return snakeToCamel(name);
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
    if (id.id.name === 'true') {
        return 'TLBool';
    }
    if (id.id.name === 'false') {
        return 'TLBool';
    }

    return normalizeTypeName(id.id.name)
}

function getEncoderFnForType(id: OptionalVariableIdentifier, type: ETypeIdentifier) {
    if (type.id.name === 'string') {
        return `encoder.writeString(this.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'int256') {
        return `encoder.writeInt256(this.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'int') {
        return `encoder.writeInt32(this.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'bytes') {
        return `encoder.writeBuffer(this.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'long') {
        return `encoder.writeInt64(this.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === '#') {
        return `encoder.writeUInt32(this.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'Bool' || type.id.name === 'true' || type.id.name === 'false') {
        return `encoder.writeBool(this.${normalizeFieldName(id.name)})`;
    }
    return `encoder.writeConstructor(this.${normalizeFieldName(id.name)})`;
}

function getDecoderFnForType(id: OptionalVariableIdentifier, type: ETypeIdentifier) {
    if (type.id.name === 'string') {
        return `decoder.readString()`
    }
    if (type.id.name === 'int256') {
        return `decoder.readInt256()`
    }
    if (type.id.name === 'int') {
        return `decoder.readInt32()`
    }
    if (type.id.name === 'bytes') {
        return `decoder.readBuffer()`
    }
    if (type.id.name === 'long') {
        return `decoder.readInt64()`
    }
    if (type.id.name === '#') {
        return `decoder.readUInt32()`
    }
    if (type.id.name === 'Bool' || type.id.name === 'true' || type.id.name === 'false') {
        return `decoder.readBool()`
    }
    if (isTypeName(type.id.name)) {
        return `read_${normalizeTypeName(type.id.name)}(decoder)`;
    } else {
        return `decoder.readConstructor(${normalizeTypeName(type.id.name)})`
    }
}

function generateConstructor(decl: CombinatorDeclaration, typeId: number) {
    let code = new CodeBuilder()
    code.add(`export class ${normalizeTypeName(decl.id.name)} extends TLConstructor {`)
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
            let optional = !!field.conditionalDef;
            if (optional) {
                fields.push(`public ${normalizeFieldName(field.id.name)}: ${getTypeName(field.argType.expression)} | null`);
            } else {
                fields.push(`public ${normalizeFieldName(field.id.name)}: ${getTypeName(field.argType.expression)}`);
            }
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
                if (field.conditionalDef) {
                    code.add(`(this.${field.conditionalDef.id.name} && (1 << ${field.conditionalDef.nat})) && !!this.${normalizeFieldName(field.id.name)} && ${getEncoderFnForType(field.id, field.argType.expression)};`);
                } else {
                    code.add(getEncoderFnForType(field.id, field.argType.expression) + ';');
                }
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
                fs.push(normalizeFieldName(field.id.name));
                if (field.conditionalDef) {
                    code.add(`let ${normalizeFieldName(field.id.name)} = (${field.conditionalDef.id.name} && (1 << ${field.conditionalDef.nat})) ? ` + getDecoderFnForType(field.id, field.argType.expression) + ' : null;');
                } else {
                    code.add(`let ${normalizeFieldName(field.id.name)} = ` + getDecoderFnForType(field.id, field.argType.expression) + ';');
                }
            }
            code.add(`return new ${normalizeTypeName(decl.id.name)}(${fs.join(', ')})`);
        })
        code.add('}');

    });
    code.add('}')
    return code;
}

function generateType(name: string, constructors: { declaration: CombinatorDeclaration, id: number }[]) {
    let code = new CodeBuilder();
    code.add(`export type ${name} = ${constructors.map((v) => normalizeTypeName(v.declaration.id.name)).join(' | ')};`);
    code.add(`const read_${normalizeTypeName(name)} = (reader: TLReadBuffer): ${name} => {`);
    code.inTab(() => {
        code.add(`const id = reader.readInt32();`);
        for (let t of constructors) {
            code.add(`if (id == ${t.id}) return reader.readConstructor(${normalizeTypeName(t.declaration.id.name)});`);
        }
        code.add(`throw Error('Unknown type: ' + id);`);
    });
    code.add('}');
    return code;
}

export function generate(schema: string) {

    // Parse
    let srcLines = schema.split('\n');
    let src = parseSchema(schema);

    // Header
    let code = new CodeBuilder();
    code.add('import { TLWriteBuffer, TLReadBuffer, TLConstructor, TLFlag, TLInt, TLString, TLLong, TLInt256, TLInt128, TLBytes, TLBool } from "ton-tl";');
    code.add();

    // Process declaration
    let types = new Map<string, { declaration: CombinatorDeclaration, id: number }[]>();
    for (let declaration of src.constructors.declarations) {
        if (declaration.type === 'CombinatorDeclaration') {
            if (BUILT_IN.includes(declaration.id.name)) {
                continue;
            }

            let declLine = srcLines[declaration.start.line - 1]
            let typeId = crc.str(declLine.slice(0, -1))
            code.append(generateConstructor(declaration, typeId));
            code.add()

            let name = normalizeTypeName(declaration.resultType.id.name);
            if (types.has(name)) {
                types.get(name)!.push({ declaration, id: typeId });
            } else {
                types.set(name, [{ declaration, id: typeId }]);
            }

        } else if (declaration.type === 'BuiltinCombinatorDeclaration') {
            continue; // Ignores built in aliases
        } else {
            throw Error('Unknown declaration: ' + declaration.type);
        }
    }

    // Process types
    for (let tp of types) {
        code.append(generateType(tp[0], tp[1]));
    }

    // Process functions
    for (let declaration of src.functions.declarations) {
        if (declaration.type === 'CombinatorDeclaration') {
            let declLine = srcLines[declaration.start.line - 1]
            let typeId = crc.str(declLine.slice(0, -1))
            code.append(generateConstructor(declaration, typeId));
            code.add();
        } else {
            throw Error('Unknown declaration: ' + declaration.type);
        }
    }

    // Generatae function definitions
    // TODO: Implement

    return code.render();
}