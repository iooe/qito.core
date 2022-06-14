import {v4 as uuidv4} from 'uuid';
import Title from "../../../Basic/Objects/Title";
import Connection from "../Meta/Connection";
import Page from "../../../Basic/Objects/Page";
import Callback from "./Callback/CallbackContract";

export const constants = {
    CALLBACKS: [
        'onCreated',
        'onClosed'
    ]
} as const;

export default class Part {
    private _title: Title
    private _connection: Connection | null = null
    private _pages: Array<Page> = []

    private readonly _uuid: string;
    protected _callbacks: Array<{ key: string, values: Array<Callback> }> = [];

    constructor(uuid: string) {
        this._uuid = uuid
        this._title = new Title();

        constants.CALLBACKS.forEach(value => this._callbacks.push({key: value, values: []}))
    }

    public static create() {
        return new Part(uuidv4())
    }

    public getUuid() {
        return this._uuid
    }

    public pages = {
        set: (pages: Array<Page>) => {
            this._pages = pages
        },
        replace: (uuid: string, value: Page) => {
            const index = this._pages.findIndex((value: Page) => value.getUuid() === uuid)

            if (index === -1) {
                new Error('Unfinded')
            }

            this._pages[index] = value
        },
        get: (): Array<Page> => {
            return this._pages
        },
        push: (page: Page) => {
            this._pages.push(page)
        },
        count: () => {
            return this._pages.length
        },
        first: (uuid: string = '') => {

            if (uuid.length === 0) {
                return this._pages[0]
            }

            return this._pages.find((value: Page) => value.getUuid() === uuid)
        },
        index: (uuid: string) => {
            return this._pages.findIndex((value: Page) => value.getUuid() === uuid)
        },
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
        delete: (key: string, index: number) => {
            const instance = this._callbacks.find(value => value.key === key)

            if (instance === undefined) {
                new Error('Unfinded')
                return;
            }

            instance.values.splice(index, 1)
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

    public connection = {
        has: (): boolean => {
            return this._connection !== null
        },
        get: (): Connection => {
            return this._connection
        },
        set: (instance: Connection) => {
            this._connection = instance
        },
        delete: () => {
            this._connection = null
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

    public export() {
        let callbacks: any = {}

        constants.CALLBACKS.map(value => callbacks[value] = [])

        this._callbacks.forEach(value => {
            value.values.forEach(config => {
                if (!callbacks.hasOwnProperty(value.key)) {
                    callbacks[value.key] = []
                }

                callbacks[value.key].push(config.config.get())
            })
        })

        return {
            uuid: this._uuid,
            title: this._title.export(),
            connection: this._connection === null ? null : this._connection.export(),
            callbacks: callbacks,
            pages: this._pages.map((value: Page) => value.export())
        }
    }
}