import Requirement from "./Requirement";
import DefaultRequirement from "./DefaultRequirement";

export default class FactRequirement extends DefaultRequirement implements Requirement {
    constructor(id: string, operator: string) {
        super(id, operator)
    }
}