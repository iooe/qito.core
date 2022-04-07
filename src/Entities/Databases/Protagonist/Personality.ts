import Media from "../../Basic/Objects/Media";

export default class Personality {

    private readonly _uuid: string
    private _name: string
    private _value: number = 0
    private _media: Media = new Media()

    constructor(uuid: string, name: string) {
        this._uuid = uuid
        this._name = name
    }

    public getUuid(): string {
        return this._uuid;
    }

    public getName(): string {
        return this._name;
    }

    public setName(value: string) {
        this._name = value;
    }

    public setValue(value: number) {
        this._value = value;
    }

    public getValue(): number {
        return this._value;
    }

    public setMedia(media: Media) {
        this._media = media
    }

    public media(): Media {
        return this._media;
    }
}