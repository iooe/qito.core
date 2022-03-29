export default class Preview {

    private readonly _message: string

    constructor(message: string) {
        this._message = message

    }

    getMessage(): string {
        return this._message;
    }
}