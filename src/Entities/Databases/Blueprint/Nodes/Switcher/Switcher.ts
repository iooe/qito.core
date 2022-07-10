import {v4 as uuidv4} from 'uuid';
import Case from "./Case/Case";

export default class Switcher {

    protected _uuid: string
    protected _data: Array<Case> = []

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public static create() {
        return new Switcher(uuidv4())
    }

    public uuid = {
        get: () => {
            return this._uuid
        }
    }

    public export() {
        return {
            uuid: this._uuid,
            data: this._data.map((value: Case) => value.export())
        }
    }

    public cases = {
        first: (uuid: string = '') => {
            if (uuid.length === 0) {
                return this._data[0]
            }

            return this._data.find((node: Case) => node.uuid.get() === uuid)
        },
        has: (uuid: string) => {
            return this._data.find((node: Case) => node.uuid.get() === uuid) !== undefined;
        },
        delete: (uuid: string) => {
            const index = this._data.findIndex((node: Case) => node.uuid.get() === uuid)

            if (index === -1) {
                return
            }

            this._data.splice(index, 1)
        },
        get: () => {
            return this._data
        },
        add: (node: Case) => {
            this._data.push(node)
        }
    }
}