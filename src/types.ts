import { TLReadBuffer } from "./buffer/TLReadBuffer";
import { TLWriteBuffer } from "./buffer/TLWriteBuffer";

export type TLLong = string;
export type TLInt = number;
export type TLBytes = Buffer;
export type TLFlag = number;
export type TLBool = boolean;
export type TLString = string;
export type TLInt256 = Buffer;
export type TLInt128 = Buffer;

export abstract class TLConstructor {
    static readonly typeId: number;
    static decode: (decoder: TLReadBuffer) => TLConstructor;

    abstract getId: () => number;
    abstract encode: (encoder: TLWriteBuffer) => void;
}