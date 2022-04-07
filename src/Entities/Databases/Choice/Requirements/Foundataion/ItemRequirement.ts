import RequirementContract from "../RequirementContract";
import BaseRequirement from "../BaseRequirement";

export default class ItemRequirement extends BaseRequirement implements RequirementContract {
    constructor(id: string) {
        super(id)
    }
}