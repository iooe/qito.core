import ResultContract from "../ResultContract";
import BaseResult from "../BaseResult";

const TYPE = 'personality',
    ACTION_INCREASE = 'increase',
    ACTION_DECREASE = 'decrease'

export const constants = {
    ACTIONS: [
        ACTION_INCREASE,
        ACTION_DECREASE
    ],
    ACTION_INCREASE: ACTION_INCREASE,
    ACTION_DECREASE: ACTION_DECREASE
} as const;

export default class PersonalityResult extends BaseResult implements ResultContract {

    constructor(id: string, action: string, value: number) {
        super(id, action, value)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._id,
            action: this._action,
            value: this._value
        }
    }
}
