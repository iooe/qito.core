import Callback from "../Callback";

export default class ShowNarrative implements Callback {

    private readonly _callback: CallableFunction;

    constructor(callback: CallableFunction) {
        this._callback = callback;
    }

    public process(): void {
        this._callback()
    }
}