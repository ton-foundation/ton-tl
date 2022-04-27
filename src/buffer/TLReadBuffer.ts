export class TLReadBuffer {
    #offset = 0;
    readonly #buf: Buffer;

    constructor(buf: Buffer) {
        this.#buf = buf;
    }

    #ensureSize(needBytes: number) {
        if (this.#offset + needBytes > this.#buf.byteLength) {
            throw new Error('Not enough bytes');
        }
    }

    readInt32() {
        this.#ensureSize(4);
        let val = this.#buf.readInt32LE(this.#offset);
        this.#offset += 4;
        return val;
    }

    readUInt32() {
        this.#ensureSize(4);
        let val = this.#buf.readInt32LE(this.#offset);
        this.#offset += 4;
        return val;
    }

    readInt64() {
        this.#ensureSize(8);
        let val = this.#buf.readBigInt64LE(this.#offset);
        this.#offset += 8;
        return val;
    }

    readUInt8() {
        this.#ensureSize(1);
        let val = this.#buf.readUint8(this.#offset);
        this.#offset++;
        return val;
    }

    readInt256Fake() {
        this.#ensureSize(256 / 8);
        let val = this.#buf.readUint32LE(this.#offset);
        this.#offset += 256 / 8;
        return val;
    }

    readInt256Buff() {
        this.#ensureSize(256 / 8);
        let buff = this.#buf.slice(this.#offset, this.#offset + 256 / 8);
        this.#offset += 256 / 8;
        return buff;
    }

    readBuff() {
        let size = 1;
        let len = this.readUInt8();

        if (len === 254) {
            len = this.#buf.readUintLE(this.#offset, 3);
            this.#offset += 3;
            size += 3;
        }

        size += len;

        let buff = this.#buf.slice(this.#offset, this.#offset + len);
        this.#offset += len;

        while (size % 4 !== 0) {
            this.readUInt8();
            size += 1;
        }

        return buff;
    }

    readType<T extends { typeId: number, new(...args: any[]): InstanceType<T>, decode: (decoder: TLReadBuffer) => InstanceType<T> }>(type: T, boxed: boolean = false) {
        if (boxed) {
            let typeId = this.readUInt32()
            if (typeId !== type.typeId) {
                throw new Error(`Type id mismatch, expected: ${type.typeId}, got: ${typeId}`)
            }
        }
        return type.decode(this);
    }
}