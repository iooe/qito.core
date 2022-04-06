export default interface ObjectContent {
    type(): string;

    getContentAsObject(): object

    getId(): string

    export(): object
    /*
        getContentAsObject(): Object
    */
}