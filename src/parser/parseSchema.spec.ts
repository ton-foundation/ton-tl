import * as fs from 'fs';
import { grammar } from './grammar';
import { parseSchema } from './parseSchema';

describe('parse', () => {
    it('grammar should match', () => {
        const gram = fs.readFileSync(__dirname + '/../__testdata__/tl_grammar.pegjs', 'utf-8');
        expect(grammar).toEqual(gram);
    });
    it('should parse lite_api.tl', () => {
        const tl = fs.readFileSync(__dirname + '/../__testdata__/lite_api.tl', 'utf-8');
        parseSchema(tl);
    });
});