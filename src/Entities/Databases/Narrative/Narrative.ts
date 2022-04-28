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
        }
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
}