import RequirementContract from "./RequirementContract";
import {v4 as uuidv4} from 'uuid';

export default class RequirementsContainer {

    private _data: Array<RequirementContract> = []
    private readonly _uuid: string
    private _counter = 0;

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public getUuid() {
        return this._uuid
    }

    public get count() {
        return this._counter
    }

    public values: any = {
        add: (value: RequirementContract) => {
            this._data.push(value)
            this._counter++
        },
        get: () => {
            return this._data
        },
        count: () => {
            return this._data.length
        },
        delete: (uuid: string) => {
            const index = this._data.findIndex((value: RequirementContract) => value.getUuid() === uuid)

            if (index === -1) {
                return
            }

            this._data.splice(index, 1)
        },
        first: (uuid: string = '') => {

            if (uuid.length === 0) {
                return this._data[0]
            }

            return this._data.find((value: RequirementContract) => value.getUuid() === uuid)
        },
        has: (uuid: string = '') => {

            if (this._data.length === 0) {
                return false
            }

            return this._data.find((value: RequirementContract) => value.getUuid() === uuid) !== undefined
        }
    }

    public export() {
        return {
            uuid: this._uuid,
            data: this._data.map((value: RequirementContract) => value.export())
        }
    }

    public static create() {
        return new RequirementsContainer(uuidv4())
    }
}