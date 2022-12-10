import {v4 as uuidv4} from "uuid";
import ActorDto from "./ActorDto";
import ActorsContainer from "./ActorsContainer";

export default class ActorDtosContainer implements ActorsContainer {
    private readonly _uuid: string
    private _data: Array<ActorDto> = []

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public uuid = {
        get: () => this._uuid
    }

    public static create() {
        return new ActorDtosContainer(uuidv4())
    }

    public values = {
        add: (value: ActorDto) => {
            this._data.push(value)
        },
        replace: (uuid: string, value: ActorDto) => {
            const index = this._data.findIndex((value: ActorDto) => value.uuid.get() === uuid)

            if (index === -1) {
                new Error('undefined')
            }

            this._data[index] = value
        },
        first: (uuid: string = '') => {
            if (uuid.length === 0) {
                return this._data[0]
            }

            return this._data.find((node: ActorDto) => node.uuid.get() === uuid)
        },
        has: (uuid: string) => {
            return this._data.find((node: ActorDto) => node.uuid.get() === uuid) !== undefined;
        },
        count: () => {
            return this._data.length;
        },
        delete: (uuid: string) => {
            const index = this._data.findIndex((node: ActorDto) => node.uuid.get() === uuid)

            if (index === -1) {
                return
            }

            this._data.splice(index, 1)
        },
        get: () => {
            return this._data
        }
    }

    public export() {
        return {
            uuid: this._uuid,
            data: this._data.map(value => value.export())
        }
    }
}