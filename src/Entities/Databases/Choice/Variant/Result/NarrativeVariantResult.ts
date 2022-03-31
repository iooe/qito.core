import IVariantResult from "./IVariantResult";
import DefaultResult from "./DefaultResult";

export default class NarrativeVariantResult extends DefaultResult implements IVariantResult {
    constructor(id: string) {
        super(id)
    }
}