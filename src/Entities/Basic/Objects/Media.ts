export default class Media {

    private readonly _path: string

    constructor(path: string = '') {
        this._path = path
    }

    public isEmpty(): boolean {
        return this._path.length === 0
    }

    public path(): string {
        return this._path;
    }

    public isVideo(): boolean {
        const pieces = this._path.split('.'),
            type = pieces[pieces.length - 1];

        return type === 'mp4'
    }
}