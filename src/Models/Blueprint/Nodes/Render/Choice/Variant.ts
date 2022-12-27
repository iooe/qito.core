import type VariantRulesContainer from './VariantRulesContainer';
import {v4 as uuidv4} from 'uuid';
import type VariantCommit from './VariantCommit';
import type VariantCommitsContainer from './VariantCommitsContainer';
import Collection from '../../../../../Structures/Collection';

export default class Variant {
    private _commits: VariantCommitsContainer;
    private _rules = new Collection('uuid');
    private _title = '';
    private readonly _uuid: string;

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public static create() {
        return new Variant(uuidv4());
    }

    public title = {
        set: (value: string) => {
            this._title = value;
        },

        get: () => {
            return this._title;
        },
    };

    public uuid = {
        get: (): string => this._uuid,
    };

    public commits = {
        set: (value: VariantCommitsContainer) => this._commits = value,
        add: (value: VariantCommit) => this._commits.values.add(value),
        first: (uuid: string = ''): VariantCommit | undefined => this._commits.values.first(uuid),
        get: (): VariantCommitsContainer => this._commits,
        delete: (uuid: string) => this._commits.values.delete(uuid),
    };

    public rules = {
        add: (value: VariantRulesContainer) => this._rules.add(value),
        first: (uuid: string = ''): VariantRulesContainer | undefined => this._rules.first(uuid),
        get: (): Array<VariantRulesContainer> => this._rules.get(),
        delete: (uuid: string) => this._rules.delete(uuid),
    };

    public export() {
        return {
            uuid: this._uuid,
            metadata: {
                title: this._title,
            },
            rules: this._rules.get().map((value: VariantRulesContainer) => value.export()),
            commits: this._commits.export(),
        };
    }
}