export default class BaseRequirement {

    protected readonly _id: string;
    protected readonly _action: string;
    protected readonly _value: number;

    constructor(id: string, action: string = '', value: number = 0) {
        this._id = id
        this._action = action
        this._value = value
    }

    getId(): string {
        return this._id;
    }

    getAction(): string {
        return this._action
    }

    getValue(): number {
        return this._value;
    }
}