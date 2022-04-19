import ResultContract from "..//Results/ResultContract";

export default class BaseResult implements ResultContract{

    protected readonly _id: string;
    protected readonly _action: string;
    protected readonly _value: number;

    constructor(id: string, action: string = '', value: number = 0) {
        this._id = id
        this._action = action
        this._value = value
    }

    public getId(): string {
        return this._id;
    }

    public getAction(): string {
        return this._action
    }

    public getValue(): number {
        return this._value;
    }

    public export() {
        return {

        }
    }
}