import Variant from "./Variant/Variant";

export default class Choice {

    protected _uuid: string
    protected _data: Array<Variant> = []

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public getUuid() {
        return this._uuid
    }

    public setData(data: Array<any>) {
        data.forEach(variant => {
            this._data.push(new Variant(variant))
        })
    }

    public hasData() {
        return !this._data === null
    }

    public getData() {
        return this._data
    }
}