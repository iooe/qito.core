import {BlockContract} from "../BlockContract";
import BaseBlock from "../BaseBlock";

const TYPE = 'character';

export default class Character extends BaseBlock implements BlockContract {
    private readonly _uuid: string
    private readonly _text: string

    constructor(uuid: string, text: string) {
        super()
        this._uuid = uuid
        this._text = text
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
                uuid: this._uuid,
                text: this._text
            }
        }
    }
}