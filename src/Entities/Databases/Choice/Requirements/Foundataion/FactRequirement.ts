import RequirementContract from "../RequirementContract";
import BaseRequirement from "../BaseRequirement";

export const TYPE = 'fact'

export default class FactRequirement extends BaseRequirement implements RequirementContract {
    constructor(id: string, operator: string) {
        super(id, operator)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._id
        }
    }
}