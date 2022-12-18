import {v4 as uuidv4} from 'uuid';
import type ContentContract from './ContentContract';

export default class InteractableContainer {
    protected _values: Array<ContentContract> = [];
    private readonly _uuid: string;

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public static create() {
        return new InteractableContainer(uuidv4());
    }

    public uuid = {
        get: (): string => this._uuid,
    };

    public blocks = {
        set: (values: Array<ContentContract>) => {
            this._values = [];
            values.forEach((value) => this._values.push(value));
        },
        add: (instance: ContentContract) => {
            this._values.push(instance);
        },
        get: () => {
            return this._values;
        },
    };

    public export() {
        return {
            uuid: this._uuid,
            blocks: this._values.map((value: ContentContract) => value.export()),
        };
    }
}