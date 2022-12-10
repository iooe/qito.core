import BaseBlock from "../BaseBlock";
import {BlockContract} from "../BlockContract";

const TYPE = 'paragraph';

export default class Paragraph extends BaseBlock implements BlockContract {
    private readonly _content: string;

    constructor(content: string) {
        super()
        this._content = content
    }

    public getType() {
        return TYPE
    }

    public getId() {
        return this._content
    }

    public export() {
        return {
            type: TYPE,
            data: {
                text: this._content
            }
        }
    }
}