export default interface RequirementContract {
    getId(): string

    getAction(): string

    getValue(): number

    export(): any
}