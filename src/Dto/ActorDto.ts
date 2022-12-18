import {v4 as uuidv4} from "uuid";
import Rule from "../Structures/Expression/Rule";
import Commit from "../Structures/Expression/Commit";

export default class ActorDto {
    private readonly _uuid: string

    private _component = {
        entity: '',
        uuid: ''
    }

    private _expression: Rule | Commit

    constructor(uuid: string) {
        this._uuid = uuid
        this._expression = new Rule()
    }

    public uuid = {
        get: () => this._uuid
    }

    public static create() {
        return new ActorDto(uuidv4())
    }

    public component = {
        setEntity: (entity: string) => {
            this._component.entity = entity
        },
        setUuid: (uuid: string) => {
            this._component.uuid = uuid
        },
        getEntity: () => this._component.entity,
        getUuid: () => this._component.uuid
    }


    public expression = {
        set: (value: Rule | Commit) => {
            this._expression = value
        },
        get: () => this._expression
    }

    public export() {
        return {
            uuid: this._uuid,
            component: {
                uuid: this._component.uuid,
                entity: this._component.entity,
            },
            expression: this._expression.export(),
        }
    }
}