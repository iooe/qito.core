import ResultContract from "../ResultContract";
import BaseResult from "../BaseResult";

export const TYPE = 'item'
export const constants = {
    ACTIONS: [
        'open',
        'hide'],
} as const;

export default class ItemResult extends BaseResult implements ResultContract {
    constructor(id: string, action: string) {
        super(id, action)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._id,
            action: this._action
        }
    }
}