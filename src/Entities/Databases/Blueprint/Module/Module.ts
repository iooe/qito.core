import {v4 as uuidv4} from 'uuid';

import Node from "./Node/Node";

export default class Module {
    private _title: string = ''
    private readonly _uuid: string = ''
    private _rootNodeUuid: string = ''
    private _nodes: Array<Node> = [];

    constructor(uuid: string) {
        this._uuid = uuid
        this._title = uuid
    }

    public static create() {
        return new Module(uuidv4())
    }

    public getUuid() {
        return this._uuid
    }

    public title = {
        get: () => {
            return this._title
        },
        set: (value: string) => {
            this._title = value
        }
    }

    public nodes = {
        root: {
            set: (node: Node) => {
                if (!this.nodes.has(node.getUuid())) {
                    this.nodes.add(node)
                }

                this._rootNodeUuid = node.getUuid()
            },
            get: () => {
                return this.nodes.first(this._rootNodeUuid)
            }
        },
        first: (uuid: string = '') => {
            if (uuid.length === 0) {
                return this._nodes[0]
            }

            return this._nodes.find((node: Node) => node.getUuid() === uuid)
        },
        has: (uuid: string) => {
            return this._nodes.find((node: Node) => node.getUuid() === uuid) !== undefined;
        },
        delete: (uuid: string) => {
            const index = this._nodes.findIndex((node: Node) => node.getUuid() === uuid)

            if (index === -1) {
                return
            }

            this._nodes.splice(index, 1)
        },
        get: () => {
            return this._nodes
        },
        add: (node: Node) => {
            this._nodes.push(node)
        },
        push: (node: Node) => {
            this._nodes.push(node)
        },
        update: (node: Node) => {
            //@ts-ignore
            const index = this._nodes.findIndex(value => value.getUuid() === node.getUuid())

            if (index === -1) {
                return
            }

            this._nodes[index] = node
        },
        isCursored: (uuid: string) => {
            return this._nodes.find((node: Node) => {
                if (!node.connection.has()) {
                    return false
                }

                return node.connection.get().uuid() === uuid
            })
        },
        isEmpty: () => {
            return this._nodes.length === 0
        }
    }

    public export() {
        return {
            uuid: this._uuid,
            title: this._title,
            rootNodeUuid: this._rootNodeUuid,
            nodes: this._nodes.map((node: Node) => node.export())
        }
    }
}