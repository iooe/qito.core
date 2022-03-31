import IVariantResult from "./IVariantResult";
import DefaultResult from "./DefaultResult";

export default class RelationshipVariantResult extends DefaultResult implements IVariantResult {
    constructor(id: string, action: string, value: number) {
        super(id, action, value)
    }
}