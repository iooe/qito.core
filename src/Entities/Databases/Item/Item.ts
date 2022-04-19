import {v4 as uuidv4} from 'uuid';
import Media from "../../Basic/Objects/Media";

export default class Item {

    private readonly _uuid: string
    private _name: string = ''
    private _state: boolean = false
    private _media: Media = new Media()

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public static create() {
        return new Item(uuidv4())
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
            state: this._state,
        }
    }
}