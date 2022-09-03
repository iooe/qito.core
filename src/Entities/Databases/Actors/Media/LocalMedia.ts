import {v4 as uuidv4} from 'uuid';

export default class LocalMedia {

    private _type: string = ''
    private _extension: string = ''

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


    public type = {
        set: (value: string) => {
            this._type = value
        },
        get: () => {
            return this._type
        }
    }

    public extension = {
        set: (value: string) => {
            this._extension = value
        },
        get: () => {
            return this._extension
        }
    }

    public export(): object {
        return {
            uuid: this._uuid,
            type: this._type,
            extension: this._extension,
        }
    }
}