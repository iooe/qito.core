import Media from "../../Basic/Objects/Media";

export default class Personality {

    private readonly _id: string
    private _name: string
    private _value: number = 0
    private _media: Media = new Media()

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

    public setValue(value: number) {
        this._value = value;
    }

    public getValue(): number {
        return this._value;
    }

    public setMedia(media: Media) {
        this._media = media
    }

    public getMedia(): Media {
        return this._media;
    }
}