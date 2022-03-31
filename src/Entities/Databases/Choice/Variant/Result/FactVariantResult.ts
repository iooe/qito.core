import IVariantResult from "./IVariantResult";
import DefaultResult from "./DefaultResult";

export default class FactVariantResult extends DefaultResult implements IVariantResult {
    constructor(id: string) {
        super(id)
    }
}