import ResultContract from "../ResultContract";
import BaseResult from "../BaseResult";

const TYPE = 'fact'

export default class FactResult extends BaseResult implements ResultContract {
    constructor(uuid: string) {
        super(uuid)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._uuid
        }
    }
}