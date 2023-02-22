/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TLReadBuffer } from "./TLReadBuffer";
import { TLWriteBuffer } from "./TLWriteBuffer";

describe('TLWriteBuffer', () => {
    it('should write longs', () => {
        let writer = new TLWriteBuffer();
        writer.writeInt64('0');
        writer.writeInt64('-1');
        writer.writeInt64('-10000');
        writer.writeInt64('10000');
        let reader = new TLReadBuffer(writer.build());
        expect(reader.readInt64()).toEqual('0');
        expect(reader.readInt64()).toEqual('-1');
        expect(reader.readInt64()).toEqual('-10000');
        expect(reader.readInt64()).toEqual('10000');
    });
});