import {v4 as uuidv4} from 'uuid';
import Connection from "../Connection";
import {Node} from "./Node";

export default class BaseNode implements Node {
    private _title: string
    private _connection: Connection | null = null
    private _nodes: Array<Node> = []

    private readonly _uuid: string
    private _data = {
        component: '',
        uuid: ''
    }

    constructor(uuid: string) {
        this._uuid = uuid
        this._title = uuid
    }

    public static create() {
        return new BaseNode(uuidv4())
    }

    public uuid = {
        get: (): string => this._uuid
    }

    public data = {
        set: (component: string, uuid: string) => {
            this._data.component = component
            this._data.uuid = uuid
        },
        getComponent: () => {
            return this._data.component
        },
        getUuid: () => {
            return this._data.uuid
        }
    }

    public connection = {
        has: (): boolean => {
            return this._connection !== null
        },
        get: (): Connection | null => {
            return this._connection
        },
        set: (instance: Connection) => {
            this._connection = instance
        },
        delete: () => {
            this._connection = null
        }
    }

    public title = {
        get: (): string => {
            return this._title
        },
        set: (value: string) => {
            this._title = value
        }
    }

    public nodes = {
        set: (nodes: Array<Node>) => {
            this._nodes = nodes
        },
        swap: (node1: Node | number, node2: Node | number) => {
            let index1 = -1,
                index2 = -1

            if (typeof node1 !== 'number') {
                //@ts-ignore
                index1 = this._nodes.findIndex((node: Node) => node.uuid.get() === node1.uuid.get())
            } else {
                index1 = node1
                node1 = this._nodes[index1]
            }

            if (typeof node2 !== 'number') {
                //@ts-ignore
                index2 = this._nodes.findIndex((node: Node) => node.uuid.get() === node2.uuid.get())
            } else {
                index2 = node2
                node2 = this._nodes[index2]
            }

            this._nodes[index1] = node2
            this._nodes[index2] = node1
        },
        get: (): Array<Node> => {
            return this._nodes
        },
        isEmpty: (): boolean => {
            return this._nodes.length === 0
        },
        first: (uuid: string) => {
            return this._nodes.find(node => node.uuid.get() === uuid)
        },
        has: (uuid: string) => {
            return this.nodes.first(uuid) !== undefined
        },
        delete: (uuid: string) => {
            const index = this._nodes.findIndex(node => node.uuid.get() === uuid)

            if (index === -1) {
                return
            }

            this._nodes.splice(index, 1)
        },
        add: (node: Node) => {
            if (this.nodes.has(node.uuid.get())) {
                return
            }

            this._nodes.push(node)
        }
    }

    public export() {
        let response: any = {
            uuid: this._uuid,
            data: {
                component: this._data.component,
                uuid: this._data.uuid
            }
        }

        if (this._title !== this._uuid) {
            response.title = this._title
        }

        if (this._connection !== null) {
            response.connection = this._connection.export()
        }

        if (this._nodes.length > 0) {
            response.nodes = this._nodes.map(node => node.export())
        }

        return response
    }
}