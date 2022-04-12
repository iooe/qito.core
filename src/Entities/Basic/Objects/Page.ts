import Paragraph from "../Blocks/Foundation/Paragraph";
import Image from "../Blocks/Foundation/Image";
import Choice from "../Blocks/Foundation/Choice";
import Character from "../Blocks/Foundation/Character";
import Delimiter from "../Blocks/Foundation/Delimiter";
import BaseBlock from "../Blocks/BaseBlock";
import Button from "../Blocks/Foundation/Button";

export default class Page {
    protected data: Array<BaseBlock> = []

    setContent(content: Array<any>) {
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
}