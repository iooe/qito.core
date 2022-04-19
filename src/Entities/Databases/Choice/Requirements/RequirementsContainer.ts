import RequirementContract from "./RequirementContract";
import {v4 as uuidv4} from 'uuid';

export default class RequirementsContainer {

    private _data: Array<RequirementContract> = []
    private readonly _uuid: string

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public getUuid() {
        return this._uuid
    }

    public values = {
        add: (requirement: RequirementContract) => {
            return this._data.push(requirement)
        },
        get: () => {
            return this._data
        },
        first: (uuid: string = '') => {

            if (uuid.length === 0) {
                return this._data[0]
            }

            return this._data.find((value: RequirementContract) => value.getId() === uuid)
        },
        has: (uuid: string = '') => {

            if (this._data.length === 0) {
                return false
            }

            return this._data.find((value: RequirementContract) => value.getId() === uuid) !== undefined
        }
    }

    public export() {
        return this._data.map((value: RequirementContract) => value.export())
    }

    public static create() {
        return new RequirementsContainer(uuidv4())
    }
}