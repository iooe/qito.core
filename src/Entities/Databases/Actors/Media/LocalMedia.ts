import {v4 as uuidv4} from 'uuid';

export default class LocalMedia {

    private _path: string = ''
    private _type: string = ''
    private _format: string = ''
    private readonly _uuid: string

    public create() {
        return new LocalMedia(uuidv4())
    }

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public uuid = {
        get: (): string => this._uuid
    }

    public path = {
        set: (value: string) => {
            this._path = value
        },
        get: () => {
            return this._path
        }
    }

    public type = {
        set: (value: string) => {
            this._type = value
        },
        get: () => {
            return this._type
        }
    }

    public format = {
        set: (value: string) => {
            this._format = value
        },
        get: () => {
            return this._format
        }
    }

    public isEmpty(): boolean {
        return this._path.length === 0
    }

    public export(): object {
        return {
            uuid: this._uuid,
            type: this._type,
            path: this._path,
            format: this._format,
        }
    }
}