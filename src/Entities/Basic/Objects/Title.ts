export default class Title {

    private readonly _title: string;
    private readonly _slug: string;

    constructor(title: string = '', slug: string = '') {
        this._title = title
        this._slug = slug
    }

    public getSlug(): string {
        return this._slug
    }

    public getValue(): string {
        return this._title
    }

    public isEmpty(): Boolean {
        return this._title?.length === 0
    }

    public export() {
        return {
            value: this._title,
            slug: this._slug
        }
    }
}