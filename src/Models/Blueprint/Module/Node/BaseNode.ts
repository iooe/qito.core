import {v4 as uuidv4} from 'uuid';
import Connection from '../Connection';
import {Node} from './Node';
import Collection from '../../../../Structures/Collection';

export default class BaseNode implements Node {
    private _title: string;
    private _connection: Connection | null = null;
    private _nodes = new Collection('uuid');

    private _metadata = {
        keywords: <Array<string>>[],
    };

    private readonly _uuid: string;
    private _data = {
        component: '',
        uuid: '',
    };

    constructor(uuid: string) {
        this._uuid = uuid;
        this._title = uuid;
    }

    public static create() {
        return new BaseNode(uuidv4());
    }

    public uuid = {
        get: (): string => this._uuid,
    };

    public metadata = {
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

    public connection = {
        has: (): boolean => {
            return this._connection !== null;
        },
        get: (): Connection | null => {
            return this._connection;
        },
        set: (instance: Connection) => {
            this._connection = instance;
        },
        delete: () => {
            this._connection = null;
        },
    };

    public title = {
        get: (): string => {
            return this._title;
        },
        set: (value: string) => {
            this._title = value;
        },
    };

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
        add: (node: Node) => this._nodes.add(node),
    };

    public export() {
        let response: any = {
            uuid: this._uuid,
            data: {
                component: this._data.component,
                uuid: this._data.uuid,
            },
            metadata: {
                keywords: [...this._metadata.keywords],
            },
        };

        if (this._title !== this._uuid) {
            response.title = this._title;
        }

        if (this._connection !== null) {
            response.connection = this._connection.export();
        }

        if (!this._nodes.isEmpty()) {
            response.nodes = this._nodes.get().map(node => node.export());
        }

        return response;
    }
}