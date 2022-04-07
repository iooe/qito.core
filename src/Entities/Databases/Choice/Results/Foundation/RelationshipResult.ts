import ResultContract from "../ResultContract";
import BaseRequirement from "../BaseRequirement";

export const constants = {
    ACTIONS: [
        'increase',
        'decrease'],
} as const;

export default class RelationshipResult extends BaseRequirement implements ResultContract {
    constructor(id: string, action: string, value: number) {
        super(id, action, value)
    }
}