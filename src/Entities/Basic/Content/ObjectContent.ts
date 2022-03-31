export default interface ObjectContent {
    type(): string;

    getContentAsObject(): object

    getId(): string

    /*
        getContentAsObject(): Object
    */
}