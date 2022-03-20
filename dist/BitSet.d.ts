export declare class BitSet {
    #private;
    readonly bytes: Uint8Array;
    readonly size: number;
    constructor(bits: number);
    get byteLength(): number;
    set(bit: number): void;
    get(bit: number): boolean;
    flip(bit: number): void;
    clear(bit: number): void;
    clone(): BitSet;
    toString(): string;
}
