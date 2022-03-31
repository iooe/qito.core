import Requirement from "./Requirement";
import DefaultRequirement from "./DefaultRequirement";

export default class ItemRequirement extends DefaultRequirement implements Requirement {
    constructor(id: string) {
        super(id)
    }
}