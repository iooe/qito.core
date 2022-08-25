import {BlockContract} from "../BlockContract";
import BaseBlock from "../BaseBlock";

const TYPE = 'choice';

export default class Choice extends BaseBlock implements BlockContract {
    private readonly _uuid: string

    constructor(uuid: string) {
        super()
        this._uuid = uuid
    }

    public getType() {
        return TYPE
    }

    public getId() {
        return this._uuid
    }

    public export() {
        return {
            type: TYPE,
            data: {
                uuid: this._uuid
            }
        }
    }
}