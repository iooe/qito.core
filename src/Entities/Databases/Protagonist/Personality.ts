export default class Personality {

    private readonly _id: string
    private _name: string
    private _icon: string = ''
    private _value: number = 0

    constructor(id: string, name: string) {
        this._id = id
        this._name = name
    }

    public getId(): string {
        return this._id;
    }

    public getName(): string {
        return this._name;
    }

    public setName(value: string) {
        this._name = value;
    }

    public setIcon(value: string) {
        this._icon = value;
    }

    public setValue(value: number) {
        this._value = value;
    }

    public getIcon(): string {
        return this._icon;
    }

    public getValue(): number {
        return this._value;
    }
}