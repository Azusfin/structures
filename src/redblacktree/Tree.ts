import { Color, Key, Node } from "./Node"

export class Tree<K extends Key, V = unknown> {
    public root?: Node<K, V>
    #nilNode: Node<K, V>

    constructor(entries?: [K, V][]) {
        this.#nilNode = {
            key: 0,
            value: undefined,
            color: Color.Black
        } as unknown as Node<K, V>

        if (Array.isArray(entries)) {
            for (const [key, value] of entries) {
                this.insert(key, value)
            }
        }
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

    public insert(key: K, value: V): boolean {
        let node: Node<K, V> | undefined = this.root
        let parent: Node<K, V> | undefined

        while (node && node !== this.#nilNode) {
            if (node.key === key) {
                return false
            }

            parent = node

            if (key < node.key) {
                node = node.left
            } else {
                node = node.right
            }
        }

        const newNode: Node<K, V> = {
            key,
            value,
            color: Color.Red,
            parent,
            left: this.#nilNode,
            right: this.#nilNode
        }

        if (!parent) {
            this.root = newNode
            this.root.color = Color.Black
            return true
        }

        if (key < parent.key) {
            parent.left = newNode
        } else {
            parent.right = newNode
        }

        if (parent.parent) {
            this.#fixInsert(newNode)
        }

        return true
    }

    public upsert(key: K, value: V): UpsertResult<V> {
        let node: Node<K, V> | undefined = this.root
        let parent: Node<K, V> | undefined

        while (node && node !== this.#nilNode) {
            if (node.key === key) {
                const oldValue = node.value
                node.value = value

                return {
                    inserted: false,
                    oldValue
                }
            }

            parent = node

            if (key < node.key) {
                node = node.left
            } else {
                node = node.right
            }
        }

        const newNode: Node<K, V> = {
            key,
            value,
            color: Color.Red,
            parent,
            left: this.#nilNode,
            right: this.#nilNode
        }

        if (!parent) {
            this.root = newNode
            this.root.color = Color.Black
            return { inserted: true }
        }

        if (key < parent.key) {
            parent.left = newNode
        } else {
            parent.right = newNode
        }

        if (parent.parent) {
            this.#fixInsert(newNode)
        }

        return { inserted: true }
    }

    #fixInsert(newNode: Node<K, V>): void {
        let node = newNode

        while (node.parent?.color === Color.Red) {
            if (node.parent.parent?.left === node.parent) {
                if (node.parent.parent.right?.color === Color.Red) {
                    node.parent.color = Color.Black
                    node.parent.parent.right.color = Color.Black
                    node.parent.parent.color = Color.Red
                    node = node.parent.parent
                } else {
                    if (node.parent.right === node) {
                        node = node.parent
                        this.#leftRotate(node)
                    }

                    node.parent!.color = Color.Black
                    node.parent!.parent.color = Color.Red

                    this.#rightRotate(node.parent!.parent)
                }
            } else if (node.parent.parent?.left?.color === Color.Red) {
                node.parent.color = Color.Black
                node.parent.parent.left.color = Color.Black
                node.parent.parent.color = Color.Red
                node = node.parent.parent
            } else {
                if (node.parent.left === node) {
                    node = node.parent
                    this.#rightRotate(node)
                }

                node.parent!.color = Color.Black
                node.parent!.parent!.color = Color.Red

                this.#leftRotate(node.parent!.parent!)
            }
        }

        this.root!.color = Color.Black
    }

    #leftRotate(x: Node<K, V>): void {
        const y = x.right!
        x.right = y.left

        if (y.left !== this.#nilNode) {
            y.left!.parent = x
        }

        y.parent = x.parent

        if (!x.parent) {
            this.root = y
        } else if (x.parent.left === x) {
            x.parent.left = y
        } else {
            x.parent.right = y
        }

        y.left = x
        x.parent = y
    }

    #rightRotate(x: Node<K, V>): void {
        const y = x.left!
        x.left = y.right

        if (y.right !== this.#nilNode) {
            y.right!.parent = x
        }

        y.parent = x.parent

        if (!x.parent) {
            this.root = y
        } else if (x.parent.left === x) {
            x.parent.left = y
        } else {
            x.parent.right = y
        }

        y.right = x
        x.parent = y
    }
}

export type FindResult<V = unknown> = {
    found: false
} | {
    found: true
    value: V
}

export type UpsertResult<V = unknown> = {
    inserted: true
} | {
    inserted: false
    oldValue: V
}
