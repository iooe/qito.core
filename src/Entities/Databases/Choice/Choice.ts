import Variant from "./Variant/Variant";
import ResultContract from "./Results/ResultContract";
import PageResult from "./Results/Foundation/PageResult";
import Title from "../../Basic/Objects/Title";

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
            title: this._title.export(),
            data: this._data.map((value: Variant) => value.export())
        }
    }

    public variants = {
        import: (value: object) => {
            const variant = Variant.create()
            variant.import(value)

            this._data.push(variant)
        },

        moveUp: (index: number) => {
            if (this._data.length < 2) {
                return
            }

            if (index === 0) {
                return;
            }

            const temp = this._data[index - 1]
            this._data[index - 1] = this._data[index]
            this._data[index] = temp
        },

        moveDown: (index: number) => {
            if (this._data.length < 2) {
                return
            }

            if (index === this._data.length - 1) {
                return;
            }

            const temp = this._data[index + 1]
            this._data[index + 1] = this._data[index]
            this._data[index] = temp
        },

        add: (value: Variant) => {
            this._data.push(value)
        },

        delete: (index: number) => {
            this._data.splice(index, 1)
        },

        get: () => {
            return this._data
        },

        has: () => {
            return this._data.length > 0
        },

        count: () => {
            return this._data.length
        }
    }

    public backlinks = {
        has: {
            page: (uuid: string): boolean => {
                return this.variants.get().find((value: Variant) => value.results.get()
                    .find((result: ResultContract) => result.constructor.name === PageResult.name && result.getUuid() === uuid)) !== undefined
            }
        }
    }
}