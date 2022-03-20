import { Uint4Array } from "./Uint4Array"

export class Int4Array extends Uint4Array {
    public set(offset: number, int4: number): void {
        super.set(offset, int4 & 0xf)
    }

    public get(offset: number): number {
        const uint4 = super.get(offset)
        return uint4 | (uint4 & 2 ** 3) * 0x1fffffff
    }
}
