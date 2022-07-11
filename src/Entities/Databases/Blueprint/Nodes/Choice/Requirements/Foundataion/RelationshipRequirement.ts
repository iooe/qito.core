import RequirementContract from "../RequirementContract";
import BaseRequirement from "../BaseRequirement";

export const TYPE = 'relationship'

export const constants = {
    OPERATORS: [
        '>=',
        '<='],
} as const;

export default class RelationshipRequirement extends BaseRequirement implements RequirementContract {
    constructor(uuid: string, operator: string, value: number) {
        super(uuid, operator, value)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._uuid,
            operator: this._operator,
            value: this._value
        }
    }
}