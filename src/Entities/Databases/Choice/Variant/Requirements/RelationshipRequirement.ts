import Requirement from "./Requirement";
import DefaultRequirement from "./DefaultRequirement";

export const constants = {
    OPERATORS: [
        '>=',
        '<='],
} as const;

export default class RelationshipRequirement extends DefaultRequirement implements Requirement {
    constructor(id: string, operator: string, value: number) {
        super(id, operator, value)
    }
}