export default interface RequirementContract {
    uuid: {
        get(): string
    }

    getAction(): string

    getValue(): number

    export(): any
}