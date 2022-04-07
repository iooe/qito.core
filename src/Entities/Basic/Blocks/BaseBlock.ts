export default class BaseBlock {
    public getType(): string {
        return ''
    }

    public getId(): string {
        return ''
    }

    public export(): object {
        return {}
    }
}