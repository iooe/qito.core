import ResultContract from "../ResultContract";
import BaseRequirement from "../BaseRequirement";

export default class PageResult extends BaseRequirement implements ResultContract {
    constructor(id: string) {
        super(id);
    }
}