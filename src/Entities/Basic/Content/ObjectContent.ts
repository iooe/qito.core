export default interface ObjectContent {
    type(): string;

    getContentAsObject(): object

    /*
        getContentAsObject(): Object
    */
}