export interface ResultContract {
    uuid: {
        get(): string
    }

    getAction(): string

    getValue(): number

    export(): any
}