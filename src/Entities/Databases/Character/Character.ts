import Media from "../../Basic/Objects/Media";

const TYPE_IMPORTANT = 'important',
    TYPE_FILLER = 'filler'

export default class Character {

    private readonly _id: string
    private readonly _name: string
    private readonly _media: Media
    private readonly _type: string;

    private _relationship: number

    constructor(id: string, name: string, media: string, relationship: number, type: string) {
        this._id = id
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

    public getId() {
        return this._id
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