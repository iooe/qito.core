import RequirementContract from "./RequirementContract";
import {v4 as uuidv4} from 'uuid';

export default class RequirementsContainer {

    private _requirements: Array<RequirementContract> = []
    private readonly _uuid: string = uuidv4()

    public push(requirement: RequirementContract) {
        return this._requirements.push(requirement)
    }

    public getUuid() {
        return this._uuid
    }

    public getId() {
        return this._uuid
    }

    public getRequirements() {
        return this._requirements
    }

    public export() {
        return this._requirements.map((value: RequirementContract) => value.export())
    }
}