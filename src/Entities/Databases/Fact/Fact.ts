import Preview from "./Preview/Preview";

export default class Fact {

    private readonly _id: string
    private _state: boolean
    private readonly _preview: Preview

    constructor(id: string, state: boolean, preview: Preview) {
        this._id = id
        this._state = state
        this._preview = preview
    }

    public open() {
        this._state = true
    }

    public hide() {
        this._state = false
    }

    public getId(): string {
        return this._id;
    }

    public getPreview(): Preview {
        return this._preview;
    }

    public getState(): boolean {
        return this._state;
    }
}