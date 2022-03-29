export default class Title {

    public readonly title: string | null;

    constructor(title: string | null = null) {
        this.title = title
    }

    public getValue(): string | null {
        return this.title
    }

    public isEmpty(): Boolean {
        return this.title?.length === 0
    }
}