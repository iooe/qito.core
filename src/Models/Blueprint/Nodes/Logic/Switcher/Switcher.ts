import {v4 as uuidv4} from 'uuid';
import Case from './Case';

export default class Switcher {

    protected _uuid: string;
    protected _data: Array<Case> = [];

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public static create() {
        return new Switcher(uuidv4());
    }

    public uuid = {
        get: () => {
            return this._uuid;
        },
    };

    public export() {
        return {
            uuid: this._uuid,
            data: this._data.map((value: Case) => value.export()),
        };
    }

    public containers = {
        set: (nodes: Array<Case>) => {
            this._data = nodes;
        },
        swap: (node1: Case | number, node2: Case | number) => {
            let index1 = -1,
                index2 = -1;

            if (node1 instanceof Case) {
                index1 = this._data.findIndex((node: Case) => node.uuid.get() === node1.uuid.get());
            } else {
                index1 = node1;
                node1 = this._data[node1];
            }

            if (node2 instanceof Case) {
                index2 = this._data.findIndex((node: Case) => node.uuid.get() === node2.uuid.get());
            } else {
                index2 = node2;
                node2 = this._data[node2];
            }

            this._data[index1] = node2;
            this._data[index2] = node1;
        },
        first: (uuid: string = '') => {
            if (uuid.length === 0) {
                return this._data[0];
            }

            return this._data.find((node: Case) => node.uuid.get() === uuid);
        },
        has: (uuid: string) => {
            return this._data.find((node: Case) => node.uuid.get() === uuid) !== undefined;
        },
        delete: (uuid: string) => {
            const index = this._data.findIndex((node: Case) => node.uuid.get() === uuid);

            if (index === -1) {
                return;
            }

            this._data.splice(index, 1);
        },
        get: () => {
            return this._data;
        },
        add: (node: Case) => {
            this._data.push(node);
        },
    };
}