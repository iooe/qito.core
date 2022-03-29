import IVariantResult from "./IVariantResult";
import DefaultResult from "./DefaultResult";

export default class PageVariantResult extends DefaultResult implements IVariantResult {
    constructor(id: string) {
        super(id);
    }
}