import Page from "../../Basic/Objects/Page";

export default class Narrative {
    private _title: string = ''
    private _pages: Array<Page> = []
    private readonly _uuid: string = '';
    private _styles: Array<string> = [];

    constructor(uuid: string) {
        this._uuid = uuid
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
    }

    public styles = {
        set: (value: Array<string>) => {
            this._styles = value
        },
        get: () => {
            return this._styles
        }
    }

    public title = {
        set: (value: string) => {
            this._title = value
        },
        get: (): string => {
            return this._title
        }
    }

    public export(): Object {
        return {
            uuid: this._uuid,
            title: this._title,
            style: this._styles.map((value: string) => value),
            pages: this._pages.map((page: Page) => page.export())
        }
    }
}