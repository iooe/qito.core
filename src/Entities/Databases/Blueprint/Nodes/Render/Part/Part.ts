import {v4 as uuidv4} from 'uuid';
import InteractablePage from "../../../../../Structures/InteractableContent/InteractablePage";

export default class Part {
    private _pages: Array<InteractablePage> = []

    private readonly _uuid: string;
    private _title: string = ''

    constructor(uuid: string) {
        this._uuid = uuid
        this._title = uuid
    }

    public static create() {
        const instance = new Part(uuidv4())

        instance.pages.set([
            InteractablePage.create(),
            InteractablePage.create()
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
        set: (pages: Array<InteractablePage>) => {
            this._pages = pages
        },
        replace: (uuid: string, value: InteractablePage) => {
            const index = this._pages.findIndex((value: InteractablePage) => value.uuid.get() === uuid)

            if (index === -1) {
                new Error('Unfinded')
            }

            this._pages[index] = value
        },
        get: (): Array<InteractablePage> => {
            return this._pages
        },
        push: (page: InteractablePage) => {
            this._pages.push(page)
        },
        count: () => {
            return this._pages.length
        },
        first: (uuid: string = '') => {

            if (uuid.length === 0) {
                return this._pages[0]
            }

            return this._pages.find((value: InteractablePage) => value.uuid.get() === uuid)
        },
        index: (uuid: string) => {
            return this._pages.findIndex((value: InteractablePage) => value.uuid.get() === uuid)
        },
    }

    public export() {
        return {
            uuid: this._uuid,
            title: this._title,
            pages: this._pages.map((value: InteractablePage) => value.export())
        }
    }
}