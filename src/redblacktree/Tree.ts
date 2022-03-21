import { Key, Node } from "./Node"

export class Tree<K extends Key, V = unknown> {
    public root?: Node<K, V>
}
