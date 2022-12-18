import {v4 as uuidv4} from 'uuid';

import {Node} from "./Node/Node";
import Collection from "../../../../Structures/Collection";

export default class Module {
    private _title: string
    private readonly _uuid: string
    private _rootNodeUuid = ''
    private _nodes = new Collection('uuid')

    constructor(uuid: string) {
        this._uuid = uuid
        this._title = uuid
    }

    public static create() {
        return new Module(uuidv4())
    }

    public uuid = {
        get: (): string => this._uuid
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
            set: (uuid: string) => {
                if (!this._nodes.has(uuid)) {
                    return;
                }

                this._rootNodeUuid = uuid;
            },
            get: () => {
                return this._nodes.first(this._rootNodeUuid)
            }
        },
        first: (uuid: string = ''): Node | undefined => this._nodes.first(uuid),
        has: (uuid: string): boolean => this._nodes.has(uuid),
        delete: (uuid: string) => this._nodes.delete(uuid),
        get: () => this._nodes.get(),
        add: (value: Node) => this._nodes.add(value),
        update: (node: Node) => this._nodes.replace(node.uuid.get(), node),
        isEmpty: (): boolean => this._nodes.isEmpty()
    }

    public export() {
        return {
            uuid: this._uuid,
            title: this._title,
            rootNodeUuid: this._rootNodeUuid,
            nodes: this._nodes.get().map((node: Node) => node.export())
        }
    }
}