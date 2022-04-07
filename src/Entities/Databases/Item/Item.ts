import Media from "../../Basic/Objects/Media";

export default class Item {

    private readonly _uuid: string
    private readonly _name: string
    private _state: boolean
    private readonly _media: Media

    constructor(uuid: string, name: string, state: boolean, path: string) {
        this._uuid = uuid
        this._name = name
        this._state = state
        this._media = new Media(path)
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

    public getName(): string {
        return this._name;
    }

    public getState(): boolean {
        return this._state;
    }

    public media(): Media {
        return this._media;
    }
}