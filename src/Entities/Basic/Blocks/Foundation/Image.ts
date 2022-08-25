import BaseBlock from "../BaseBlock";
import {BlockContract} from "../BlockContract";

const TYPE = 'image';

export default class Image extends BaseBlock implements BlockContract {
    private readonly _url: string;
    private readonly _format: string;

    constructor(url: string, format: string) {
        super()
        this._url = url
        this._format = format
    }

    public getId() {
        return this._url
    }

    public getType() {
        return TYPE
    }

    public export() {
        return {
            type: TYPE,
            data: {
                url: this._url,
                format: this._format
            }
        }
    }
}