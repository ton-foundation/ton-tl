import { generate, Parser, ParserOptions } from "pegjs";
import { TLProgram } from "./ast";
import { grammar } from "./grammar";

let parser: Parser | null = null;
export const parseSchema = (str: string, options?: ParserOptions): TLProgram => {
    if (!parser) {
        parser = generate(grammar);
    }
    return parser.parse(str, options)
}