import Connection from "../Connection";

export default interface Node {
    getUuid(): string

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
        first(uuid: string),
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