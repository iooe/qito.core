export default class Nav {
    private prev: string | null;
    private next: string | null;

    constructor(prev: string | null = null, next: string | null = null) {
        this.prev = prev
        this.next = next
    }

    public hasPrev(): boolean {
        return this.prev !== null
    }

    public hasNext(): boolean {
        return this.next !== null
    }

    public getPrev(): string | null {
        return this.prev
    }

    public getNext(): string | null {
        return this.next
    }
}