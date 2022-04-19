import ResultContract from "../ResultContract";
import BaseResult from "../BaseResult";

export const TYPE = 'narrative'

export default class NarrativeResult extends BaseResult implements ResultContract {
    constructor(id: string) {
        super(id)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._id
        }
    }
}