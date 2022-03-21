import { Color, Key, Node } from "./Node"

export class Tree<K extends Key, V = unknown> {
    public root?: Node<K, V>
    #nilNode: Node<K, V>

    constructor() {
        this.#nilNode = {
            key: 0,
            value: undefined,
            color: Color.Black
        } as unknown as Node<K, V>
    }

    public find(key: K): FindResult<V> {
        let node: Node<K, V> | undefined = this.root

        while (node && node !== this.#nilNode) {
            if (node.key === key) {
                return {
                    found: true,
                    value: node.value
                }
            }

            if (key < node.key) {
                node = node.left
            } else {
                node = node.right
            }
        }

        return { found: false }
    }
}

export type FindResult<V = unknown> = {
    found: false
} | {
    found: true
    value: V
}
