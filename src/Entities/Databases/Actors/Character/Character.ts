import {v4 as uuidv4} from 'uuid';
import Media from "../../../Basic/Objects/Media";

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
    private _mediaUUid: string = ''
    private _type: string = TYPE_FILLER;
    private _relationship: number = 0
    private readonly _uuid: string;

    constructor(_uuid: string) {
        this._uuid = _uuid
    }

    public static create() {
        return new Character(uuidv4())
    }

    public uuid = {
        get: (): string => this._uuid
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

    public mediaUuid = {
        get: () => {
            return this._mediaUUid;
        },
        set: (value: string) => {
            this._mediaUUid = value
        },
        has: () => {
            return this._mediaUUid.length > 0
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
                uuid: this._mediaUUid
            },
            relationship: this._relationship,
            type: this._type,
        }
    }
}