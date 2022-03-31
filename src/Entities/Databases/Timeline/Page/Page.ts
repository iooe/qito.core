import ParagraphContent from "../../../Basic/Content/ParagraphContent";
import ImageContent from "../../../Basic/Content/ImageContent";

import ChoiceContent from "../../../Basic/Content/ChoiceContent";

import CharacterContent from "../../../Basic/Content/CharacterContent";
import DelimiterContent from "../../../Basic/Content/DelimiterContent";
import Content from "../../../Basic/Content/Content";
import ButtonContent from "../../../Basic/Content/ButtonContent";

export default class Page {
    protected data: Array<Content> = []

    setContent(content: Array<any>) {
        content.forEach(data => {
            if (data.type === 'paragraph') {
                this.data.push(new ParagraphContent(data.data.text))
            }

            if (data.type === 'image') {
                this.data.push(new ImageContent(data.data.url, data.data.format))
            }

            if (data.type === 'choice') {
                this.data.push(new ChoiceContent(data.data.id))
            }

            if (data.type === 'character') {
                this.data.push(new CharacterContent(data.data.id, data.data.text))
            }

            if (data.type === 'button') {
                this.data.push(new ButtonContent(data.data.id, data.data.text))
            }

            if (data.type === 'delimiter') {
                this.data.push(new DelimiterContent(data.data.format))
            }
        })
    }


    public getBlocks() {
        return this.data
    }
}