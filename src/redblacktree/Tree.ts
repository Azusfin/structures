/* eslint-disable max-lines */
import { Color, Key, Node } from "./Node"

export class Tree<K extends Key, V = unknown> {
    public root: Node<K, V>
    #nilNode: Node<K, V>

    constructor(entries?: [K, V][]) {
        this.#nilNode = {
            key: 0,
            value: undefined,
            color: Color.Black
        } as unknown as Node<K, V>

        this.root = this.#nilNode

        if (Array.isArray(entries)) {
            for (const [key, value] of entries) {
                this.insert(key, value)
            }
        }
    }

    public find(key: K): FindResult<V> {
        let node = this.root

        while (node !== this.#nilNode) {
            if (node.key === key) {
                return {
                    found: true,
                    value: node.value
                }
            }

            if (key < node.key) {
                node = node.left!
            } else {
                node = node.right!
            }
        }

        return { found: false }
    }

    public insert(key: K, value: V): boolean {
        let node = this.root
        let parent: Node<K, V> | undefined

        while (node !== this.#nilNode) {
            if (node.key === key) {
                return false
            }

            parent = node

            if (key < node.key) {
                node = node.left!
            } else {
                node = node.right!
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
        let node = this.root
        let parent: Node<K, V> | undefined

        while (node !== this.#nilNode) {
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
                node = node.left!
            } else {
                node = node.right!
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

    public delete(key: K): DeleteResult<V> {
        let node = this.root

        while (node !== this.#nilNode) {
            if (node.key === key) {
                break
            }

            if (key < node.key) {
                node = node.left!
            } else {
                node = node.right!
            }
        }

        if (node === this.#nilNode) {
            return { deleted: false }
        }

        let color = node.color
        let x: Node<K, V>
        let y: Node<K, V>

        if (node.left === this.#nilNode) {
            x = node.right!
            this.#transplant(node, x)
        } else if (node.right === this.#nilNode) {
            x = node.left!
            this.#transplant(node, x)
        } else {
            y = this.#minimum(node.right!)
            color = y.color
            x = y.right!

            if (y.parent === node) {
                x.parent = y
            } else {
                this.#transplant(y, node.right!)

                y.right = node.right
                y.right!.parent = y
            }

            this.#transplant(node, y)

            y.left = node.left
            y.left!.parent = y
            y.color = node.color
        }

        if (color === Color.Black) {
            this.#fixDelete(x)
        }

        return {
            deleted: true,
            value: node.value
        }
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

        this.root.color = Color.Black
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

    #transplant(node: Node<K, V>, target: Node<K, V>): void {
        if (!node.parent) {
            this.root = target
        } else if (node.parent.left === node) {
            node.parent.left = target
        } else {
            node.parent.right = target
        }

        target.parent = node.parent
    }

    #minimum(node: Node<K, V>): Node<K, V> {
        let left = node

        while (left.left !== this.#nilNode) {
            left = left.left!
        }

        return left
    }

    #fixDelete(node: Node<K, V>): void {
        let x = node

        while (x !== this.root && x.color === Color.Black) {
            if (x === x.parent?.left) {
                let w = x.parent.right!

                if (w.color === Color.Red) {
                    w.color = Color.Black
                    x.parent.color = Color.Red

                    this.#leftRotate(x.parent)

                    w = x.parent.right!
                }

                if (w.left?.color === Color.Black && w.right?.color === Color.Black) {
                    w.color = Color.Red
                    x = x.parent
                } else {
                    if (w.right?.color === Color.Black) {
                        w.left!.color = Color.Black
                        w.color = Color.Red

                        this.#rightRotate(w)

                        w = x.parent.right!
                    }

                    w.color = x.parent.color
                    x.parent.color = Color.Black
                    w.right!.color = Color.Black

                    this.#leftRotate(x.parent)

                    x = this.root
                }
            } else {
                let w = x.parent!.left!

                if (w.color === Color.Red) {
                    w.color = Color.Black
                    x.parent!.color = Color.Red

                    this.#rightRotate(x.parent!)

                    w = x.parent!.left!
                }

                if (w.left?.color === Color.Black && w.right?.color === Color.Black) {
                    w.color = Color.Red
                    x = x.parent!
                } else {
                    if (w.left?.color === Color.Black) {
                        w.right!.color = Color.Black
                        w.color = Color.Red

                        this.#leftRotate(w)

                        w = x.parent!.left!
                    }

                    w.color = x.parent!.color
                    x.parent!.color = Color.Black
                    w.left!.color = Color.Black

                    this.#rightRotate(x.parent!)

                    x = this.root
                }
            }
        }

        x.color = Color.Black
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

export type DeleteResult<V = unknown> = {
    deleted: false
} | {
    deleted: true
    value: V
}
