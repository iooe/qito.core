export default class Commit {
    private _value: string | number | boolean = true;

    public export() {
        return {
            type: 'commit',
            value: this._value,
        };
    }

    public value = {
        set: (value: string | number | boolean) => {
            this._value = value;
        },
        get: () => this._value,
    };
}