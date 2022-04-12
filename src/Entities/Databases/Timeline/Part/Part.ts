import Title from "../Meta/Title";
import Nav from "../Meta/Nav";
import Page from "../../../Basic/Objects/Page";
import Callback from "./Callback/CallbackContract";

export const constants = {
    TYPES: [
        'filler',
        'important'
    ],
    CALLBACKS: [
        'onCreated'
    ]
} as const;

export default class Part {
    private _title: Title
    private _nav: Nav
    private _type: string | null = null
    private _pages: Array<Page> = []
    private readonly _uuid: string;
    protected _callbacks: Array<{ key: string, values: Array<Callback> }> = [];

    constructor(uuid: string) {
        this._uuid = uuid
        this._nav = new Nav(null, null)
        this._title = new Title();

        constants.CALLBACKS.forEach(value => this._callbacks.push({key: value, values: []}))
    }

    public getUuid() {
        return this._uuid
    }

    public pages = {
        get: () => {
            return this._pages
        },
        push: (page: Page) => {
            this._pages.push(page)
        }
    }

    public callbacks = {
        get: () => {
            return this._callbacks
        },
        first: (key: string) => {
            const instance = this._callbacks.find(value => value.key === key)

            if (instance === undefined) {
                new Error('Unfinded')
                return;
            }

            return instance.values
        },
        push: (key: string, callback: Callback) => {
            const instance = this._callbacks.find(value => value.key === key)

            if (instance === undefined) {
                new Error('Wrong callback key')
                return;
            }

            instance.values.push(callback)
        }
    }

    public type = {
        get: () => {
            return this._type
        },
        set: (type: string) => {
            this._type = type
        }
    }

    public nav = {
        get: (): Nav => {
            return this._nav
        },
        set: (instance: Nav) => {
            this._nav = instance
        }
    }

    public title = {
        get: (): Title => {
            return this._title
        },
        set: (instance: Title) => {
            this._title = instance
        }
    }
}