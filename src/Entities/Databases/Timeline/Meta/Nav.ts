export default class Nav {
    private readonly _prev: string | null;
    private readonly _next: string | null;

    constructor(prev: string | null = null, next: string | null = null) {
        this._prev = prev
        this._next = next
    }

    public hasPrev(): boolean {
        return this._prev !== null
    }

    public hasNext(): boolean {
        return this._next !== null
    }

    public getPrev(): string | null {
        return this._prev
    }

    public getNext(): string | null {
        return this._next
    }

    public export(): object {
        return {
            prev: this._prev,
            next: this._next
        }
    }
}