export default interface ResultContract {
    getId(): string

    getAction(): string

    getValue(): number

    export(): any
}