import Requirement from "./Requirements/Requirement";

export default class RequirementsBlock {

    private requirements: Array<Requirement> = []

    push(requirement: Requirement) {
        return this.requirements.push(requirement)
    }

    getRequirements() {
        return this.requirements
    }
}