import BaseBlock from "../BaseBlock";
import BlockContract from "../BlockContract";

const TYPE = 'delimiter';

export default class Delimiter extends BaseBlock implements BlockContract {
    private readonly _id: string;

    constructor(content: string) {
        super()
        this._id = content
    }

    public getId() {
        return this._id
    }

    public getType() {
        return TYPE
    }

    public export() {
        return {
            type: TYPE,
            data: {
                text: this._id
            }
        }
    }
}