import RequirementContract from "./RequirementContract";
import {v4 as uuidv4} from 'uuid';

export default class RequirementsContainer {

    private requirements: Array<RequirementContract> = []
    private readonly _uuid: string = uuidv4()

    push(requirement: RequirementContract) {
        return this.requirements.push(requirement)
    }

    public getId() {
        return this._uuid
    }

    getRequirements() {
        return this.requirements
    }
}