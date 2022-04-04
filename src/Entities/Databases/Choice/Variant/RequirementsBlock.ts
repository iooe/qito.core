import Requirement from "./Requirements/Requirement";
import {v4 as uuidv4} from 'uuid';

export default class RequirementsBlock {

    private requirements: Array<Requirement> = []
    private readonly _uuid: string = uuidv4()

    push(requirement: Requirement) {
        return this.requirements.push(requirement)
    }

    public getId() {
        return this._uuid
    }

    getRequirements() {
        return this.requirements
    }
}