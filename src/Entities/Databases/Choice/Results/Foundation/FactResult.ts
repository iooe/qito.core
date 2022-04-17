import ResultContract from "../ResultContract";
import BaseRequirement from "../BaseRequirement";

export const TYPE = 'fact'

export default class FactResult extends BaseRequirement implements ResultContract {
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