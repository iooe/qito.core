import Part from "./Part/Part";
import Title from "./Meta/Title";

export default class Segment {
    private _parts: Array<Part> = [];
    private readonly _uuid: string = ''
    private _title = new Title();

    constructor(uuid: string) {
        this._uuid = uuid
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
        first: (uuid: string) => {
            const value = this._parts.find((part: Part) => part.getUuid() === uuid);

            return value
        },
        has: (uuid: string) => {
            return this._parts.find((part: Part) => part.getUuid() === uuid) !== undefined;
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