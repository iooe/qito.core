import ResultContract from "../ResultContract";
import BaseRequirement from "../BaseRequirement";

export default class FactResult extends BaseRequirement implements ResultContract {
    constructor(id: string) {
        super(id)
    }
}