export default class TranslationValue {
    private readonly _key: string;

    public key = {
        get: (): string => this._key,
    };

    private _type: string;
    public type = {
        set: (value: string) => {
            this._type = value;
        },
        get: () => {
            return this._type;
        },
    };
    private _value: string;
    public value = {
        set: (value: string) => {
            this._value = value;
        },
        get: () => {
            return this._value;
        },
    };

    constructor(key: string, type: string, value: string) {
        this._key = key;
        this._type = type;
        this._value = value;
    }

    public static create(key: string, type: string, value: string) {
        return new TranslationValue(key, type, value);
    }

    public export(): object {
        return {
            key: this._key,
            type: this._type,
            value: this._value,
        };
    }
}