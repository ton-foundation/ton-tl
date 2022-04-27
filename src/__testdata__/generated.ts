import { TLWriteBuffer, TLReadBuffer, TLType, TLFlag, TLInt, TLString, TLLong, TLInt256, TLInt128, TLBytes, TLBool } from "ton-tl";

export class tonNode_blockId extends TLType {
    static typeId = -1211256473;

    constructor(public workchain: TLInt, public shard: TLLong, public seqno: TLInt) {
        super();
    }

    getId = () => -1211256473;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.workchain)
        encoder.writeInt64(this.shard)
        encoder.writeInt32(this.seqno)
    }

    static decode = (decoder: TLReadBuffer) => {
        let workchain = decoder.readInt32()
        let shard = decoder.readInt64()
        let seqno = decoder.readInt32()
        return new tonNode_blockId(workchain, shard, seqno)
    }
}


export class tonNode_blockIdExt extends TLType {
    static typeId = 1733487480;

    constructor(public workchain: TLInt, public shard: TLLong, public seqno: TLInt, public root_hash: TLInt256, public file_hash: TLInt256) {
        super();
    }

    getId = () => 1733487480;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.workchain)
        encoder.writeInt64(this.shard)
        encoder.writeInt32(this.seqno)
        encoder.writeInt256Buff(this.root_hash)
        encoder.writeInt256Buff(this.file_hash)
    }

    static decode = (decoder: TLReadBuffer) => {
        let workchain = decoder.readInt32()
        let shard = decoder.readInt64()
        let seqno = decoder.readInt32()
        let root_hash = decoder.readInt256Buff()
        let file_hash = decoder.readInt256Buff()
        return new tonNode_blockIdExt(workchain, shard, seqno, root_hash, file_hash)
    }
}


export class tonNode_zeroStateIdExt extends TLType {
    static typeId = 494024110;

    constructor(public workchain: TLInt, public root_hash: TLInt256, public file_hash: TLInt256) {
        super();
    }

    getId = () => 494024110;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.workchain)
        encoder.writeInt256Buff(this.root_hash)
        encoder.writeInt256Buff(this.file_hash)
    }

    static decode = (decoder: TLReadBuffer) => {
        let workchain = decoder.readInt32()
        let root_hash = decoder.readInt256Buff()
        let file_hash = decoder.readInt256Buff()
        return new tonNode_zeroStateIdExt(workchain, root_hash, file_hash)
    }
}


export class adnl_message_query extends TLType {
    static typeId = -1265895046;

    constructor(public query_id: TLInt256, public query: TLBytes) {
        super();
    }

    getId = () => -1265895046;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt256Buff(this.query_id)
        encoder.writeBuffer(this.query)
    }

    static decode = (decoder: TLReadBuffer) => {
        let query_id = decoder.readInt256Buff()
        let query = decoder.readBuff()
        return new adnl_message_query(query_id, query)
    }
}


export class adnl_message_answer extends TLType {
    static typeId = 262964246;

    constructor(public query_id: TLInt256, public answer: TLBytes) {
        super();
    }

    getId = () => 262964246;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt256Buff(this.query_id)
        encoder.writeBuffer(this.answer)
    }

    static decode = (decoder: TLReadBuffer) => {
        let query_id = decoder.readInt256Buff()
        let answer = decoder.readBuff()
        return new adnl_message_answer(query_id, answer)
    }
}


export class liteServer_error extends TLType {
    static typeId = -1146494648;

    constructor(public code: TLInt, public message: TLString) {
        super();
    }

    getId = () => -1146494648;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.code)
        encoder.writeString(this.message)
    }

    static decode = (decoder: TLReadBuffer) => {
        let code = decoder.readInt32()
        let message = decoder.readBuff()
        return new liteServer_error(code, message)
    }
}


export class liteServer_accountId extends TLType {
    static typeId = 1973478085;

    constructor(public workchain: TLInt, public id: TLInt256) {
        super();
    }

    getId = () => 1973478085;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.workchain)
        encoder.writeInt256Buff(this.id)
    }

    static decode = (decoder: TLReadBuffer) => {
        let workchain = decoder.readInt32()
        let id = decoder.readInt256Buff()
        return new liteServer_accountId(workchain, id)
    }
}


export class liteServer_masterchainInfo extends TLType {
    static typeId = -2055001983;

    constructor(public last: tonNode_blockIdExt, public state_root_hash: TLInt256, public init: tonNode_zeroStateIdExt) {
        super();
    }

    getId = () => -2055001983;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.last)
        encoder.writeInt256Buff(this.state_root_hash)
        encoder.writeType(this.init)
    }

    static decode = (decoder: TLReadBuffer) => {
        let last = decoder.readType(tonNode_blockIdExt)
        let state_root_hash = decoder.readInt256Buff()
        let init = decoder.readType(tonNode_zeroStateIdExt)
        return new liteServer_masterchainInfo(last, state_root_hash, init)
    }
}


export class liteServer_masterchainInfoExt extends TLType {
    static typeId = -1462968075;

    constructor(public mode: TLFlag, public version: TLInt, public capabilities: TLLong, public last: tonNode_blockIdExt, public last_utime: TLInt, public now: TLInt, public state_root_hash: TLInt256, public init: tonNode_zeroStateIdExt) {
        super();
    }

    getId = () => -1462968075;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.mode)
        encoder.writeInt32(this.version)
        encoder.writeInt64(this.capabilities)
        encoder.writeType(this.last)
        encoder.writeInt32(this.last_utime)
        encoder.writeInt32(this.now)
        encoder.writeInt256Buff(this.state_root_hash)
        encoder.writeType(this.init)
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readInt32()
        let version = decoder.readInt32()
        let capabilities = decoder.readInt64()
        let last = decoder.readType(tonNode_blockIdExt)
        let last_utime = decoder.readInt32()
        let now = decoder.readInt32()
        let state_root_hash = decoder.readInt256Buff()
        let init = decoder.readType(tonNode_zeroStateIdExt)
        return new liteServer_masterchainInfoExt(mode, version, capabilities, last, last_utime, now, state_root_hash, init)
    }
}


export class liteServer_currentTime extends TLType {
    static typeId = -380436467;

    constructor(public now: TLInt) {
        super();
    }

    getId = () => -380436467;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.now)
    }

    static decode = (decoder: TLReadBuffer) => {
        let now = decoder.readInt32()
        return new liteServer_currentTime(now)
    }
}


export class liteServer_version extends TLType {
    static typeId = 1510248933;

    constructor(public mode: TLFlag, public version: TLInt, public capabilities: TLLong, public now: TLInt) {
        super();
    }

    getId = () => 1510248933;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.mode)
        encoder.writeInt32(this.version)
        encoder.writeInt64(this.capabilities)
        encoder.writeInt32(this.now)
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readInt32()
        let version = decoder.readInt32()
        let capabilities = decoder.readInt64()
        let now = decoder.readInt32()
        return new liteServer_version(mode, version, capabilities, now)
    }
}


export class liteServer_blockData extends TLType {
    static typeId = -1519063700;

    constructor(public id: tonNode_blockIdExt, public data: TLBytes) {
        super();
    }

    getId = () => -1519063700;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.id)
        encoder.writeBuffer(this.data)
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readType(tonNode_blockIdExt)
        let data = decoder.readBuff()
        return new liteServer_blockData(id, data)
    }
}


export class liteServer_blockState extends TLType {
    static typeId = -1414669300;

    constructor(public id: tonNode_blockIdExt, public root_hash: TLInt256, public file_hash: TLInt256, public data: TLBytes) {
        super();
    }

    getId = () => -1414669300;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.id)
        encoder.writeInt256Buff(this.root_hash)
        encoder.writeInt256Buff(this.file_hash)
        encoder.writeBuffer(this.data)
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readType(tonNode_blockIdExt)
        let root_hash = decoder.readInt256Buff()
        let file_hash = decoder.readInt256Buff()
        let data = decoder.readBuff()
        return new liteServer_blockState(id, root_hash, file_hash, data)
    }
}


export class liteServer_blockHeader extends TLType {
    static typeId = 1965916697;

    constructor(public id: tonNode_blockIdExt, public mode: TLFlag, public header_proof: TLBytes) {
        super();
    }

    getId = () => 1965916697;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.id)
        encoder.writeInt32(this.mode)
        encoder.writeBuffer(this.header_proof)
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readType(tonNode_blockIdExt)
        let mode = decoder.readInt32()
        let header_proof = decoder.readBuff()
        return new liteServer_blockHeader(id, mode, header_proof)
    }
}


export class liteServer_sendMsgStatus extends TLType {
    static typeId = 961602967;

    constructor(public status: TLInt) {
        super();
    }

    getId = () => 961602967;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.status)
    }

    static decode = (decoder: TLReadBuffer) => {
        let status = decoder.readInt32()
        return new liteServer_sendMsgStatus(status)
    }
}


export class liteServer_accountState extends TLType {
    static typeId = 1887029073;

    constructor(public id: tonNode_blockIdExt, public shardblk: tonNode_blockIdExt, public shard_proof: TLBytes, public proof: TLBytes, public state: TLBytes) {
        super();
    }

    getId = () => 1887029073;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.id)
        encoder.writeType(this.shardblk)
        encoder.writeBuffer(this.shard_proof)
        encoder.writeBuffer(this.proof)
        encoder.writeBuffer(this.state)
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readType(tonNode_blockIdExt)
        let shardblk = decoder.readType(tonNode_blockIdExt)
        let shard_proof = decoder.readBuff()
        let proof = decoder.readBuff()
        let state = decoder.readBuff()
        return new liteServer_accountState(id, shardblk, shard_proof, proof, state)
    }
}


export class liteServer_runMethodResult extends TLType {
    static typeId = -1550163605;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt, public shardblk: tonNode_blockIdExt, public shard_proof: TLBytes, public proof: TLBytes, public state_proof: TLBytes, public init_c7: TLBytes, public lib_extras: TLBytes, public exit_code: TLInt, public result: TLBytes) {
        super();
    }

    getId = () => -1550163605;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.mode)
        encoder.writeType(this.id)
        encoder.writeType(this.shardblk)
        encoder.writeBuffer(this.shard_proof)
        encoder.writeBuffer(this.proof)
        encoder.writeBuffer(this.state_proof)
        encoder.writeBuffer(this.init_c7)
        encoder.writeBuffer(this.lib_extras)
        encoder.writeInt32(this.exit_code)
        encoder.writeBuffer(this.result)
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readInt32()
        let id = decoder.readType(tonNode_blockIdExt)
        let shardblk = decoder.readType(tonNode_blockIdExt)
        let shard_proof = decoder.readBuff()
        let proof = decoder.readBuff()
        let state_proof = decoder.readBuff()
        let init_c7 = decoder.readBuff()
        let lib_extras = decoder.readBuff()
        let exit_code = decoder.readInt32()
        let result = decoder.readBuff()
        return new liteServer_runMethodResult(mode, id, shardblk, shard_proof, proof, state_proof, init_c7, lib_extras, exit_code, result)
    }
}


export class liteServer_shardInfo extends TLType {
    static typeId = -1612264060;

    constructor(public id: tonNode_blockIdExt, public shardblk: tonNode_blockIdExt, public shard_proof: TLBytes, public shard_descr: TLBytes) {
        super();
    }

    getId = () => -1612264060;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.id)
        encoder.writeType(this.shardblk)
        encoder.writeBuffer(this.shard_proof)
        encoder.writeBuffer(this.shard_descr)
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readType(tonNode_blockIdExt)
        let shardblk = decoder.readType(tonNode_blockIdExt)
        let shard_proof = decoder.readBuff()
        let shard_descr = decoder.readBuff()
        return new liteServer_shardInfo(id, shardblk, shard_proof, shard_descr)
    }
}


export class liteServer_allShardsInfo extends TLType {
    static typeId = 160425773;

    constructor(public id: tonNode_blockIdExt, public proof: TLBytes, public data: TLBytes) {
        super();
    }

    getId = () => 160425773;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.id)
        encoder.writeBuffer(this.proof)
        encoder.writeBuffer(this.data)
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readType(tonNode_blockIdExt)
        let proof = decoder.readBuff()
        let data = decoder.readBuff()
        return new liteServer_allShardsInfo(id, proof, data)
    }
}


export class liteServer_transactionInfo extends TLType {
    static typeId = 249490759;

    constructor(public id: tonNode_blockIdExt, public proof: TLBytes, public transaction: TLBytes) {
        super();
    }

    getId = () => 249490759;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.id)
        encoder.writeBuffer(this.proof)
        encoder.writeBuffer(this.transaction)
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readType(tonNode_blockIdExt)
        let proof = decoder.readBuff()
        let transaction = decoder.readBuff()
        return new liteServer_transactionInfo(id, proof, transaction)
    }
}


export class liteServer_transactionList extends TLType {
    static typeId = -1188112483;

    constructor(public transactions: TLBytes) {
        super();
    }

    getId = () => -1188112483;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeBuffer(this.transactions)
    }

    static decode = (decoder: TLReadBuffer) => {
        let transactions = decoder.readBuff()
        return new liteServer_transactionList(transactions)
    }
}


export class liteServer_transactionId extends TLType {
    static typeId = -1322293841;

    constructor(public mode: TLFlag, public account: TLInt256, public lt: TLLong, public hash: TLInt256) {
        super();
    }

    getId = () => -1322293841;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.mode)
        encoder.writeInt256Buff(this.account)
        encoder.writeInt64(this.lt)
        encoder.writeInt256Buff(this.hash)
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readInt32()
        let account = decoder.readInt256Buff()
        let lt = decoder.readInt64()
        let hash = decoder.readInt256Buff()
        return new liteServer_transactionId(mode, account, lt, hash)
    }
}


export class liteServer_transactionId3 extends TLType {
    static typeId = 746707575;

    constructor(public account: TLInt256, public lt: TLLong) {
        super();
    }

    getId = () => 746707575;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt256Buff(this.account)
        encoder.writeInt64(this.lt)
    }

    static decode = (decoder: TLReadBuffer) => {
        let account = decoder.readInt256Buff()
        let lt = decoder.readInt64()
        return new liteServer_transactionId3(account, lt)
    }
}


export class liteServer_blockTransactions extends TLType {
    static typeId = 794061916;

    constructor(public id: tonNode_blockIdExt, public req_count: TLFlag, public incomplete: TLBool, public proof: TLBytes) {
        super();
    }

    getId = () => 794061916;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.id)
        encoder.writeInt32(this.req_count)
        encoder.writeType(this.incomplete)
        encoder.writeBuffer(this.proof)
    }

    static decode = (decoder: TLReadBuffer) => {
        let id = decoder.readType(tonNode_blockIdExt)
        let req_count = decoder.readInt32()
        let incomplete = decoder.readBool()
        let proof = decoder.readBuff()
        return new liteServer_blockTransactions(id, req_count, incomplete, proof)
    }
}


export class liteServer_signature extends TLType {
    static typeId = -1545668523;

    constructor(public node_id_short: TLInt256, public signature: TLBytes) {
        super();
    }

    getId = () => -1545668523;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt256Buff(this.node_id_short)
        encoder.writeBuffer(this.signature)
    }

    static decode = (decoder: TLReadBuffer) => {
        let node_id_short = decoder.readInt256Buff()
        let signature = decoder.readBuff()
        return new liteServer_signature(node_id_short, signature)
    }
}


export class liteServer_signatureSet extends TLType {
    static typeId = -1830726249;

    constructor(public validator_set_hash: TLInt, public catchain_seqno: TLInt) {
        super();
    }

    getId = () => -1830726249;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.validator_set_hash)
        encoder.writeInt32(this.catchain_seqno)
    }

    static decode = (decoder: TLReadBuffer) => {
        let validator_set_hash = decoder.readInt32()
        let catchain_seqno = decoder.readInt32()
        return new liteServer_signatureSet(validator_set_hash, catchain_seqno)
    }
}


export class liteServer_blockLinkBack extends TLType {
    static typeId = -276947985;

    constructor(public to_key_block: TLBool, public from: tonNode_blockIdExt, public to: tonNode_blockIdExt, public dest_proof: TLBytes, public proof: TLBytes, public state_proof: TLBytes) {
        super();
    }

    getId = () => -276947985;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.to_key_block)
        encoder.writeType(this.from)
        encoder.writeType(this.to)
        encoder.writeBuffer(this.dest_proof)
        encoder.writeBuffer(this.proof)
        encoder.writeBuffer(this.state_proof)
    }

    static decode = (decoder: TLReadBuffer) => {
        let to_key_block = decoder.readBool()
        let from = decoder.readType(tonNode_blockIdExt)
        let to = decoder.readType(tonNode_blockIdExt)
        let dest_proof = decoder.readBuff()
        let proof = decoder.readBuff()
        let state_proof = decoder.readBuff()
        return new liteServer_blockLinkBack(to_key_block, from, to, dest_proof, proof, state_proof)
    }
}


export class liteServer_blockLinkForward extends TLType {
    static typeId = 1376767516;

    constructor(public to_key_block: TLBool, public from: tonNode_blockIdExt, public to: tonNode_blockIdExt, public dest_proof: TLBytes, public config_proof: TLBytes, public signatures: liteServer_SignatureSet) {
        super();
    }

    getId = () => 1376767516;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.to_key_block)
        encoder.writeType(this.from)
        encoder.writeType(this.to)
        encoder.writeBuffer(this.dest_proof)
        encoder.writeBuffer(this.config_proof)
        encoder.writeType(this.signatures)
    }

    static decode = (decoder: TLReadBuffer) => {
        let to_key_block = decoder.readBool()
        let from = decoder.readType(tonNode_blockIdExt)
        let to = decoder.readType(tonNode_blockIdExt)
        let dest_proof = decoder.readBuff()
        let config_proof = decoder.readBuff()
        let signatures = decoder.readType(liteServer_SignatureSet)
        return new liteServer_blockLinkForward(to_key_block, from, to, dest_proof, config_proof, signatures)
    }
}


export class liteServer_partialBlockProof extends TLType {
    static typeId = 221128719;

    constructor(public complete: TLBool, public from: tonNode_blockIdExt, public to: tonNode_blockIdExt) {
        super();
    }

    getId = () => 221128719;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeType(this.complete)
        encoder.writeType(this.from)
        encoder.writeType(this.to)
    }

    static decode = (decoder: TLReadBuffer) => {
        let complete = decoder.readBool()
        let from = decoder.readType(tonNode_blockIdExt)
        let to = decoder.readType(tonNode_blockIdExt)
        return new liteServer_partialBlockProof(complete, from, to)
    }
}


export class liteServer_configInfo extends TLType {
    static typeId = -1367660753;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt, public state_proof: TLBytes, public config_proof: TLBytes) {
        super();
    }

    getId = () => -1367660753;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.mode)
        encoder.writeType(this.id)
        encoder.writeBuffer(this.state_proof)
        encoder.writeBuffer(this.config_proof)
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readInt32()
        let id = decoder.readType(tonNode_blockIdExt)
        let state_proof = decoder.readBuff()
        let config_proof = decoder.readBuff()
        return new liteServer_configInfo(mode, id, state_proof, config_proof)
    }
}


export class liteServer_validatorStats extends TLType {
    static typeId = -1174956328;

    constructor(public mode: TLFlag, public id: tonNode_blockIdExt, public count: TLInt, public complete: TLBool, public state_proof: TLBytes, public data_proof: TLBytes) {
        super();
    }

    getId = () => -1174956328;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.mode)
        encoder.writeType(this.id)
        encoder.writeInt32(this.count)
        encoder.writeType(this.complete)
        encoder.writeBuffer(this.state_proof)
        encoder.writeBuffer(this.data_proof)
    }

    static decode = (decoder: TLReadBuffer) => {
        let mode = decoder.readInt32()
        let id = decoder.readType(tonNode_blockIdExt)
        let count = decoder.readInt32()
        let complete = decoder.readBool()
        let state_proof = decoder.readBuff()
        let data_proof = decoder.readBuff()
        return new liteServer_validatorStats(mode, id, count, complete, state_proof, data_proof)
    }
}


export class liteServer_debug_verbosity extends TLType {
    static typeId = 1564493619;

    constructor(public value: TLInt) {
        super();
    }

    getId = () => 1564493619;

    encode = (encoder: TLWriteBuffer) => {
        encoder.writeInt32(this.value)
    }

    static decode = (decoder: TLReadBuffer) => {
        let value = decoder.readInt32()
        return new liteServer_debug_verbosity(value)
    }
}


