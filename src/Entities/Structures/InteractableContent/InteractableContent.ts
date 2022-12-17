import {v4 as uuidv4} from 'uuid';

export default class InteractableContent {
    private _attributes: { [key: string]: string | number | boolean } = {};
    private readonly _uuid: string;
    private readonly _type: string;

    public constructor(uuid: string | undefined, type: string, attributes) {
        this._uuid = uuid === undefined ? uuidv4() : uuid;
        this._type = type;

        Object.entries(attributes).map((value) => {
            // @ts-ignore
            this._attributes[value[0]] = value[1];
        });
    }

    public getAttribute(key: string) {
        if (this._attributes[key] === undefined) {
            throw new Error('The attribute isn\'t exist');
        }

        return this._attributes;
    }

    public setAttribute(key: string, value: string | number | boolean) {
        this._attributes[key] = value;
    }

    public export() {
        return {
            uuid: this._uuid,
            type: this._type,
            data: Object.assign({}, this._attributes),
        };
    }
}