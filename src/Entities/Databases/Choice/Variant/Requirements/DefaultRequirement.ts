export default class DefaultRequirement {

    protected readonly _id: string;
    protected readonly _operator: string;
    protected readonly _value: number;

    constructor(id: string, action: string = '', value: number = 0) {
        this._id = id
        this._operator = action
        this._value = value
    }

    getId(): string {
        return this._id;
    }

    getAction(): string {
        return this._operator
    }

    getOperator(): string {
        return this._operator
    }

    getValue(): number {
        return this._value;
    }
}