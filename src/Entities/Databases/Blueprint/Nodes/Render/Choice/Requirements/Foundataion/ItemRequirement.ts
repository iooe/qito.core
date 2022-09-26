import {RequirementContract} from "../RequirementContract";
import BaseRequirement from "../BaseRequirement";

export const TYPE = 'item'

export default class ItemRequirement extends BaseRequirement implements RequirementContract {
    constructor(uuid: string) {
        super(uuid)
    }

    public export() {
        return {
            type: TYPE,
            uuid: this._uuid
        }
    }
}