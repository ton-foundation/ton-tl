/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as fs from 'fs';
import { generate } from './generate';

describe('generate', () => {
    it('should generate parser', () => {
        const tl = fs.readFileSync(__dirname + '/../__testdata__/lite_api.tl', 'utf-8');
        const res = generate(tl);
        fs.writeFileSync(__dirname + '/../__testdata__/generated.ts', res);
    });
});