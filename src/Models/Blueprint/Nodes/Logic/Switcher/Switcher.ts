import {v4 as uuidv4} from 'uuid';
import type Case from './Case';
import Collection from '../../../../../Structures/Collection';

export default class Switcher {

    protected _uuid: string;
    protected _collection = new Collection('uuid');

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
            data: this._collection.get().map((value: Case) => value.export()),
        };
    }

    public containers = {
        set: (values: Array<Case>) => this._collection.set(values),
        first: (uuid: string) => this._collection.first(uuid),
        has: (uuid: string) => this._collection.has(uuid),
        delete: (uuid: string) => this._collection.delete(uuid),
        get: (): Array<Case> => this._collection.get(),
        add: (value: Case) => this._collection.add(value),
    };
}