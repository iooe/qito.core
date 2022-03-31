import Requirement from "./Requirement";
import DefaultRequirement from "./DefaultRequirement";

export default class RelationshipRequirement extends DefaultRequirement implements Requirement {
    constructor(id: string, operator: string, value: number) {
        super(id, operator, value)
    }
}