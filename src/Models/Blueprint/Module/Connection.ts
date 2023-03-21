export default class Connection {
    private readonly _uuid: string;

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public uuid(): string {
        return this._uuid;
    }

    public export(): object {
        return {
            uuid: this._uuid,
        };
    }
}