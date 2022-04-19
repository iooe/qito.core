import Variant from "./Variant/Variant";
import ResultContract from "./Results/ResultContract";
import PageResult from "./Results/Foundation/PageResult";
import Title from "src/Entities/Basic/Objects/Title";

export default class Choice {

    protected _uuid: string
    protected _data: Array<Variant> = []
    protected _title: Title = new Title()

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

    public export() {
        return {
            uuid: this._uuid,
            data: this._data.map((value: Variant) => value.export())
        }
    }

    public variants = {
        add: (value: object) => {
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
                return this.variants.get().find((value: Variant) => value.getResult()
                    .find((result: ResultContract) => result.constructor.name === PageResult.name && result.getId() === uuid)) !== undefined
            }
        }
    }
}