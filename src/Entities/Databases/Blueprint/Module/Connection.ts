export default class Connection {
    private readonly _uuid: string;
    private _data: any = {}

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public data = {
        set: (value: Object) => {
            this._data = value
        },
        get: () => {
            return this._data
        },
        first: (key: string): any => {
            return this._data[key]
        },
        has: (key: string) => {
            return this._data.hasOwnProperty(key)
        }
    }

    public uuid(): string {
        return this._uuid
    }

    public export(): object {
        return {
            uuid: this._uuid
        }
    }
}