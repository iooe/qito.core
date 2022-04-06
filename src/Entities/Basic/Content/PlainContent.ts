export default interface PlainContent {
    type(): string;

    getContentAsString(): string

    export(): object
}