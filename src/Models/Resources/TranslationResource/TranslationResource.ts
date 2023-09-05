import type TranslationValue from './TranslationValue';
import Collection from '../../../Structures/Collection';

export default class TranslationResource {

    private readonly _lang: string;
    public lang = {
        get: () => {
            return this._lang;
        },
    };
    private _values = new Collection('key');
    public values = {
        add: (value: TranslationValue) => this._values.add(value),
        replace: (uuid: string, value: TranslationValue) => this._values.replace(uuid, value),
        first: (uuid = '') => this._values.first(uuid),
        delete: (uuid: string) => this._values.delete(uuid),
        get: () => this._values.get(),
    };

    constructor(lang: string) {
        this._lang = lang;
    }

    public export(): object {
        return {
            lang: this._lang,
            data: this._values.get().map((value: TranslationValue) => value.export()),
        };
    }
}