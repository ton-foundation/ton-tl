import { TLWriteBuffer, TLReadBuffer, TLConstructor, TLFlag, TLInt, TLString, TLLong, TLInt256, TLInt128, TLBytes, TLBool } from "..";

export class tonNode_blockId extends TLConstructor {
    static typeId = -1211256473;

    constructor(public workchain: TLInt, public shard: TLLong, public seqno: TLInt) {
        super();
    }

    getId = () => -1211256473;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.workchain);
        encoder.writeInt64(this.shard);
        encoder.writeInt32(this.seqno);
    }

    static decode = (decoder: TLReadBuffer) => {
        let workchain = decoder.readInt32();
        let shard = decoder.readInt64();
        let seqno = decoder.readInt32();
        return new tonNode_blockId(workchain, shard, seqno)
    }
}


export class tonNode_blockIdExt extends TLConstructor {
    static typeId = 1733487480;

    constructor(public workchain: TLInt, public shard: TLLong, public seqno: TLInt, public rootHash: TLInt256, public fileHash: TLInt256) {
        super();
    }

    getId = () => 1733487480;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.workchain);
        encoder.writeInt64(this.shard);
        encoder.writeInt32(this.seqno);
        encoder.writeInt256(this.rootHash);
        encoder.writeInt256(this.fileHash);
    }

    static decode = (decoder: TLReadBuffer) => {
        let workchain = decoder.readInt32();
        let shard = decoder.readInt64();
        let seqno = decoder.readInt32();
        let rootHash = decoder.readInt256();
        let fileHash = decoder.readInt256();
        return new tonNode_blockIdExt(workchain, shard, seqno, rootHash, fileHash)
    }
}


export class tonNode_zeroStateIdExt extends TLConstructor {
    static typeId = 494024110;

    constructor(public workchain: TLInt, public rootHash: TLInt256, public fileHash: TLInt256) {
        super();
    }

    getId = () => 494024110;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.workchain);
        encoder.writeInt256(this.rootHash);
        encoder.writeInt256(this.fileHash);
    }

    static decode = (decoder: TLReadBuffer) => {
        let workchain = decoder.readInt32();
        let rootHash = decoder.readInt256();
        let fileHash = decoder.readInt256();
        return new tonNode_zeroStateIdExt(workchain, rootHash, fileHash)
    }
}


export class adnl_message_query extends TLConstructor {
    static typeId = -1265895046;

    constructor(public queryId: TLInt256, public query: TLBytes) {
        super();
    }

    getId = () => -1265895046;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt256(this.queryId);
        encoder.writeBuffer(this.query);
    }

    static decode = (decoder: TLReadBuffer) => {
        let queryId = decoder.readInt256();
        let query = decoder.readBuffer();
        return new adnl_message_query(queryId, query)
    }
}


export class adnl_message_answer extends TLConstructor {
    static typeId = 262964246;

    constructor(public queryId: TLInt256, public answer: TLBytes) {
        super();
    }

    getId = () => 262964246;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt256(this.queryId);
        encoder.writeBuffer(this.answer);
    }

    static decode = (decoder: TLReadBuffer) => {
        let queryId = decoder.readInt256();
        let answer = decoder.readBuffer();
        return new adnl_message_answer(queryId, answer)
    }
}


export class liteServer_error extends TLConstructor {
    static typeId = -1146494648;

    constructor(public code: TLInt, public message: TLString) {
        super();
    }

    getId = () => -1146494648;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.code);
        encoder.writeString(this.message);
    }

    static decode = (decoder: TLReadBuffer) => {
        let code = decoder.readInt32();
        let message = decoder.readString();
        return new liteServer_error(code, message)
    }
}


export class liteServer_accountId extends TLConstructor {
    static typeId = 1973478085;

    constructor(public workchain: TLInt, public id: TLInt256) {
        super();
    }

    getId = () => 1973478085;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.workchain);
        encoder.writeInt256(this.id);
    }

    static decode = (decoder: TLReadBuffer) => {
        let workchain = decoder.readInt32();
        let id = decoder.readInt256();
        return new liteServer_accountId(workchain, id)
    }
}


export class liteServer_masterchainInfo extends TLConstructor {
    static typeId = -2055001983;

    constructor(public last: tonNode_blockIdExt, public stateRootHash: TLInt256, public init: tonNode_zeroStateIdExt) {
        super();
    }

    getId = () => -2055001983;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.last);
        encoder.writeInt256(this.stateRootHash);
        encoder.writeConstructor(this.init);
    }

    static decode = (decoder: TLReadBuffer) => {
        let last = decoder.readConstructor(tonNode_blockIdExt);
        let stateRootHash = decoder.readInt256();
        let init = decoder.readConstructor(tonNode_zeroStateIdExt);
        return new liteServer_masterchainInfo(last, stateRootHash, init)
    }
}


export class liteServer_masterchainInfoExt extends TLConstructor {
    static typeId = -1462968075;

    constructor(public mode: TLFlag, public version: TLInt, public capabilities: TLLong, public last: tonNode_blockIdExt, public lastUtime: TLInt, public now: TLInt, public stateRootHash: TLInt256, public init: tonNode_zeroStateIdExt) {
        super();
    }

    getId = () => -1462968075;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeInt32(this.version);
        encoder.writeInt64(this.capabilities);
        encoder.writeConstructor(this.last);
        encoder.writeInt32(this.lastUtime);
        encoder.writeInt32(this.now);
        encoder.writeInt256(this.stateRootHash);
        encoder.writeConstructor(this.init);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let version = decoder.readInt32();
        let capabilities = decoder.readInt64();
        let last = decoder.readConstructor(tonNode_blockIdExt);
        let lastUtime = decoder.readInt32();
        let now = decoder.readInt32();
        let stateRootHash = decoder.readInt256();
        let init = decoder.readConstructor(tonNode_zeroStateIdExt);
        return new liteServer_masterchainInfoExt(mode, version, capabilities, last, lastUtime, now, stateRootHash, init)
    }
}


export class liteServer_currentTime extends TLConstructor {
    static typeId = -380436467;

    constructor(public now: TLInt) {
        super();
    }

    getId = () => -380436467;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.now);
    }

    static decode = (decoder: TLReadBuffer) => {
        let now = decoder.readInt32();
        return new liteServer_currentTime(now)
    }
}


export class liteServer_version extends TLConstructor {
    static typeId = 1510248933;

    constructor(public mode: TLFlag, public version: TLInt, public capabilities: TLLong, public now: TLInt) {
        super();
    }

    getId = () => 1510248933;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeInt32(this.version);
        encoder.writeInt64(this.capabilities);
        encoder.writeInt32(this.now);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let version = decoder.readInt32();
        let capabilities = decoder.readInt64();
        let now = decoder.readInt32();
        return new liteServer_version(mode, version, capabilities, now)
    }
}


export class liteServer_blockData extends TLConstructor {
    static typeId = -1519063700;

    constructor(public id: tonNode_blockIdExt, public data: TLBytes) {
        super();
    }

    getId = () => -1519063700;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeBuffer(this.data);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let data = decoder.readBuffer();
        return new liteServer_blockData(id, data)
    }
}


export class liteServer_blockState extends TLConstructor {
    static typeId = -1414669300;

    constructor(public id: tonNode_blockIdExt, public rootHash: TLInt256, public fileHash: TLInt256, public data: TLBytes) {
        super();
    }

    getId = () => -1414669300;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeInt256(this.rootHash);
        encoder.writeInt256(this.fileHash);
        encoder.writeBuffer(this.data);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let rootHash = decoder.readInt256();
        let fileHash = decoder.readInt256();
        let data = decoder.readBuffer();
        return new liteServer_blockState(id, rootHash, fileHash, data)
    }
}


export class liteServer_blockHeader extends TLConstructor {
    static typeId = 1965916697;

    constructor(public id: tonNode_blockIdExt, public mode: TLFlag, public headerProof: TLBytes) {
        super();
    }

    getId = () => 1965916697;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeUInt32(this.mode);
        encoder.writeBuffer(this.headerProof);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let mode = decoder.readUInt32();
        let headerProof = decoder.readBuffer();
        return new liteServer_blockHeader(id, mode, headerProof)
    }
}


export class liteServer_sendMsgStatus extends TLConstructor {
    static typeId = 961602967;

    constructor(public status: TLInt) {
        super();
    }

    getId = () => 961602967;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.status);
    }

    static decode = (decoder: TLReadBuffer) => {
        let status = decoder.readInt32();
        return new liteServer_sendMsgStatus(status)
    }
}


export class liteServer_accountState extends TLConstructor {
    static typeId = 1887029073;

    constructor(public id: tonNode_blockIdExt, public shardblk: tonNode_blockIdExt, public shardProof: TLBytes, public proof: TLBytes, public state: TLBytes) {
        super();
    }

    getId = () => 1887029073;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeConstructor(this.shardblk);
        encoder.writeBuffer(this.shardProof);
        encoder.writeBuffer(this.proof);
        encoder.writeBuffer(this.state);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let shardblk = decoder.readConstructor(tonNode_blockIdExt);
        let shardProof = decoder.readBuffer();
        let proof = decoder.readBuffer();
        let state = decoder.readBuffer();
        return new liteServer_accountState(id, shardblk, shardProof, proof, state)
    }
}


export class liteServer_runMethodResult extends TLConstructor {
    static typeId = -1550163605;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt, public shardblk: tonNode_blockIdExt, public shardProof: TLBytes | null, public proof: TLBytes | null, public stateProof: TLBytes | null, public initC7: TLBytes | null, public libExtras: TLBytes | null, public exitCode: TLInt, public result: TLBytes | null) {
        super();
    }

    getId = () => -1550163605;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.id);
        encoder.writeConstructor(this.shardblk);
        (this.mode && (1 << 0)) && !!this.shardProof && encoder.writeBuffer(this.shardProof);
        (this.mode && (1 << 0)) && !!this.proof && encoder.writeBuffer(this.proof);
        (this.mode && (1 << 1)) && !!this.stateProof && encoder.writeBuffer(this.stateProof);
        (this.mode && (1 << 3)) && !!this.initC7 && encoder.writeBuffer(this.initC7);
        (this.mode && (1 << 4)) && !!this.libExtras && encoder.writeBuffer(this.libExtras);
        encoder.writeInt32(this.exitCode);
        (this.mode && (1 << 2)) && !!this.result && encoder.writeBuffer(this.result);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let shardblk = decoder.readConstructor(tonNode_blockIdExt);
        let shardProof = (mode && (1 << 0)) ? decoder.readBuffer() : null;
        let proof = (mode && (1 << 0)) ? decoder.readBuffer() : null;
        let stateProof = (mode && (1 << 1)) ? decoder.readBuffer() : null;
        let initC7 = (mode && (1 << 3)) ? decoder.readBuffer() : null;
        let libExtras = (mode && (1 << 4)) ? decoder.readBuffer() : null;
        let exitCode = decoder.readInt32();
        let result = (mode && (1 << 2)) ? decoder.readBuffer() : null;
        return new liteServer_runMethodResult(mode, id, shardblk, shardProof, proof, stateProof, initC7, libExtras, exitCode, result)
    }
}


export class liteServer_shardInfo extends TLConstructor {
    static typeId = -1612264060;

    constructor(public id: tonNode_blockIdExt, public shardblk: tonNode_blockIdExt, public shardProof: TLBytes, public shardDescr: TLBytes) {
        super();
    }

    getId = () => -1612264060;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeConstructor(this.shardblk);
        encoder.writeBuffer(this.shardProof);
        encoder.writeBuffer(this.shardDescr);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let shardblk = decoder.readConstructor(tonNode_blockIdExt);
        let shardProof = decoder.readBuffer();
        let shardDescr = decoder.readBuffer();
        return new liteServer_shardInfo(id, shardblk, shardProof, shardDescr)
    }
}


export class liteServer_allShardsInfo extends TLConstructor {
    static typeId = 160425773;

    constructor(public id: tonNode_blockIdExt, public proof: TLBytes, public data: TLBytes) {
        super();
    }

    getId = () => 160425773;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeBuffer(this.proof);
        encoder.writeBuffer(this.data);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let proof = decoder.readBuffer();
        let data = decoder.readBuffer();
        return new liteServer_allShardsInfo(id, proof, data)
    }
}


export class liteServer_transactionInfo extends TLConstructor {
    static typeId = 249490759;

    constructor(public id: tonNode_blockIdExt, public proof: TLBytes, public transaction: TLBytes) {
        super();
    }

    getId = () => 249490759;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeBuffer(this.proof);
        encoder.writeBuffer(this.transaction);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let proof = decoder.readBuffer();
        let transaction = decoder.readBuffer();
        return new liteServer_transactionInfo(id, proof, transaction)
    }
}


export class liteServer_transactionList extends TLConstructor {
    static typeId = -1188112483;

    constructor(public transactions: TLBytes) {
        super();
    }

    getId = () => -1188112483;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeBuffer(this.transactions);
    }

    static decode = (decoder: TLReadBuffer) => {
        let transactions = decoder.readBuffer();
        return new liteServer_transactionList(transactions)
    }
}


export class liteServer_transactionId extends TLConstructor {
    static typeId = -1322293841;

    constructor(public mode: TLFlag, public account: TLInt256 | null, public lt: TLLong | null, public hash: TLInt256 | null) {
        super();
    }

    getId = () => -1322293841;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        (this.mode && (1 << 0)) && !!this.account && encoder.writeInt256(this.account);
        (this.mode && (1 << 1)) && !!this.lt && encoder.writeInt64(this.lt);
        (this.mode && (1 << 2)) && !!this.hash && encoder.writeInt256(this.hash);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let account = (mode && (1 << 0)) ? decoder.readInt256() : null;
        let lt = (mode && (1 << 1)) ? decoder.readInt64() : null;
        let hash = (mode && (1 << 2)) ? decoder.readInt256() : null;
        return new liteServer_transactionId(mode, account, lt, hash)
    }
}


export class liteServer_transactionId3 extends TLConstructor {
    static typeId = 746707575;

    constructor(public account: TLInt256, public lt: TLLong) {
        super();
    }

    getId = () => 746707575;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt256(this.account);
        encoder.writeInt64(this.lt);
    }

    static decode = (decoder: TLReadBuffer) => {
        let account = decoder.readInt256();
        let lt = decoder.readInt64();
        return new liteServer_transactionId3(account, lt)
    }
}


export class liteServer_blockTransactions extends TLConstructor {
    static typeId = 794061916;

    constructor(public id: tonNode_blockIdExt, public reqCount: TLFlag, public incomplete: TLBool, public proof: TLBytes) {
        super();
    }

    getId = () => 794061916;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeUInt32(this.reqCount);
        encoder.writeBool(this.incomplete);
        encoder.writeBuffer(this.proof);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let reqCount = decoder.readUInt32();
        let incomplete = decoder.readBool();
        let proof = decoder.readBuffer();
        return new liteServer_blockTransactions(id, reqCount, incomplete, proof)
    }
}


export class liteServer_signature extends TLConstructor {
    static typeId = -1545668523;

    constructor(public nodeIdShort: TLInt256, public signature: TLBytes) {
        super();
    }

    getId = () => -1545668523;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt256(this.nodeIdShort);
        encoder.writeBuffer(this.signature);
    }

    static decode = (decoder: TLReadBuffer) => {
        let nodeIdShort = decoder.readInt256();
        let signature = decoder.readBuffer();
        return new liteServer_signature(nodeIdShort, signature)
    }
}


export class liteServer_signatureSet extends TLConstructor {
    static typeId = -1830726249;

    constructor(public validatorSetHash: TLInt, public catchainSeqno: TLInt) {
        super();
    }

    getId = () => -1830726249;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.validatorSetHash);
        encoder.writeInt32(this.catchainSeqno);
    }

    static decode = (decoder: TLReadBuffer) => {
        let validatorSetHash = decoder.readInt32();
        let catchainSeqno = decoder.readInt32();
        return new liteServer_signatureSet(validatorSetHash, catchainSeqno)
    }
}


export class liteServer_blockLinkBack extends TLConstructor {
    static typeId = -276947985;

    constructor(public toKeyBlock: TLBool, public from: tonNode_blockIdExt, public to: tonNode_blockIdExt, public destProof: TLBytes, public proof: TLBytes, public stateProof: TLBytes) {
        super();
    }

    getId = () => -276947985;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeBool(this.toKeyBlock);
        encoder.writeConstructor(this.from);
        encoder.writeConstructor(this.to);
        encoder.writeBuffer(this.destProof);
        encoder.writeBuffer(this.proof);
        encoder.writeBuffer(this.stateProof);
    }

    static decode = (decoder: TLReadBuffer) => {
        let toKeyBlock = decoder.readBool();
        let from = decoder.readConstructor(tonNode_blockIdExt);
        let to = decoder.readConstructor(tonNode_blockIdExt);
        let destProof = decoder.readBuffer();
        let proof = decoder.readBuffer();
        let stateProof = decoder.readBuffer();
        return new liteServer_blockLinkBack(toKeyBlock, from, to, destProof, proof, stateProof)
    }
}


export class liteServer_blockLinkForward extends TLConstructor {
    static typeId = 1376767516;

    constructor(public toKeyBlock: TLBool, public from: tonNode_blockIdExt, public to: tonNode_blockIdExt, public destProof: TLBytes, public configProof: TLBytes, public signatures: liteServer_SignatureSet) {
        super();
    }

    getId = () => 1376767516;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeBool(this.toKeyBlock);
        encoder.writeConstructor(this.from);
        encoder.writeConstructor(this.to);
        encoder.writeBuffer(this.destProof);
        encoder.writeBuffer(this.configProof);
        encoder.writeConstructor(this.signatures);
    }

    static decode = (decoder: TLReadBuffer) => {
        let toKeyBlock = decoder.readBool();
        let from = decoder.readConstructor(tonNode_blockIdExt);
        let to = decoder.readConstructor(tonNode_blockIdExt);
        let destProof = decoder.readBuffer();
        let configProof = decoder.readBuffer();
        let signatures = read_liteServer_SignatureSet(decoder);
        return new liteServer_blockLinkForward(toKeyBlock, from, to, destProof, configProof, signatures)
    }
}


export class liteServer_partialBlockProof extends TLConstructor {
    static typeId = 221128719;

    constructor(public complete: TLBool, public from: tonNode_blockIdExt, public to: tonNode_blockIdExt) {
        super();
    }

    getId = () => 221128719;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeBool(this.complete);
        encoder.writeConstructor(this.from);
        encoder.writeConstructor(this.to);
    }

    static decode = (decoder: TLReadBuffer) => {
        let complete = decoder.readBool();
        let from = decoder.readConstructor(tonNode_blockIdExt);
        let to = decoder.readConstructor(tonNode_blockIdExt);
        return new liteServer_partialBlockProof(complete, from, to)
    }
}


export class liteServer_configInfo extends TLConstructor {
    static typeId = -1367660753;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt, public stateProof: TLBytes, public configProof: TLBytes) {
        super();
    }

    getId = () => -1367660753;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.id);
        encoder.writeBuffer(this.stateProof);
        encoder.writeBuffer(this.configProof);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let stateProof = decoder.readBuffer();
        let configProof = decoder.readBuffer();
        return new liteServer_configInfo(mode, id, stateProof, configProof)
    }
}


export class liteServer_validatorStats extends TLConstructor {
    static typeId = -1174956328;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt, public count: TLInt, public complete: TLBool, public stateProof: TLBytes, public dataProof: TLBytes) {
        super();
    }

    getId = () => -1174956328;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.id);
        encoder.writeInt32(this.count);
        encoder.writeBool(this.complete);
        encoder.writeBuffer(this.stateProof);
        encoder.writeBuffer(this.dataProof);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let count = decoder.readInt32();
        let complete = decoder.readBool();
        let stateProof = decoder.readBuffer();
        let dataProof = decoder.readBuffer();
        return new liteServer_validatorStats(mode, id, count, complete, stateProof, dataProof)
    }
}


export class liteServer_debug_verbosity extends TLConstructor {
    static typeId = 1564493619;

    constructor(public value: TLInt) {
        super();
    }

    getId = () => 1564493619;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.value);
    }

    static decode = (decoder: TLReadBuffer) => {
        let value = decoder.readInt32();
        return new liteServer_debug_verbosity(value)
    }
}


export type tonNode_BlockId = tonNode_blockId;
const read_tonNode_BlockId = (reader: TLReadBuffer): tonNode_BlockId => {
    const id = reader.readInt32();
    if (id == -1211256473) return reader.readConstructor(tonNode_blockId);
    throw Error('Unknown type: ' + id);
}

export type tonNode_BlockIdExt = tonNode_blockIdExt;
const read_tonNode_BlockIdExt = (reader: TLReadBuffer): tonNode_BlockIdExt => {
    const id = reader.readInt32();
    if (id == 1733487480) return reader.readConstructor(tonNode_blockIdExt);
    throw Error('Unknown type: ' + id);
}

export type tonNode_ZeroStateIdExt = tonNode_zeroStateIdExt;
const read_tonNode_ZeroStateIdExt = (reader: TLReadBuffer): tonNode_ZeroStateIdExt => {
    const id = reader.readInt32();
    if (id == 494024110) return reader.readConstructor(tonNode_zeroStateIdExt);
    throw Error('Unknown type: ' + id);
}

export type adnl_Message = adnl_message_query | adnl_message_answer;
const read_adnl_Message = (reader: TLReadBuffer): adnl_Message => {
    const id = reader.readInt32();
    if (id == -1265895046) return reader.readConstructor(adnl_message_query);
    if (id == 262964246) return reader.readConstructor(adnl_message_answer);
    throw Error('Unknown type: ' + id);
}

export type liteServer_Error = liteServer_error;
const read_liteServer_Error = (reader: TLReadBuffer): liteServer_Error => {
    const id = reader.readInt32();
    if (id == -1146494648) return reader.readConstructor(liteServer_error);
    throw Error('Unknown type: ' + id);
}

export type liteServer_AccountId = liteServer_accountId;
const read_liteServer_AccountId = (reader: TLReadBuffer): liteServer_AccountId => {
    const id = reader.readInt32();
    if (id == 1973478085) return reader.readConstructor(liteServer_accountId);
    throw Error('Unknown type: ' + id);
}

export type liteServer_MasterchainInfo = liteServer_masterchainInfo;
const read_liteServer_MasterchainInfo = (reader: TLReadBuffer): liteServer_MasterchainInfo => {
    const id = reader.readInt32();
    if (id == -2055001983) return reader.readConstructor(liteServer_masterchainInfo);
    throw Error('Unknown type: ' + id);
}

export type liteServer_MasterchainInfoExt = liteServer_masterchainInfoExt;
const read_liteServer_MasterchainInfoExt = (reader: TLReadBuffer): liteServer_MasterchainInfoExt => {
    const id = reader.readInt32();
    if (id == -1462968075) return reader.readConstructor(liteServer_masterchainInfoExt);
    throw Error('Unknown type: ' + id);
}

export type liteServer_CurrentTime = liteServer_currentTime;
const read_liteServer_CurrentTime = (reader: TLReadBuffer): liteServer_CurrentTime => {
    const id = reader.readInt32();
    if (id == -380436467) return reader.readConstructor(liteServer_currentTime);
    throw Error('Unknown type: ' + id);
}

export type liteServer_Version = liteServer_version;
const read_liteServer_Version = (reader: TLReadBuffer): liteServer_Version => {
    const id = reader.readInt32();
    if (id == 1510248933) return reader.readConstructor(liteServer_version);
    throw Error('Unknown type: ' + id);
}

export type liteServer_BlockData = liteServer_blockData;
const read_liteServer_BlockData = (reader: TLReadBuffer): liteServer_BlockData => {
    const id = reader.readInt32();
    if (id == -1519063700) return reader.readConstructor(liteServer_blockData);
    throw Error('Unknown type: ' + id);
}

export type liteServer_BlockState = liteServer_blockState;
const read_liteServer_BlockState = (reader: TLReadBuffer): liteServer_BlockState => {
    const id = reader.readInt32();
    if (id == -1414669300) return reader.readConstructor(liteServer_blockState);
    throw Error('Unknown type: ' + id);
}

export type liteServer_BlockHeader = liteServer_blockHeader;
const read_liteServer_BlockHeader = (reader: TLReadBuffer): liteServer_BlockHeader => {
    const id = reader.readInt32();
    if (id == 1965916697) return reader.readConstructor(liteServer_blockHeader);
    throw Error('Unknown type: ' + id);
}

export type liteServer_SendMsgStatus = liteServer_sendMsgStatus;
const read_liteServer_SendMsgStatus = (reader: TLReadBuffer): liteServer_SendMsgStatus => {
    const id = reader.readInt32();
    if (id == 961602967) return reader.readConstructor(liteServer_sendMsgStatus);
    throw Error('Unknown type: ' + id);
}

export type liteServer_AccountState = liteServer_accountState;
const read_liteServer_AccountState = (reader: TLReadBuffer): liteServer_AccountState => {
    const id = reader.readInt32();
    if (id == 1887029073) return reader.readConstructor(liteServer_accountState);
    throw Error('Unknown type: ' + id);
}

export type liteServer_RunMethodResult = liteServer_runMethodResult;
const read_liteServer_RunMethodResult = (reader: TLReadBuffer): liteServer_RunMethodResult => {
    const id = reader.readInt32();
    if (id == -1550163605) return reader.readConstructor(liteServer_runMethodResult);
    throw Error('Unknown type: ' + id);
}

export type liteServer_ShardInfo = liteServer_shardInfo;
const read_liteServer_ShardInfo = (reader: TLReadBuffer): liteServer_ShardInfo => {
    const id = reader.readInt32();
    if (id == -1612264060) return reader.readConstructor(liteServer_shardInfo);
    throw Error('Unknown type: ' + id);
}

export type liteServer_AllShardsInfo = liteServer_allShardsInfo;
const read_liteServer_AllShardsInfo = (reader: TLReadBuffer): liteServer_AllShardsInfo => {
    const id = reader.readInt32();
    if (id == 160425773) return reader.readConstructor(liteServer_allShardsInfo);
    throw Error('Unknown type: ' + id);
}

export type liteServer_TransactionInfo = liteServer_transactionInfo;
const read_liteServer_TransactionInfo = (reader: TLReadBuffer): liteServer_TransactionInfo => {
    const id = reader.readInt32();
    if (id == 249490759) return reader.readConstructor(liteServer_transactionInfo);
    throw Error('Unknown type: ' + id);
}

export type liteServer_TransactionList = liteServer_transactionList;
const read_liteServer_TransactionList = (reader: TLReadBuffer): liteServer_TransactionList => {
    const id = reader.readInt32();
    if (id == -1188112483) return reader.readConstructor(liteServer_transactionList);
    throw Error('Unknown type: ' + id);
}

export type liteServer_TransactionId = liteServer_transactionId;
const read_liteServer_TransactionId = (reader: TLReadBuffer): liteServer_TransactionId => {
    const id = reader.readInt32();
    if (id == -1322293841) return reader.readConstructor(liteServer_transactionId);
    throw Error('Unknown type: ' + id);
}

export type liteServer_TransactionId3 = liteServer_transactionId3;
const read_liteServer_TransactionId3 = (reader: TLReadBuffer): liteServer_TransactionId3 => {
    const id = reader.readInt32();
    if (id == 746707575) return reader.readConstructor(liteServer_transactionId3);
    throw Error('Unknown type: ' + id);
}

export type liteServer_BlockTransactions = liteServer_blockTransactions;
const read_liteServer_BlockTransactions = (reader: TLReadBuffer): liteServer_BlockTransactions => {
    const id = reader.readInt32();
    if (id == 794061916) return reader.readConstructor(liteServer_blockTransactions);
    throw Error('Unknown type: ' + id);
}

export type liteServer_Signature = liteServer_signature;
const read_liteServer_Signature = (reader: TLReadBuffer): liteServer_Signature => {
    const id = reader.readInt32();
    if (id == -1545668523) return reader.readConstructor(liteServer_signature);
    throw Error('Unknown type: ' + id);
}

export type liteServer_SignatureSet = liteServer_signatureSet;
const read_liteServer_SignatureSet = (reader: TLReadBuffer): liteServer_SignatureSet => {
    const id = reader.readInt32();
    if (id == -1830726249) return reader.readConstructor(liteServer_signatureSet);
    throw Error('Unknown type: ' + id);
}

export type liteServer_BlockLink = liteServer_blockLinkBack | liteServer_blockLinkForward;
const read_liteServer_BlockLink = (reader: TLReadBuffer): liteServer_BlockLink => {
    const id = reader.readInt32();
    if (id == -276947985) return reader.readConstructor(liteServer_blockLinkBack);
    if (id == 1376767516) return reader.readConstructor(liteServer_blockLinkForward);
    throw Error('Unknown type: ' + id);
}

export type liteServer_PartialBlockProof = liteServer_partialBlockProof;
const read_liteServer_PartialBlockProof = (reader: TLReadBuffer): liteServer_PartialBlockProof => {
    const id = reader.readInt32();
    if (id == 221128719) return reader.readConstructor(liteServer_partialBlockProof);
    throw Error('Unknown type: ' + id);
}

export type liteServer_ConfigInfo = liteServer_configInfo;
const read_liteServer_ConfigInfo = (reader: TLReadBuffer): liteServer_ConfigInfo => {
    const id = reader.readInt32();
    if (id == -1367660753) return reader.readConstructor(liteServer_configInfo);
    throw Error('Unknown type: ' + id);
}

export type liteServer_ValidatorStats = liteServer_validatorStats;
const read_liteServer_ValidatorStats = (reader: TLReadBuffer): liteServer_ValidatorStats => {
    const id = reader.readInt32();
    if (id == -1174956328) return reader.readConstructor(liteServer_validatorStats);
    throw Error('Unknown type: ' + id);
}

export type liteServer_debug_Verbosity = liteServer_debug_verbosity;
const read_liteServer_debug_Verbosity = (reader: TLReadBuffer): liteServer_debug_Verbosity => {
    const id = reader.readInt32();
    if (id == 1564493619) return reader.readConstructor(liteServer_debug_verbosity);
    throw Error('Unknown type: ' + id);
}

export class liteServer_getMasterchainInfo extends TLConstructor {
    static typeId = -1984567762;

    constructor() {
        super();
    }

    getId = () => -1984567762;

    encode = (encoder: TLWriteBuffer) => {
    }

    static decode = (decoder: TLReadBuffer) => {
        return new liteServer_getMasterchainInfo()
    }
}


export class liteServer_getMasterchainInfoExt extends TLConstructor {
    static typeId = 1889956319;

    constructor(public mode: TLFlag) {
        super();
    }

    getId = () => 1889956319;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        return new liteServer_getMasterchainInfoExt(mode)
    }
}


export class liteServer_getTime extends TLConstructor {
    static typeId = 380459572;

    constructor() {
        super();
    }

    getId = () => 380459572;

    encode = (encoder: TLWriteBuffer) => {
    }

    static decode = (decoder: TLReadBuffer) => {
        return new liteServer_getTime()
    }
}


export class liteServer_getVersion extends TLConstructor {
    static typeId = 590058507;

    constructor() {
        super();
    }

    getId = () => 590058507;

    encode = (encoder: TLWriteBuffer) => {
    }

    static decode = (decoder: TLReadBuffer) => {
        return new liteServer_getVersion()
    }
}


export class liteServer_getBlock extends TLConstructor {
    static typeId = 1668796173;

    constructor(public id: tonNode_blockIdExt) {
        super();
    }

    getId = () => 1668796173;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        return new liteServer_getBlock(id)
    }
}


export class liteServer_getState extends TLConstructor {
    static typeId = -1167184202;

    constructor(public id: tonNode_blockIdExt) {
        super();
    }

    getId = () => -1167184202;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        return new liteServer_getState(id)
    }
}


export class liteServer_getBlockHeader extends TLConstructor {
    static typeId = 569116318;

    constructor(public id: tonNode_blockIdExt, public mode: TLFlag) {
        super();
    }

    getId = () => 569116318;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeUInt32(this.mode);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let mode = decoder.readUInt32();
        return new liteServer_getBlockHeader(id, mode)
    }
}


export class liteServer_sendMessage extends TLConstructor {
    static typeId = 1762317442;

    constructor(public body: TLBytes) {
        super();
    }

    getId = () => 1762317442;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeBuffer(this.body);
    }

    static decode = (decoder: TLReadBuffer) => {
        let body = decoder.readBuffer();
        return new liteServer_sendMessage(body)
    }
}


export class liteServer_getAccountState extends TLConstructor {
    static typeId = 1804144165;

    constructor(public id: tonNode_blockIdExt, public account: liteServer_accountId) {
        super();
    }

    getId = () => 1804144165;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeConstructor(this.account);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let account = decoder.readConstructor(liteServer_accountId);
        return new liteServer_getAccountState(id, account)
    }
}


export class liteServer_runSmcMethod extends TLConstructor {
    static typeId = 1556504018;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt, public account: liteServer_accountId, public methodId: TLLong, public params: TLBytes) {
        super();
    }

    getId = () => 1556504018;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.id);
        encoder.writeConstructor(this.account);
        encoder.writeInt64(this.methodId);
        encoder.writeBuffer(this.params);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let account = decoder.readConstructor(liteServer_accountId);
        let methodId = decoder.readInt64();
        let params = decoder.readBuffer();
        return new liteServer_runSmcMethod(mode, id, account, methodId, params)
    }
}


export class liteServer_getShardInfo extends TLConstructor {
    static typeId = 1185084453;

    constructor(public id: tonNode_blockIdExt, public workchain: TLInt, public shard: TLLong, public exact: TLBool) {
        super();
    }

    getId = () => 1185084453;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeInt32(this.workchain);
        encoder.writeInt64(this.shard);
        encoder.writeBool(this.exact);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let workchain = decoder.readInt32();
        let shard = decoder.readInt64();
        let exact = decoder.readBool();
        return new liteServer_getShardInfo(id, workchain, shard, exact)
    }
}


export class liteServer_getAllShardsInfo extends TLConstructor {
    static typeId = 1960050027;

    constructor(public id: tonNode_blockIdExt) {
        super();
    }

    getId = () => 1960050027;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        return new liteServer_getAllShardsInfo(id)
    }
}


export class liteServer_getOneTransaction extends TLConstructor {
    static typeId = -737205014;

    constructor(public id: tonNode_blockIdExt, public account: liteServer_accountId, public lt: TLLong) {
        super();
    }

    getId = () => -737205014;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeConstructor(this.account);
        encoder.writeInt64(this.lt);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let account = decoder.readConstructor(liteServer_accountId);
        let lt = decoder.readInt64();
        return new liteServer_getOneTransaction(id, account, lt)
    }
}


export class liteServer_getTransactions extends TLConstructor {
    static typeId = 474015649;

    constructor(public count: TLFlag, public account: liteServer_accountId, public lt: TLLong, public hash: TLInt256) {
        super();
    }

    getId = () => 474015649;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.count);
        encoder.writeConstructor(this.account);
        encoder.writeInt64(this.lt);
        encoder.writeInt256(this.hash);
    }

    static decode = (decoder: TLReadBuffer) => {
        let count = decoder.readUInt32();
        let account = decoder.readConstructor(liteServer_accountId);
        let lt = decoder.readInt64();
        let hash = decoder.readInt256();
        return new liteServer_getTransactions(count, account, lt, hash)
    }
}


export class liteServer_lookupBlock extends TLConstructor {
    static typeId = -87492834;

    constructor(public mode: TLFlag, public id: tonNode_blockId, public lt: TLLong | null, public utime: TLInt | null) {
        super();
    }

    getId = () => -87492834;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.id);
        (this.mode && (1 << 1)) && !!this.lt && encoder.writeInt64(this.lt);
        (this.mode && (1 << 2)) && !!this.utime && encoder.writeInt32(this.utime);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let id = decoder.readConstructor(tonNode_blockId);
        let lt = (mode && (1 << 1)) ? decoder.readInt64() : null;
        let utime = (mode && (1 << 2)) ? decoder.readInt32() : null;
        return new liteServer_lookupBlock(mode, id, lt, utime)
    }
}


export class liteServer_listBlockTransactions extends TLConstructor {
    static typeId = -1375942694;

    constructor(public id: tonNode_blockIdExt, public mode: TLFlag, public count: TLFlag, public after: liteServer_transactionId3 | null, public reverseOrder: TLBool | null, public wantProof: TLBool | null) {
        super();
    }

    getId = () => -1375942694;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeConstructor(this.id);
        encoder.writeUInt32(this.mode);
        encoder.writeUInt32(this.count);
        (this.mode && (1 << 7)) && !!this.after && encoder.writeConstructor(this.after);
        (this.mode && (1 << 6)) && !!this.reverseOrder && encoder.writeBool(this.reverseOrder);
        (this.mode && (1 << 5)) && !!this.wantProof && encoder.writeBool(this.wantProof);
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let mode = decoder.readUInt32();
        let count = decoder.readUInt32();
        let after = (mode && (1 << 7)) ? decoder.readConstructor(liteServer_transactionId3) : null;
        let reverseOrder = (mode && (1 << 6)) ? decoder.readBool() : null;
        let wantProof = (mode && (1 << 5)) ? decoder.readBool() : null;
        return new liteServer_listBlockTransactions(id, mode, count, after, reverseOrder, wantProof)
    }
}


export class liteServer_getBlockProof extends TLConstructor {
    static typeId = -1964336060;

    constructor(public mode: TLFlag, public knownBlock: tonNode_blockIdExt, public targetBlock: tonNode_blockIdExt | null) {
        super();
    }

    getId = () => -1964336060;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.knownBlock);
        (this.mode && (1 << 0)) && !!this.targetBlock && encoder.writeConstructor(this.targetBlock);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let knownBlock = decoder.readConstructor(tonNode_blockIdExt);
        let targetBlock = (mode && (1 << 0)) ? decoder.readConstructor(tonNode_blockIdExt) : null;
        return new liteServer_getBlockProof(mode, knownBlock, targetBlock)
    }
}


export class liteServer_getConfigAll extends TLConstructor {
    static typeId = -1860491593;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt) {
        super();
    }

    getId = () => -1860491593;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.id);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let id = decoder.readConstructor(tonNode_blockIdExt);
        return new liteServer_getConfigAll(mode, id)
    }
}


export class liteServer_getConfigParams extends TLConstructor {
    static typeId = -1627878045;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt) {
        super();
    }

    getId = () => -1627878045;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.id);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let id = decoder.readConstructor(tonNode_blockIdExt);
        return new liteServer_getConfigParams(mode, id)
    }
}


export class liteServer_getValidatorStats extends TLConstructor {
    static typeId = -416991591;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt, public limit: TLInt, public startAfter: TLInt256 | null, public modifiedAfter: TLInt | null) {
        super();
    }

    getId = () => -416991591;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeUInt32(this.mode);
        encoder.writeConstructor(this.id);
        encoder.writeInt32(this.limit);
        (this.mode && (1 << 0)) && !!this.startAfter && encoder.writeInt256(this.startAfter);
        (this.mode && (1 << 2)) && !!this.modifiedAfter && encoder.writeInt32(this.modifiedAfter);
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readUInt32();
        let id = decoder.readConstructor(tonNode_blockIdExt);
        let limit = decoder.readInt32();
        let startAfter = (mode && (1 << 0)) ? decoder.readInt256() : null;
        let modifiedAfter = (mode && (1 << 2)) ? decoder.readInt32() : null;
        return new liteServer_getValidatorStats(mode, id, limit, startAfter, modifiedAfter)
    }
}


export class liteServer_queryPrefix extends TLConstructor {
    static typeId = 1926489734;

    constructor() {
        super();
    }

    getId = () => 1926489734;

    encode = (encoder: TLWriteBuffer) => {
    }

    static decode = (decoder: TLReadBuffer) => {
        return new liteServer_queryPrefix()
    }
}


export class liteServer_query extends TLConstructor {
    static typeId = 2039219935;

    constructor(public data: TLBytes) {
        super();
    }

    getId = () => 2039219935;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeBuffer(this.data);
    }

    static decode = (decoder: TLReadBuffer) => {
        let data = decoder.readBuffer();
        return new liteServer_query(data)
    }
}


export class liteServer_waitMasterchainSeqno extends TLConstructor {
    static typeId = 810842304;

    constructor(public seqno: TLInt, public timeoutMs: TLInt) {
        super();
    }

    getId = () => 810842304;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.seqno);
        encoder.writeInt32(this.timeoutMs);
    }

    static decode = (decoder: TLReadBuffer) => {
        let seqno = decoder.readInt32();
        let timeoutMs = decoder.readInt32();
        return new liteServer_waitMasterchainSeqno(seqno, timeoutMs)
    }
}


