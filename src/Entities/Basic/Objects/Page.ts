import Paragraph from "../Blocks/Foundation/Paragraph";
import Image from "../Blocks/Foundation/Image";
import Choice from "../Blocks/Foundation/Choice";
import Character from "../Blocks/Foundation/Character";
import Delimiter from "../Blocks/Foundation/Delimiter";
import BaseBlock from "../Blocks/BaseBlock";
import Button from "../Blocks/Foundation/Button";
import {v4 as uuidv4} from 'uuid';

export default class Page {
    protected data: Array<BaseBlock> = []
    private readonly _uuid: string;

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public static create() {
        return new Page(uuidv4())
    }

    public getUuid() {
        return this._uuid
    }

    setBlocks(content: Array<any>) {
        content.forEach(data => {
            if (data.type === 'paragraph') {
                this.data.push(new Paragraph(data.data.text))
            }

            if (data.type === 'image') {
                this.data.push(new Image(data.data.url, data.data.format))
            }

            if (data.type === 'choice') {
                this.data.push(new Choice(data.data.uuid))
            }

            if (data.type === 'character') {
                this.data.push(new Character(data.data.uuid, data.data.text))
            }

            if (data.type === 'button') {
                this.data.push(new Button(data.data.id, data.data.text))
            }

            if (data.type === 'delimiter') {
                this.data.push(new Delimiter(data.data.format))
            }
        })
    }

    public getBlocks() {
        return this.data
    }

    public export() {
        return {
            uuid: this._uuid,
            blocks: this.data.map((value: BaseBlock) => value.export())
        }
    }
}