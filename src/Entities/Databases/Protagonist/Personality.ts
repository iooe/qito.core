import Media from "../../Basic/Objects/Media";

export default class Personality {

    private readonly _uuid: string
    private _name: string = ''
    private _value: number = 0
    private _media: Media = new Media()

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public getUuid(): string {
        return this._uuid;
    }

    public name = {
        set: (value: string) => {
            this._name = value
        },
        get: () => {
            return this._name
        }
    }
    public value = {
        set: (value: number) => {
            this._value = value;
        },
        get: () => {
            return this._value
        }
    }

    public media = {
        get: () => {
            return this._media;
        },
        set: (value: Media) => {
            this._media = value
        }
    }

    public export(): Object {
        return {
            uuid: this._uuid,
            name: this._name,
            media: {
                id: this._media.path()
            },
            value: this._value
        }
    }
}