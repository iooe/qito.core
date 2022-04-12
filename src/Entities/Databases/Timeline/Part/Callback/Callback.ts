import CallbackContract from "./CallbackContract";

export default class Callback implements CallbackContract {

    private _callback: CallableFunction = () => {
    };
    private _config: Object = {};
    private _type: string = ''

    public callback = {
        set: (value: CallableFunction) => {
            this._callback = value
        },
        get: () => {
            return this._callback
        }
    }

    public config = {
        set: (value: Object) => {
            this._config = value
        },
        get: () => {
            return this._config
        }
    }

    public type = {
        set: (value: string) => {
            this._type = value
        },
        get: () => {
            return this._type
        }
    }
}