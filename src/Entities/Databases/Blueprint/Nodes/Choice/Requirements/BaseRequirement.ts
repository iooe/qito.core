import RequirementContract from "./RequirementContract";

export default class BaseRequirement implements RequirementContract {

    protected readonly _uuid: string;
    protected readonly _operator: string;
    protected readonly _value: number;

    constructor(id: string, action: string = '', value: number = 0) {
        this._uuid = id
        this._operator = action
        this._value = value
    }

    public uuid = {
        get: (): string => this._uuid
    }

    public getAction(): string {
        return this._operator
    }

    public getOperator(): string {
        return this._operator
    }

    public getValue(): number {
        return this._value;
    }

    public export() {
        return {}
    }
}