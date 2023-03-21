import type Variant from './Variant';
import {v4 as uuidv4} from 'uuid';
import Collection from '../../../../Structures/Collection';

export default class Choice {
    protected _uuid: string;
    public uuid = {
        get: (): string => this._uuid,
    };
    protected _collection = new Collection('uuid');
    public containers = {
        set: (values: Array<Variant>) => this._collection.set(values),
        add: (value: Variant) => this._collection.add(value),
        first: (uuid = '') => this._collection.first(uuid),
        get: () => this._collection.get(),
    };
    protected _title: string;
    public title = {
        get: () => {
            return this._title;
        },
        set: (value: string) => {
            this._title = value;
        },
    };

    constructor(uuid: string) {
        this._uuid = uuid;
        this._title = uuid;
    }

    public static create() {
        return new Choice(uuidv4());
    }

    public export() {
        return {
            uuid: this._uuid,
            metadata: {
                title: this._title,
            },
            data: this._collection.get().map((value: Variant) => value.export()),
        };
    }
}