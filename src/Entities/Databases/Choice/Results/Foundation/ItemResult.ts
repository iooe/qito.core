import ResultContract from "../ResultContract";
import BaseRequirement from "../BaseRequirement";

export const constants = {
    ACTIONS: [
        'open',
        'hide'],
} as const;

export default class ItemResult extends BaseRequirement implements ResultContract {
    constructor(id: string, action: string) {
        super(id, action)
    }
}