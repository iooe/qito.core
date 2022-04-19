import ResultContract from "../ResultContract";
import BaseResult from "../BaseResult";

export const TYPE = 'personality'

export const constants = {
    ACTIONS: [
        'increase',
        'decrease'],
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
