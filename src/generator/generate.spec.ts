import * as fs from 'fs';
import { parseSchema } from "../parser/parseSchema";
import { generate } from './generate';

describe('generate', () => {
    it('should generate parser', () => {
        const tl = fs.readFileSync(__dirname + '/../__testdata__/lite_api.tl', 'utf-8');
        const res = generate(tl);
        fs.writeFileSync(__dirname + '/../__testdata__/generated.ts', res);
    });
});