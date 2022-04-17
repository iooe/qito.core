import Variant from "./Variant/Variant";
import ResultContract from "hanzo.core/src/Entities/Databases/Choice/Results/ResultContract";
import PageResult from "hanzo.core/src/Entities/Databases/Choice/Results/Foundation/PageResult";

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

    public variants = {
        push: (value: object) => {
            this._data.push(new Variant(value))
        },

        get: () => {
            return this._data
        },

        has: () => {
            return this._data.length > 0
        }
    }

    public backlinks = {
        has: {
            page: (uuid: string): boolean => {
                return this.getData().find((value: Variant) => value.getResult()
                    .find((result: ResultContract) => result.constructor.name === PageResult.name && result.getId() === uuid)) !== undefined
            }
        }
    }
}