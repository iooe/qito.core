import {v4 as uuidv4} from 'uuid';
import type ContentContract from './ContentContract';

export default class InteractableContent implements ContentContract {
    private _attributes: { [key: string]: string | number | boolean | null | CallableFunction } = {};
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
            return null;
        }

        return this._attributes[key];
    }

    public setAttribute(key: string, value: string | number | boolean) {
        this._attributes[key] = value;
    }

    public getAttributes() {
        return this._attributes;
    }

    public export() {
        return {
            uuid: this._uuid,
            type: this._type,
            data: Object.assign({}, this._attributes),
        };
    }
}