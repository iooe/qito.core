import {v4 as uuidv4} from 'uuid';
import type SwitcherCase from './SwitcherCase';
import Collection from '../../../../Structures/Collection';

export default class SwitcherNode {

    protected _uuid: string;
    protected _collection = new Collection('uuid');

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public static create() {
        return new SwitcherNode(uuidv4());
    }

    public uuid = {
        get: () => {
            return this._uuid;
        },
    };

    public export() {
        return {
            uuid: this._uuid,
            data: this._collection.get().map((value: SwitcherCase) => value.export()),
        };
    }

    public containers = {
        set: (values: Array<SwitcherCase>) => this._collection.set(values),
        first: (uuid: string): SwitcherCase | undefined => this._collection.first(uuid),
        has: (uuid: string): boolean => this._collection.has(uuid),
        delete: (uuid: string) => this._collection.delete(uuid),
        get: (): Array<SwitcherCase> => this._collection.get(),
        add: (value: SwitcherCase) => this._collection.add(value),
    };
}