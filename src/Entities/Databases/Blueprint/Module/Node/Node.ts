import Connection from "../Connection";

export default interface Node {
    uuid: {
        get(): string
    }

    connection: {
        has(): boolean,
        get(): Connection | null
        set(instance: Connection): void
        delete(): void
    }

    title: {
        get(): string,
        set(value: string),
    }
    nodes: {
        set(nodes: Array<Node>),
        first(uuid: string),
        swap(node1: Node | number, node2: Node | number),
        has(uuid: string),
        add(node: Node),
        delete(uuid: string),
        get(): Array<Node>,
        isEmpty(): boolean
    }
    data: {
        set(component: string, uuid: string): void
        getComponent(): string,
        getUuid(): string
    }

    export()
}