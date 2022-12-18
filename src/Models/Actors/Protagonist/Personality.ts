import {v4 as uuidv4} from 'uuid';

export default class Personality {

    private readonly _uuid: string;
    private _name = '';
    private _value = 0;
    private _mediaUUid = '';

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public static create() {
        return new Personality(uuidv4());
    }

    public uuid = {
        get: () => {
            return this._uuid;
        },
    };

    public name = {
        set: (value: string) => {
            this._name = value;
        },
        get: () => {
            return this._name;
        },
    };
    public value = {
        set: (value: number) => {
            this._value = value;
        },
        get: () => {
            return this._value;
        },
    };

    public mediaUuid = {
        get: () => {
            return this._mediaUUid;
        },
        set: (value: string) => {
            this._mediaUUid = value;
        },
        has: () => {
            return this._mediaUUid.length > 0;
        },
    };

    public export(): Object {
        return {
            uuid: this._uuid,
            name: this._name,
            media: {
                uuid: this._mediaUUid,
            },
            value: this._value,
        };
    }
}