import Media from "../../Basic/Objects/Media";

const TYPE_IMPORTANT = 'important',
    TYPE_FILLER = 'filler'

export default class Character {

    private readonly _name: string
    private readonly _media: Media
    private readonly _type: string;

    private _relationship: number
    private readonly _uuid: string;

    constructor(_uuid: string, name: string, media: string = '', relationship: number = 0, type: string = TYPE_FILLER) {
        this._uuid = _uuid
        this._name = name
        this._media = new Media(media)
        this._relationship = relationship
        this._type = type
    }

    public isFiller() {
        return this._type === TYPE_FILLER
    }

    public media(): Media {
        return this._media
    }

    public getUuid() {
        return this._uuid
    }

    public getName() {
        return this._name
    }

    public setRelationship(value: number) {
        this._relationship = value
    }

    public getRelationship() {
        return this._relationship
    }
}