export default class Collection {
    private _values: Array<any> = []
    private readonly _key: string

    constructor(key = 'uuid') {
        this._key = key
    }

    public set(values: any) {
        this._values = values
    }

    public add(value, index: number | undefined = undefined) {
        if (index === undefined) {
            return this._values.push(value)
        }

        this._values[index] = value
        return value
    }

    public replace(id: string, value: any) {
        const index = this.firstIndex(id)

        if (index === -1) {
            new Error('undefined')
        }

        this._values[index] = value
    }

    public firstIndex(id: string = ''): any {
        if (this._values.length === 0) {
            return undefined
        }

        if (id.length === 0) {
            return this._values[0]
        }

        return this._values.findIndex((model) => {
            const hasProperty = model.hasOwnProperty(this._key)

            if (hasProperty && model[this._key].hasOwnProperty('get')) {
                return model[this._key].get() === id
            }

            return hasProperty ? id === model[this._key] : id === model
        });
    }

    public first(id: string = ''): any {
        if (this._values.length === 0) {
            return undefined
        }

        if (id.length === 0) {
            return this._values[0]
        }

        return this._values.find((model) => {
            const hasProperty = model.hasOwnProperty(this._key)

            if (hasProperty && model[this._key].hasOwnProperty('get')) {
                return model[this._key].get() === id
            }

            return hasProperty ? id === model[this._key] : id === model
        });
    }

    public has(id: string): boolean {
        return this.first(id) !== undefined;
    }

    public isEmpty(): boolean {
        return this._values.length === 0
    }

    public get(): Array<any> {
        return this._values
    }

    public delete(id: string) {
        const index = this.firstIndex(id)

        if (index === -1) {
            return
        }

        this._values.splice(index, 1)
    }

    public count() {
        return this._values.length;
    }
}