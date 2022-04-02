import Page from "./Page/Page";

export default class Narrative {
    private title: string = ''
    private pages: Array<Page> = []
    private _id: string = '';
    private _styles: Array<string> = [];

    public getId() {
        return this._id
    }

    public setId(id: string) {
        this._id = id
    }

    public getPages() {
        return this.pages
    }

    public setStyles(value: Array<string>) {
        this._styles = value
    }

    public getStyles() {
        return this._styles
    }

    public setTitle(value: string) {
        this.title = value
    }

    public pushPage(page: Page) {
        this.pages.push(page)
    }

    public getTitle(): string {
        return this.title
    }
}