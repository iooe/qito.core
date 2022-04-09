export default class Title {

    private readonly _title: string | null;
    private readonly _slug: string;

    constructor(title: string | null = null, slug: string = '') {
        this._title = title
        this._slug = slug
    }

    public getSlug(): string | null {
        return this._slug
    }

    public getValue(): string | null {
        return this._title
    }

    public isEmpty(): Boolean {
        return this._title?.length === 0
    }
}