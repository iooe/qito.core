import {v4 as uuidv4} from 'uuid';
import InteractableContainer from '../../../../Structures/InteractableContent/InteractableContainer';
import Collection from '../../../../Structures/Collection';
import BlueprintNode from '../BlueprintNode';

export default class TextNode extends BlueprintNode {
    private _pages = new Collection('uuid');
    public pages = {
        replace: (uuid: string, value: InteractableContainer) => this._pages.replace(uuid, value),
        get: (): Array<InteractableContainer> => this._pages.get(),
        add: (value: InteractableContainer) => this._pages.add(value),
        count: (): number => this._pages.count(),
        first: (uuid = ''): InteractableContainer => this._pages.first(uuid),
        firstIndex: (uuid: string): number => this._pages.firstIndex(uuid),
    };
    private readonly _uuid: string;
    public uuid = {
        get: (): string => this._uuid,
    };
    private _title = '';
    public title = {
        get: (): string => {
            return this._title;
        },
        set: (value: string) => {
            this._title = value;
        },
    };

    constructor(uuid: string) {
        super();
        this._uuid = uuid;
        this._title = uuid;


        this._options.isSingleton = true;
        this._options.hasUi = true;
    }

    public static create() {
        const instance = new TextNode(uuidv4());

        instance.pages.add(InteractableContainer.create());
        instance.pages.add(InteractableContainer.create());

        return instance;
    }

    public export() {
        let pages = this._pages.get().map((value: InteractableContainer) => value.export()).filter((value) => value.blocks.length > 0);

        pages = pages.length === 0 ? [InteractableContainer.create().export()] : pages;

        return {
            uuid: this._uuid,
            title: this._title,
            pages: pages,
        };
    }
}