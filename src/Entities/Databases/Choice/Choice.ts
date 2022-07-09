import Variant from "./Variant/Variant";
import {v4 as uuidv4} from 'uuid';

export default class Choice {

    protected _uuid: string
    protected _data: Array<Variant> = []
    protected _title: string

    constructor(uuid: string) {
        this._uuid = uuid
        this._title = uuid
    }

    public static create() {
        return new Choice(uuidv4())
    }

    public getUuid() {
        return this._uuid
    }

    public title = {
        get: () => {
            return this._title
        },
        set: (value: string) => {
            this._title = value
        }
    }

    public export() {
        return {
            uuid: this._uuid,
            title: this._title,
            data: this._data.map((value: Variant) => value.export())
        }
    }

    public variants = {
        import: (value: any) => {
            const variantInstance = new Variant(value.uuid)
            variantInstance.name.set(value.name)
            variantInstance.import(value)

            this._data.push(variantInstance)
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

        unshift: (value: Variant) => {
            this._data.unshift(value)
        },

        first: (uuid: string = '') => {

            if (uuid.length === 0) {
                return this._data[0]
            }

            return this._data.find((value: Variant) => value.getUuid() === uuid)
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
                return false
                /*return this.variants.get().find((value: Variant) => value.results.get()
                    .find((result: ResultContract) => result.constructor.name === PageResult.name && result.getUuid() === uuid)) !== undefined*/
            }
        }
    }
}