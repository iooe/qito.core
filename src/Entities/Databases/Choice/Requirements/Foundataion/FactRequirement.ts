import RequirementContract from "../RequirementContract";
import BaseRequirement from "../BaseRequirement";

export const constants = {
    OPERATORS: [
        '=',
        '!='],
} as const;

export default class FactRequirement extends BaseRequirement implements RequirementContract {
    constructor(id: string, operator: string) {
        super(id, operator)
    }
}