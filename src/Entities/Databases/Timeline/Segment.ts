import Part from "./Part/Part";
import Title from "./Meta/Title";

export default class Segment {
    private _parts: Array<Part> = [];
    private _uuid: string = ''
    private _title = new Title();

    public getTitle() {
        return this._title
    }

    public setTitle(value: Title) {
        this._title = value
    }

    public setUuid(id: string) {
        this._uuid = id
    }

    public getUuid() {
        return this._uuid
    }

    public getParts() {
        return this._parts
    }

    public pushPart(part: Part) {
        this._parts.push(part)
    }
}