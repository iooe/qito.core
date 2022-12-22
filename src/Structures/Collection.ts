export default class Collection {
    private _values: Array<object | number | string | boolean> = [];
    private readonly _key: string;

    constructor(key = 'uuid') {
        this._key = key;
    }

    public set(values: never) {
        this._values = values;
    }

    public add(value) {
        // refactor it in future
        // eslint-disable-next-line no-prototype-builtins
        if (typeof value === 'object' && value.hasOwnProperty(this._key)) {
            if (value[this._key].hasOwnProperty('get') && this.firstIndex(value[this._key].get()) !== -1) {
                return;
            } else {
                if (this.firstIndex(value[this._key].get()) !== -1) {
                    return;
                }
            }
        }

        return this._values.push(value);
    }

    public replace(id: string, value: never) {
        const index = this.firstIndex(id);

        if (index === -1) {
            new Error('undefined');
            return;
        }

        this._values.splice(index, 1, value);
    }

    public firstIndex(id: string): number {
        if (this._values.length === 0) {
            return -1;
        }

        if (typeof id !== 'string' || id.length === 0) {
            return -1;
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