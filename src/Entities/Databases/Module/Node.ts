import Connection from "./Connection";

export default interface Node {
    getUuid():string

    connection: {
        has(): boolean,
        get(): Connection
        set(instance: Connection): void
        delete(): void
    }
}