import ParagraphContent from "../../../Basic/Content/ParagraphContent";
import ImageContent from "../../../Basic/Content/ImageContent";
import Content from "../../../Basic/Content/Content";

export default class Page {
    private data: Array<Content> = []

    setContent(content: Array<any>) {
        content.forEach(data => {
            if (data.type === 'paragraph') {
                this.data.push(new ParagraphContent(data.data.text))
            }

            if (data.type === 'image') {
                this.data.push(new ImageContent(data.data.url, data.data.format))
            }
        })
    }

    public getBlocks() {
        return this.data
    }
}