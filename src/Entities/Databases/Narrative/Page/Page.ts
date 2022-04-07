import Paragraph from "../../../Basic/Blocks/Foundation/Paragraph";
import Image from "../../../Basic/Blocks/Foundation/Image";
import BaseBlock from "../../../Basic/Blocks/BaseBlock";

export default class Page {
    private data: Array<BaseBlock> = []

    setContent(content: Array<any>) {
        content.forEach(data => {
            if (data.type === 'paragraph') {
                this.data.push(new Paragraph(data.data.text))
            }

            if (data.type === 'image') {
                this.data.push(new Image(data.data.url, data.data.format))
            }
        })
    }

    public getBlocks() {
        return this.data
    }
}