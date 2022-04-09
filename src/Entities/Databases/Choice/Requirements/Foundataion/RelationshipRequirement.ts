import RequirementContract from "../RequirementContract";
import BaseRequirement from "../BaseRequirement";

export const constants = {
    OPERATORS: [
        '>=',
        '<='],
} as const;

export default class RelationshipRequirement extends BaseRequirement implements RequirementContract {
    constructor(id: string, operator: string, value: number) {
        super(id, operator, value)
    }
}