export default class Collection {
    private _values: Array<object | number | string | boolean> = [];
    private readonly _key: string;

    constructor(key = 'uuid') {
        this._key = key;
    }

    public set(values: never) {
        this._values = values;
    }

    public add(value, index: number | undefined = undefined) {
        if (index === undefined) {
            return this._values.push(value);
        }

        this._values[index] = value;
        return value;
    }

    public replace(id: string, value: never) {
        const index = this.firstIndex(id);

        if (index === -1) {
            new Error('undefined');
        }

        this._values[index] = value;
    }

    public firstIndex(id = ''): number {
        if (this._values.length === 0) {
            return undefined;
        }

        if (id.length === 0) {
            return 0;
        }

        return this._values.findIndex((model) => {
            // eslint-disable-next-line no-prototype-builtins
            const hasProperty = model.hasOwnProperty(this._key);

            // eslint-disable-next-line no-prototype-builtins
            if (hasProperty && model[this._key].hasOwnProperty('get')) {
                return model[this._key].get() === id;
            }

            return hasProperty ? id === model[this._key] : id === model;
        });
    }

    public first(id = ''): string | number | boolean | object {
        if (this._values.length === 0) {
            return undefined;
        }

        if (id.length === 0) {
            return this._values[0];
        }

        return this._values.find((model) => {
            // eslint-disable-next-line no-prototype-builtins
            const hasProperty = model.hasOwnProperty(this._key);

            // eslint-disable-next-line no-prototype-builtins
            if (hasProperty && model[this._key].hasOwnProperty('get')) {
                return model[this._key].get() === id;
            }

            return hasProperty ? id === model[this._key] : id === model;
        });
    }

    public has(id: string): boolean {
        return this.first(id) !== undefined;
    }

    public isEmpty(): boolean {
        return this._values.length === 0;
    }

    public get() {
        return this._values;
    }

    public delete(id: string) {
        const index = this.firstIndex(id);

        if (index === -1) {
            return;
        }

        this._values.splice(index, 1);
    }

    public count() {
        return this._values.length;
    }
}