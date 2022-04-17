import Media from "../../Basic/Objects/Media";

const TYPE_IMPORTANT = 'important',
    TYPE_FILLER = 'filler'

export const constants = {
    TYPES: [
        TYPE_FILLER,
        TYPE_IMPORTANT
    ]
} as const;

export default class Character {

    private _name: string = ''
    private _media: Media = new Media()
    private _type: string = TYPE_FILLER;
    private _relationship: number = 0
    private readonly _uuid: string;

    constructor(_uuid: string) {
        this._uuid = _uuid
    }

    public getUuid() {
        return this._uuid
    }

    public type = {
        isFiller: () => {
            return this._type === TYPE_FILLER
        },
        isImportant: () => {
            return this._type === TYPE_IMPORTANT
        },
        set: (value: string) => {
            this._type = value
        },
        get: () => {
            return this._type
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

    public name = {
        get: () => {
            return this._name
        },
        set: (value: string) => {
            this._name = value
        }
    }
    public relationship = {
        set: (value: number) => {
            this._relationship = value
        },
        get: () => {
            return this._relationship
        }
    }

    public export(): Object {
        return {
            uuid: this._uuid,
            name: this._name,
            media: {
                id: this._media.path()
            },
            relationship: this._relationship,
            type: this._type,
        }
    }
}