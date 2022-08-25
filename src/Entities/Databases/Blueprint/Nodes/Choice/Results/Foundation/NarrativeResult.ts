import {ResultContract} from "../ResultContract";
import BaseResult from "../BaseResult";

const TYPE = 'narrative'

export default class NarrativeResult extends BaseResult implements ResultContract {
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