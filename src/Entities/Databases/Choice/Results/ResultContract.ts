export default interface ResultContract {
    getUuid(): string

    getAction(): string

    getValue(): number

    export(): any
}