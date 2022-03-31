import Variant from "./Variant/Variant";

export default class Choice {

    protected _id: string
    protected _data: Array<Variant> = []

    constructor(id: string) {
        this._id = id
    }

    public getId() {
        return this._id
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