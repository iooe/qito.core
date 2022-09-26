import {v4 as uuidv4} from 'uuid';

const IS_OPENED = true,
    IS_HIDE = false;

export const constants = {
    STATES: [
        IS_OPENED,
        IS_HIDE
    ]
} as const;

export default class Item {

    private readonly _uuid: string
    private _name: string = ''
    private _state: boolean = false
    private _mediaUUid: string = ''

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public static create() {
        return new Item(uuidv4())
    }

    public uuid = {
        get: (): string => this._uuid
    }

    public name = {
        set: (value: string) => {
            this._name = value
        },
        get: () => {
            return this._name
        }
    }

    public state = {
        open: () => {
            this._state = true
        },
        hide: () => {
            this._state = false
        },
        set: (value: boolean) => {
            this._state = value
        },
        get: (): boolean => {
            return this._state;
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

    public export(): Object {
        return {
            uuid: this._uuid,
            name: this._name,
            media: {
                uuid: this._mediaUUid
            },
            state: this._state,
        }
    }
}