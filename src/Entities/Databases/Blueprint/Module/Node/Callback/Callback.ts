import {CallbackContract} from "./CallbackContract";

export default class Callback implements CallbackContract {

    private _callback: CallableFunction = () => {
    };
    private _config: Object = {};
    private _type: string = ''

    public callback = {
        set: (value: CallableFunction): void => {
            this._callback = value
        },
        get: (): CallableFunction => {
            return this._callback
        },
        call: (store: any): void => {
            this._callback(store)
        }
    }

    public config = {
        set: (value: Object): void => {
            this._config = value
        },
        get: (): Object => {
            return this._config
        }
    }

    public type = {
        set: (value: string): void => {
            this._type = value
        },
        get: (): string => {
            return this._type
        }
    }
}