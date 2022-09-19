import {v4 as uuidv4} from 'uuid';
import Page from "../../../../../Basic/Objects/Page";

export default class Part {
    private _pages: Array<Page> = []

    private readonly _uuid: string;
    private _title: string = ''

    constructor(uuid: string) {
        this._uuid = uuid
        this._title = uuid
    }

    public static create() {
        const instance = new Part(uuidv4())

        instance.pages.set([
            Page.create(),
            Page.create()
        ])

        return instance
    }

    public uuid = {
        get: (): string => this._uuid
    }

    public title = {
        get: (): string => {
            return this._title
        },
        set: (value: string) => {
            this._title = value
        }
    }

    public pages = {
        set: (pages: Array<Page>) => {
            this._pages = pages
        },
        replace: (uuid: string, value: Page) => {
            const index = this._pages.findIndex((value: Page) => value.uuid.get() === uuid)

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

            return this._pages.find((value: Page) => value.uuid.get() === uuid)
        },
        index: (uuid: string) => {
            return this._pages.findIndex((value: Page) => value.uuid.get() === uuid)
        },
    }

    public export() {
        return {
            uuid: this._uuid,
            title: this._title,
            pages: this._pages.map((value: Page) => value.export())
        }
    }
}