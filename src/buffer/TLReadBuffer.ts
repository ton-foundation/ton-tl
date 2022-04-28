import BN from "bn.js";

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
        let val = this.#buf.readUInt32LE(this.#offset);
        this.#offset += 4;
        return val;
    }

    readInt64() {
        this.#ensureSize(8);
        let buff = this.#buf.slice(this.#offset, this.#offset + 8);
        this.#offset += 8;
        return new BN(buff).toString(10);
    }

    readUInt8() {
        this.#ensureSize(1);
        let val = this.#buf.readUint8(this.#offset);
        this.#offset++;
        return val;
    }

    readInt256() {
        this.#ensureSize(256 / 8);
        let buff = this.#buf.slice(this.#offset, this.#offset + 256 / 8);
        this.#offset += 256 / 8;
        return buff;
    }

    readBuffer() {
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

    readString() {
        return this.readBuffer().toString('utf-8');
    }

    readBool() {
        return this.readUInt8() != 0;
    }

    readConstructor<T extends { typeId: number, new(...args: any[]): InstanceType<T>, decode: (decoder: TLReadBuffer) => InstanceType<T> }>(type: T) {
        return type.decode(this);
    }
}