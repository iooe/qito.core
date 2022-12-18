import {v4 as uuidv4} from 'uuid';

export const constants = {
    TYPE_NUMBER: 'number',
    TYPE_BOOLEAN: 'boolean',
    TYPE_STRING: 'string',
} as const;

export default class Variable {
    private readonly _uuid: string;
    private _name: string = '';
    private _value: string | boolean | number = false;
    private _type: string = constants.TYPE_BOOLEAN;

    constructor(uuid: string) {
        this._uuid = uuid;
        this._name = uuid;
    }

    public static create() {
        return new Variable(uuidv4());
    }

    public uuid = {
        get: (): string => this._uuid,
    };

    public name = {
        set: (value: string): void => {
            this._name = value;
        },
        get: (): string => {
            return this._name;
        },
    };

    public value = {
        set: (value: boolean | string | number): void => {
            if (this.type.isBoolean() && typeof value !== 'boolean') {
                if (value === 'false' || value === 'true') {
                    value = value !== 'false';
                } else {
                    throw Error('Incorrect value type');
                }
            }

            if (this.type.isString()) {
                if (typeof value !== 'string') {
                    throw Error('Incorrect value type');
                }

                if (value.length === 0) {
                    throw Error('Empty value');
                }
            }

            if (this.type.isNumber() && typeof value !== 'number') {
                throw Error('Incorrect value type');
            }

            this._value = value;
        },
        get: (): string | boolean | number => {
            return this._value;
        },
    };

    public type = {
        set: (value: string): void => {
            if (value !== constants.TYPE_NUMBER && value !== constants.TYPE_BOOLEAN && value !== constants.TYPE_STRING) {
                throw Error('Incorrect type');
            }

            this._type = value;

            if (this.type.isBoolean()) {
                this._value = false;
            }

            if (this.type.isNumber()) {
                this._value = 0;
            }

            if (this.type.isString()) {
                this._value = 'undefined';
            }
        },
        get: (): string => {
            return this._type;
        },
        isString: (): boolean => this._type === constants.TYPE_STRING,
        isNumber: (): boolean => this._type === constants.TYPE_NUMBER,
        isBoolean: (): boolean => this._type === constants.TYPE_BOOLEAN,
    };

    public export(): Object {
        return {
            uuid: this._uuid,
            name: this._name,
            type: this._type,
            value: this._value,
        };
    }
}