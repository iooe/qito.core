import {v4 as uuidv4} from 'uuid';
import InteractableContainer from '../../../../../Structures/InteractableContent/InteractableContainer';
import Collection from "../../../../../Structures/Collection";

export default class Part {
    private _pages = new Collection('uuid');

    private readonly _uuid: string;
    private _title = '';

    constructor(uuid: string) {
        this._uuid = uuid;
        this._title = uuid;
    }

    public static create() {
        const instance = new Part(uuidv4());

        instance.pages.add(InteractableContainer.create());
        instance.pages.add(InteractableContainer.create());

        return instance;
    }

    public uuid = {
        get: (): string => this._uuid,
    };

    public title = {
        get: (): string => {
            return this._title;
        },
        set: (value: string) => {
            this._title = value;
        },
    };

    public pages = {
        replace: (uuid: string, value: InteractableContainer) => this._pages.replace(uuid, value),
        /*    replace: (uuid: string, value: InteractableContainer) => {
                const index = this._pages.findIndex((value: InteractableContainer) => value.uuid.get() === uuid);

                if (index === -1) {
                    new Error('Unfinded');
                }

                this._pages[index] = value;
            },*/
        get: (): Array<InteractableContainer> => this._pages.get(),
        add: (value: InteractableContainer) => this._pages.add(value),
        count: () => this._pages.count(),
        first: (uuid = '') => this._pages.first(uuid),
        firstIndex: (uuid: string) => this._pages.firstIndex(uuid),
    };

    public export() {
        return {
            uuid: this._uuid,
            title: this._title,
            pages: this._pages.get().map((value: InteractableContainer) => value.export()),
        };
    }
}