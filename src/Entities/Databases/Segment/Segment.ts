import {v4 as uuidv4} from 'uuid';

import Part from "./Part/Part";
import Title from "../../Basic/Objects/Title";

export default class Segment {
    private _parts: Array<Part> = [];
    private readonly _uuid: string = ''
    private _title = new Title();

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public static create() {
        return new Segment(uuidv4())
    }

    public getUuid() {
        return this._uuid
    }

    public title = {
        get: () => {
            return this._title
        },
        set: (value: Title) => {
            this._title = value
        }
    }

    public parts = {
        first: (uuid: string = '') => {

            if (uuid.length === 0) {
                return this._parts[0]
            }

            return this._parts.find((part: Part) => part.getUuid() === uuid)
        },
        has: (uuid: string) => {
            return this._parts.find((part: Part) => part.getUuid() === uuid) !== undefined;
        },
        delete: (uuid: string) => {
            const index = this._parts.findIndex((value: Part) => value.getUuid() === uuid)

            if (index === -1) {
                return
            }

            this._parts.splice(index, 1)
        },
        get: () => {
            return this._parts
        },
        push: (part: Part) => {
            this._parts.push(part)
        },
        update: (part: Part) => {
            //@ts-ignore
            const index = this._parts.findIndex(value => value.getUuid() === part.getUuid())

            if (index === -1) {
                return
            }

            this._parts[index] = part
        },
        isCursored: (uuid: string) => {
            return this._parts.find((part: Part) => {
                if (!part.connection.has()) {
                    return false
                }

                return part.connection.get().uuid() === uuid
            })
        },
        isEmpty: () => {
            return this._parts.length === 0
        }
    }

    public export() {
        return {
            uuid: this._uuid,
            title: this._title.export(),
            parts: this._parts.map((value: Part) => value.export())
        }
    }
}