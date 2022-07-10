import RequirementContract from "../RequirementContract";
import BaseRequirement from "../BaseRequirement";

export const TYPE = 'personality'

export const constants = {
    OPERATORS: [
        '>=',
        '<='],
} as const;

export default class PersonalityRequirement extends BaseRequirement implements RequirementContract {
    constructor(id: string, operator: string, value: number) {
        super(id, operator, value)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._id,
            operator: this._operator,
            value: this._value
        }
    }
}