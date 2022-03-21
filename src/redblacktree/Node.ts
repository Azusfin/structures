export const enum Color {
    Black = 0,
    Red = 1
}

export type Key = number | string | bigint

export interface Node<K extends Key, V = unknown> {
    key: K
    value: V
    color: Color
    parent?: Node<K, V>
    left?: Node<K, V>
    right?: Node<K, V>
}
