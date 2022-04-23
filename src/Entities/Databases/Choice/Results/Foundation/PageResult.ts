import ResultContract from "../ResultContract";
import BaseResult from "../BaseResult";

const TYPE = 'page'

export default class PageResult extends BaseResult implements ResultContract {
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