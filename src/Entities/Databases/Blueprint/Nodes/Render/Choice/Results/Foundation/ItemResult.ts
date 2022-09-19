import {ResultContract} from "../ResultContract";
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
    constructor(uuid: string, action: string) {
        super(uuid, action)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._uuid,
            action: this._action
        }
    }
}