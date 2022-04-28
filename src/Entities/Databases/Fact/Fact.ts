import {v4 as uuidv4} from 'uuid';
import Preview from "./Preview/Preview";
import Title from "../../Basic/Objects/Title";

export default class Fact {

    private readonly _uuid: string
    private _state: boolean = false
    private _preview: Preview = new Preview('')
    private _title = new Title();

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public static create() {
        return new Fact(uuidv4())
    }

    public title = {
        get: () => {
            return this._title
        },
        set: (value: Title) => {
            this._title = value
        }
    }

    public getUuid(): string {
        return this._uuid;
    }

    public preview = {
        get: (): Preview => {
            return this._preview;
        },
        set: (value: Preview) => {
            this._preview = value
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

    public export(): Object {
        return {
            uuid: this._uuid,
            title: this._title.export(),
            preview: {
                message: this.preview.get().getMessage()
            },
            state: this._state,
        }
    }
}