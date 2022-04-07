import Preview from "./Preview/Preview";

export default class Fact {

    private readonly _uuid: string
    private _state: boolean
    private readonly _preview: Preview

    constructor(uuid: string, state: boolean, preview: Preview) {
        this._uuid = uuid
        this._state = state
        this._preview = preview
    }

    public open() {
        this._state = true
    }

    public hide() {
        this._state = false
    }

    public getUuid(): string {
        return this._uuid;
    }

    public getPreview(): Preview {
        return this._preview;
    }

    public getState(): boolean {
        return this._state;
    }
}