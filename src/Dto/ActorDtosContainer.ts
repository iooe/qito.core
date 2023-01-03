import {v4 as uuidv4} from 'uuid';
import type ActorDto from './ActorDto';
import type ActorsContainer from './ActorsContainer';
import Collection from '../Structures/Collection';

export default class ActorDtosContainer implements ActorsContainer {
    private readonly _uuid: string;
    private _data = new Collection('uuid');

    constructor(uuid: string) {
        this._uuid = uuid;
    }

    public uuid = {
        get: () => this._uuid,
    };

    public static create() {
        return new ActorDtosContainer(uuidv4());
    }

    public values = {
        add: (value: ActorDto) => this._data.add(value),
        replace: (uuid: string, value: ActorDto) => this._data.replace(uuid, value),
        first: (uuid: string = '') => this._data.first(uuid),
        delete: (uuid: string) => this._data.delete(uuid),
        get: () => this._data.get(),
    };

    public export() {
        return {
            uuid: this._uuid,
            data: this._data.get().map(value => value.export()),
        };
    }
}