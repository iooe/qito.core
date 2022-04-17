import ResultContract from "../ResultContract";
import BaseRequirement from "../BaseRequirement";

export const TYPE = 'relationship'
export const constants = {
    ACTIONS: [
        'increase',
        'decrease'],
} as const;

export default class RelationshipResult extends BaseRequirement implements ResultContract {
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