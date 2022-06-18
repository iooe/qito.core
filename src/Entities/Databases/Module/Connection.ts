export const constants = {
    COMPONENTS: {
        part: 'part',
        choice: 'choice',
        branching: 'branching'
    },
} as const;

export default class Connection {
    private readonly _uuid: string;
    private readonly _component: string;

    constructor(component: string, uuid: string) {
        this._component = component
        this._uuid = uuid
    }

    public uuid(): string {
        return this._uuid
    }

    public component(): string {
        return this._component
    }

    public export(): object {
        return {
            uuid: this._uuid,
            component: this._component
        }
    }
}