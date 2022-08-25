import {ResultContract} from "./ResultContract";

export default class BaseResult implements ResultContract {

    protected readonly _uuid: string;
    protected readonly _action: string;
    protected readonly _value: number;

    constructor(id: string, action: string = '', value: number = 0) {
        this._uuid = id
        this._action = action
        this._value = value
    }

    public uuid = {
        get: (): string => this._uuid
    }

    public getAction(): string {
        return this._action
    }

    public getValue(): number {
        return this._value;
    }

    public export() {
        return {}
    }
}