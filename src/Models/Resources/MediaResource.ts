import {v4 as uuidv4} from 'uuid';

export default class MediaResource {
    private _type = '';

    public type = {
        set: (value: string) => {
            this._type = value;
        },
        get: () => {
            return this._type;
        },
    };

    private _name: string;

    public name = {
        set: (value: string) => {
            this._name = value;
        },
        get: () => {
            return this._name;
        },
    };

    private _extension = '';
    public extension = {
        set: (value: string) => {
            this._extension = value;
        },
        get: () => {
            return this._extension;
        },
    };
    private readonly _uuid: string;
    public uuid = {
        get: (): string => this._uuid,
    };

    constructor(uuid: string) {
        this._uuid = uuid;
        this._name = uuid;
    }

    public static create() {
        return new MediaResource(uuidv4());
    }

    public export(): object {
        return {
            uuid: this._uuid,
            name: this._name,
            type: this._type,
            extension: this._extension,
        };
    }
}