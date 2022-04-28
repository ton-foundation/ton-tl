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
        return `encoder.writeString(src.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'int256') {
        return `encoder.writeInt256(src.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'int') {
        return `encoder.writeInt32(src.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'bytes') {
        return `encoder.writeBuffer(src.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'long') {
        return `encoder.writeInt64(src.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === '#') {
        return `encoder.writeUInt32(src.${normalizeFieldName(id.name)})`;
    }
    if (type.id.name === 'Bool' || type.id.name === 'true' || type.id.name === 'false') {
        return `encoder.writeBool(src.${normalizeFieldName(id.name)})`;
    }
    return `Codecs.${normalizeTypeName(type.id.name)}.encode(src.${normalizeFieldName(id.name)}, encoder)`;
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
    return `Codecs.${normalizeTypeName(type.id.name)}.decode(decoder)`;
}

function generateConstructor(decl: CombinatorDeclaration, typeId: number) {
    let code = new CodeBuilder()
    code.add(`export interface ${normalizeTypeName(decl.id.name)} {`);
    code.inTab(() => {
        code.add(`readonly kind: '${decl.id.name}';`);
        for (let field of decl.args) {
            if (field.argType.expression.type !== 'ETypeIdentifier') {
                continue
            }
            let optional = !!field.conditionalDef;
            if (optional) {
                code.add(`readonly ${normalizeFieldName(field.id.name)}: ${getTypeName(field.argType.expression)} | null;`);
            } else {
                code.add(`readonly ${normalizeFieldName(field.id.name)}: ${getTypeName(field.argType.expression)};`);
            }
        }
    });
    code.add('}');
    return code;
}

function generateFunction(constructor: CombinatorDeclaration, typeId: number) {
    let code = new CodeBuilder();

    code.add(`${normalizeTypeName(constructor.id.name)}: {`);
    code.inTab(() => {
        code.add(`encodeRequest: (src: ${normalizeTypeName(constructor.id.name)}, encoder: TLWriteBuffer) => { encoder.writeInt32(${typeId}); Codecs.${normalizeTypeName(constructor.id.name)}.encode(src, encoder); },`);
        if (constructor.resultType.id.name === 'Object') {
            code.add(`decodeResponse: (decoder: TLReadBuffer) => decoder.readObject()`);
        } else {
            code.add(`decodeResponse: (decoder: TLReadBuffer) => Codecs.${normalizeTypeName(constructor.resultType.id.name)}.decode(decoder)`);
        }
    });
    if (constructor.resultType.id.name === 'Object') {
        code.add(`} as TLFunction<${normalizeTypeName(constructor.id.name)}, TLBytes>,`);
    } else {
        code.add(`} as TLFunction<${normalizeTypeName(constructor.id.name)}, ${normalizeTypeName(constructor.resultType.id.name)}>,`);
    }
    return code;
}

function generateType(name: string, constructors: { declaration: CombinatorDeclaration, id: number }[]) {
    let code = new CodeBuilder();
    code.add(`export type ${name} = ${constructors.map((v) => normalizeTypeName(v.declaration.id.name)).join(' | ')};`);
    return code;
}

function generateConstructorCodec(constructor: CombinatorDeclaration) {
    let code = new CodeBuilder();
    code.add(`${normalizeTypeName(constructor.id.name)}: {`);
    code.inTab(() => {
        code.add(`encode: (src: ${normalizeTypeName(constructor.id.name)}, encoder: TLWriteBuffer) => {`);
        code.inTab(() => {
            for (let field of constructor.args) {
                if (field.argType.expression.type !== 'ETypeIdentifier') {
                    continue;
                }
                if (field.conditionalDef) {
                    code.add(`(src.${field.conditionalDef.id.name} && (1 << ${field.conditionalDef.nat})) && !!src.${normalizeFieldName(field.id.name)} && ${getEncoderFnForType(field.id, field.argType.expression)};`);
                } else {
                    code.add(getEncoderFnForType(field.id, field.argType.expression) + ';');
                }
            }
        });
        code.add('},');
        code.add(`decode: (decoder: TLReadBuffer): ${normalizeTypeName(constructor.id.name)} => {`);
        code.inTab(() => {
            let fs: string[] = [];
            for (let field of constructor.args) {
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
            code.add(`return { kind: '${constructor.id.name}', ${fs.join(', ')} };`);
        });
        code.add('},');
    });
    code.add(`} as TLCodec<${normalizeTypeName(constructor.id.name)}>,`);
    return code;
}

function generateTypeCodec(name: string, constructors: { declaration: CombinatorDeclaration, id: number }[]) {
    let code = new CodeBuilder();
    code.add(`${normalizeTypeName(name)}: {`);
    code.inTab(() => {
        code.add(`encode: (src: ${normalizeTypeName(name)}, encoder: TLWriteBuffer) => {`);
        code.inTab(() => {
            code.add(`const kind = src.kind;`);
            for (let t of constructors) {
                code.add(`if (kind === '${t.declaration.id.name}') {`);
                code.inTab(() => {
                    code.add(`encoder.writeInt32(${t.id});`);
                    code.add(`Codecs.${normalizeTypeName(t.declaration.id.name)}.encode(src, encoder);`);
                    code.add(`return;`);
                });
                code.add('}');
            }
            code.add(`throw Error('Unknown type: ' + kind);`);
        });
        code.add('},');
        code.add(`decode: (decoder: TLReadBuffer): ${normalizeTypeName(name)} => {`);
        code.inTab(() => {
            code.add(`const kind = decoder.readInt32();`);
            for (let t of constructors) {
                code.add(`if (kind === ${t.id}) {`);
                code.inTab(() => {
                    code.add(`return Codecs.${normalizeTypeName(t.declaration.id.name)}.decode(decoder);`);
                });
                code.add('}');
            }
            code.add(`throw Error('Unknown type: ' + kind);`);
        });
        code.add('},');
    });
    code.add(`} as TLCodec<${normalizeTypeName(name)}>,`);
    return code;
}

export function generate(schema: string) {

    // Parse
    let srcLines = schema.split('\n');
    let src = parseSchema(schema);

    // Header
    let code = new CodeBuilder();
    code.add('import { TLWriteBuffer, TLReadBuffer, TLFlag, TLInt, TLString, TLLong, TLInt256, TLInt128, TLBytes, TLBool, TLCodec, TLFunction } from "ton-tl";');
    code.add();

    // Process declaration

    code.add('//');
    code.add('// Constructors');
    code.add('//');
    code.add();

    let types = new Map<string, { declaration: CombinatorDeclaration, id: number }[]>();
    for (let declaration of src.constructors.declarations) {
        if (declaration.type === 'CombinatorDeclaration') {
            if (BUILT_IN.includes(declaration.id.name)) {
                continue;
            }

            let declLine = srcLines[declaration.start.line - 1]
            let typeId = crc.str(declLine.slice(0, -1))
            code.append(generateConstructor(declaration, typeId));

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

    code.add('//');
    code.add('// Types');
    code.add('//');
    code.add();

    for (let tp of types) {
        code.append(generateType(tp[0], tp[1]));
    }

    code.add('//');
    code.add('// Functions');
    code.add('//');
    code.add();

    // Process functions
    for (let declaration of src.functions.declarations) {
        if (declaration.type === 'CombinatorDeclaration') {
            let declLine = srcLines[declaration.start.line - 1]
            let typeId = crc.str(declLine.slice(0, -1))
            code.append(generateConstructor(declaration, typeId));
        } else {
            throw Error('Unknown declaration: ' + declaration.type);
        }
    }

    code.add();
    code.add('export const Functions = {');
    code.inTab(() => {
        for (let declaration of src.functions.declarations) {
            if (declaration.type === 'CombinatorDeclaration') {
                let declLine = srcLines[declaration.start.line - 1]
                let typeId = crc.str(declLine.slice(0, -1))
                code.append(generateFunction(declaration, typeId));
            } else {
                throw Error('Unknown declaration: ' + declaration.type);
            }
        }
    });
    code.add('};');

    code.add('//');
    code.add('// Codecs');
    code.add('//');
    code.add();
    code.add('export const Codecs = {');
    code.inTab(() => {
        for (let tp of types) {
            for (let t of tp[1]) {
                code.append(generateConstructorCodec(t.declaration));
            }
        }
        for (let declaration of src.functions.declarations) {
            if (declaration.type === 'CombinatorDeclaration') {
                code.append(generateConstructorCodec(declaration));
            }
        }
        for (let tp of types) {
            code.append(generateTypeCodec(tp[0], tp[1]));
        }
    });
    code.add('};');

    return code.render();
}