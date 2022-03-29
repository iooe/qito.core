export default class Nav {
    public prev: string | null;
    public next: string | null;

    constructor(prev: string | null, next: string | null) {
        this.prev = prev
        this.next = next
    }

    public hasPrev(): boolean {
        return this.prev !== null
    }

    public hasNext(): boolean {
        return this.next !== null
    }

    public getPrev(): string {
        if (this.prev === null) {
            throw new Error('')
        }

        return this.prev
    }

    public getNext(): string {
        if (this.next === null) {
            throw new Error('')
        }

        return this.next
    }
}