export default interface ContentContract {
    constructor(uuid: string, type: string, attributes: object)

    export(): object
}