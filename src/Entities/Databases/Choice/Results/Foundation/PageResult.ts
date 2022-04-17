import ResultContract from "../ResultContract";
import BaseRequirement from "../BaseRequirement";

export const TYPE = 'page'
export default class PageResult extends BaseRequirement implements ResultContract {
    constructor(id: string) {
        super(id);
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._id
        }
    }
}