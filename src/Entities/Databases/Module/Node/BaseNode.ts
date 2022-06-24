import {v4 as uuidv4} from 'uuid';
import Connection from "../Connection";
import Callback from "./Callback/CallbackContract";
import Node from "./Node";

export const constants = {
    CALLBACKS: [
        'onCreated',
        'onClosed'
    ]
} as const;

export default class BaseNode implements Node {
    private _title: string
    private _connection: Connection | null = null
    private _nodes: Array<Node> = []

    private readonly _uuid: string
    protected _callbacks: Array<{ key: string, values: Array<Callback> }> = [];
    private _data = {
        component: '',
        uuid: ''
    }

    constructor(uuid: string) {
        this._uuid = uuid
        this._title = uuid

        constants.CALLBACKS.forEach(value => this._callbacks.push({key: value, values: []}))
    }

    public static create() {
        return new BaseNode(uuidv4())
    }

    public getUuid() {
        return this._uuid
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
    public callbacks = {
        get: () => {
            return this._callbacks
        },
        first: (key: string) => {
            const instance = this._callbacks.find(value => value.key === key)

            if (instance === undefined) {
                return;
            }

            return instance.values
        },
        delete: (key: string, index: number) => {
            const instance = this._callbacks.find(value => value.key === key)

            if (instance === undefined) {
                return;
            }

            instance.values.splice(index, 1)
        },
        push: (key: string, callback: Callback) => {
            const instance = this._callbacks.find(value => value.key === key)

            if (instance === undefined) {
                return;
            }

            instance.values.push(callback)
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
        get: (): Array<Node> => {
            return this._nodes
        },
        isEmpty: (): boolean => {
            return this._nodes.length === 0
        },
        first: (uuid: string) => {
            return this._nodes.find(node => node.getUuid() === uuid)
        },
        has: (uuid: string) => {
            return this.nodes.first(uuid) !== undefined
        },
        delete: (uuid: string) => {
            const index = this._nodes.findIndex(node => node.getUuid() === uuid)

            if (index === -1) {
                return
            }

            this._nodes.splice(index, 1)
        },
        push: (node: Node) => {
            this.nodes.delete(node.getUuid())
            this._nodes.push(node)
        }
    }

    public export() {
        let callbacks: any = {}
        /*
                constants.CALLBACKS.forEach(value => callbacks[value] = [])
        */

        this._callbacks.forEach(value => {
            value.values.forEach(config => {
                if (!callbacks.hasOwnProperty(value.key)) {
                    callbacks[value.key] = []
                }

                callbacks[value.key].push(config.config.get())
            })
        })

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

        if (Object.keys(callbacks).length > 0) {
            response.callbacks = callbacks
        }

        if (this._nodes.length > 0) {
            response.nodes = this._nodes.map(node => node.export())
        }

        return response
    }
}