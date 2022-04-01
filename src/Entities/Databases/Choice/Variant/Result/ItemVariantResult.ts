import IVariantResult from "./IVariantResult";
import DefaultResult from "./DefaultResult";

export const constants = {
    ACTIONS: [
        'open',
        'hide'],
} as const;

export default class ItemVariantResult extends DefaultResult implements IVariantResult {
    constructor(id: string, action: string) {
        super(id, action)
    }
}