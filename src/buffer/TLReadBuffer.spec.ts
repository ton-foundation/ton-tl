/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TLReadBuffer } from "./TLReadBuffer";

describe('TLReadBuffer', () => {
    it('should read values correctly', () => {
        const data = '81288385ffffffff00000000000000804d873301f37b9269d5b75452c1aeada5779b4d82c511f014c26656d153e8b72e52977f655c4e25880dccf754d6a9ccd3b31792276ef0adefbce6747e751dd77fc6e599c23dd4534ce3ffd0071bff5dc299a48a81b88f6b0c6201d913a4434e5800203aecffffffff17a3a92992aabea785a7a090985a265cd31f323d849da51239737e321fb055695e994fcf4d425c0a6ce6a792594b7173205f740a39cd56f537defd28b48a0f6e';

        // Kind
        const decoder = new TLReadBuffer(Buffer.from(data, 'hex'));
        expect(decoder.readInt32()).toBe(-2055001983);

        // Block ID Ext
        let workchain = decoder.readInt32();
        let shard = decoder.readInt64();
        let seqno = decoder.readInt32();
        let rootHash = decoder.readInt256();
        let fileHash = decoder.readInt256();
        expect(workchain).toBe(-1);
        expect(shard).toEqual('-9223372036854775808');
        expect(seqno).toBe(20154189);

        // let last = Codecs.tonNode_blockIdExt.decode(decoder);
        //     let stateRootHash = decoder.readInt256();
        //     let init = Codecs.tonNode_zeroStateIdExt.decode(decoder);
    });
});