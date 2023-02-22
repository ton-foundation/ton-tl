/**
 * Copyright (c) Whales Corp. 
 * All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

export type TLFunction<REQ, RES> = {
    encodeRequest(src: REQ, encoder: TLWriteBuffer): void;
    decodeResponse(decoder: TLReadBuffer): RES;
};

export type TLCodec<T> = {
    decode(decoder: TLReadBuffer): T;
    encode(src: T, encoder: TLWriteBuffer): void;
}