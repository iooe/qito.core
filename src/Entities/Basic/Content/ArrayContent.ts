export default interface ArrayContent {
    type(): string;

    getContentAsArray(): Array<any>
}