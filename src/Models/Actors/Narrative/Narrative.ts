import InteractableContainer from '../../../Structures/InteractableContent/InteractableContainer';
import {v4 as uuidv4} from 'uuid';

export default class Narrative {
    private _title: string = '';
    private _pages: Array<InteractableContainer> = [];
    private readonly _uuid: string = '';
    private _styles: Array<string> = [];

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public static create() {
        return new Narrative(uuidv4());
    }

    public uuid = {
        get: (): string => this._uuid,
    };

    public pages = {
        get: () => {
            return this._pages;
        },
        push: (page: InteractableContainer) => {
            this._pages.push(page);
        },
        count: () => {
            return this._pages.length;
        },
        delete: (uuid: string) => {
            const index = this._pages.findIndex((value: InteractableContainer) => value.uuid.get() === uuid);

            if (index === -1) {
                return;
            }

            this._pages.splice(index, 1);
        },
        index: (uuid: string) => {
            return this._pages.findIndex((value: InteractableContainer) => value.uuid.get() === uuid);
        },
        first: (uuid: string = '') => {

            if (uuid.length === 0) {
                return this._pages[0];
            }

            return this._pages.find((value: InteractableContainer) => value.uuid.get() === uuid);
        },
    };

    public styles = {
        set: (value: Array<string>) => {
            this._styles = value;
        },
        get: () => {
            return this._styles;
        },
    };

    public title = {
        set: (value: string) => {
            this._title = value;
        },
        get: (): string => {
            return this._title;
        },
    };

    public export(): Object {
        return {
            uuid: this._uuid,
            title: this._title,
            style: this._styles.map((value: string) => value),
            pages: this._pages.map((page: InteractableContainer) => page.export()),
        };
    }
}