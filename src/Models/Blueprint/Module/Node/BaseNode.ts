import {v4 as uuidv4} from 'uuid';
import Connection from '../Connection';
import type {Node} from './Node';
import Collection from '../../../../Structures/Collection';

export default class BaseNode implements Node {
    private _title: string;
    public title = {
        get: (): string => {
            return this._title;
        },
        set: (value: string) => {
            this._title = value;
        },
    };
    private _connection: Connection | null = null;
    public connection = {
        has: (): boolean => {
            return this._connection !== null;
        },
        get: (): string | null => {
            if (this._connection === null) {
                return undefined;
            }

            return this._connection.uuid();
        },
        set: (instance: Connection) => {
            this._connection = instance;
        },
        delete: () => {
            this._connection = null;
        },
    };
    private _nodes = new Collection('uuid');
    public nodes = {
        set: (values: Array<Node>) => this._nodes.set(values),
        /*        swap: (node1: Node | number, node2: Node | number) => {
                    let index1 = -1,
                        index2 = -1;

                    if (typeof node1 !== 'number') {
                        //@ts-ignore
                        index1 = this._nodes.firstIndex(node1.uuid.get());
                    } else {
                        index1 = node1;
                        node1 = this._nodes[index1];
                    }

                    if (typeof node2 !== 'number') {
                        //@ts-ignore
                        index2 = this._nodes.findIndex(node2.uuid.get());
                    } else {
                        index2 = node2;
                        node2 = this._nodes[index2];
                    }

                    this._nodes.add(node2, index1);
                    this._nodes.add(node1, index2);
                },*/
        get: (): Array<Node> => this._nodes.get(),
        isEmpty: (): boolean => this._nodes.isEmpty(),
        first: (uuid: string): Node | undefined => this._nodes.first(uuid),
        has: (uuid: string): boolean => this._nodes.has(uuid),
        delete: (uuid: string) => this._nodes.delete(uuid),
        add: (node: Node) => this._nodes.add(node)
    };
    private _metadata = {
        keywords: <Array<string>>[],
        isOutputNode: false,
    };
    public metadata = {
        setAsOutputNode: () => {
            this._metadata.isOutputNode = true;
        },
        setAsNotOutputNode: () => {
            this._metadata.isOutputNode = false;
        },
        isOutputNode: () => {
            return this._metadata.isOutputNode;
        },
        addKeyword: (value: string) => {
            this._metadata.keywords.push(value);
        },
        deleteKeyword(value: string) {
            const index = this._metadata.keywords.findIndex(keyword => keyword === value);

            if (index === -1) {
                return;
            }

            this.metadata.keywords.splice(index, 1);
        },
        setKeywords: (values: Array<string>) => {
            this._metadata.keywords = values;
        },
        getKeywords: () => {
            return this._metadata.keywords;
        },
    };
    private readonly _uuid: string;
    public uuid = {
        get: (): string => this._uuid,
    };
    private _data = {
        component: '',
        uuid: '',
    };
    public data = {
        set: (component: string, uuid: string) => {
            this._data.component = component;
            this._data.uuid = uuid;
        },
        getComponent: () => {
            return this._data.component;
        },
        getUuid: () => {
            return this._data.uuid;
        },
    };

    constructor(uuid: string) {
        this._uuid = uuid;
        this._title = uuid;
    }

    public static create() {
        return new BaseNode(uuidv4());
    }

    public export() {
        const response: any = {
            uuid: this._uuid,
            data: {
                component: this._data.component,
                uuid: this._data.uuid,
            },
            metadata: {
                title: this._title,
                keywords: [...this._metadata.keywords],
                isOutputNode: this._metadata.isOutputNode,
            },
            nodes: [],
        };

        if (this._connection !== null) {
            response.connection = this._connection.export();
        }

        if (!this._nodes.isEmpty()) {
            response.nodes = this._nodes.get().map(node => node.export());
        }

        return response;
    }
}