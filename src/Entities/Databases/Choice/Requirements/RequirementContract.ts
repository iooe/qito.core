export default interface RequirementContract {
    getUuid(): string

    getAction(): string

    getValue(): number

    export(): any
}