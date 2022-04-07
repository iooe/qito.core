import BlockContract from "../BlockContract";
import BaseBlock from "../BaseBlock";

const TYPE = 'button';

export default class Button extends BaseBlock implements BlockContract {
    private readonly _uuid: string
    private readonly text: string

    constructor(uuid: string, text: string) {
        super()
        this._uuid = uuid
        this.text = text
    }

    public getId() {
        return this._uuid
    }

    public getType() {
        return TYPE
    }

    public export() {
        return {
            type: TYPE,
            data: {
                id: this._uuid,
                text: this.text
            }
        }
    }
}