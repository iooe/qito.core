import ResultContract from "../ResultContract";
import BaseResult from "../BaseResult";

export const TYPE = 'item',
    ACTION_OPEN = 'open',
    ACTION_HIDE = 'hide'

export const constants = {
    ACTIONS: [
        ACTION_OPEN,
        ACTION_HIDE
    ],
    ACTION_OPEN: ACTION_OPEN,
    ACTION_HIDE: ACTION_HIDE
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