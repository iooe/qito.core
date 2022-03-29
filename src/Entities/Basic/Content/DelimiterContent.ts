import PlainContent from "./PlainContent";
import Content from "./Content";

const TYPE = 'delimiter';

export default class DelimiterContent extends Content implements PlainContent {
    private readonly content: string;

    constructor(content: string) {
        super()
        this.content = content
    }

    public getContentAsString() {
        return this.content
    }

    public type() {
        return TYPE
    }

    public export() {
        return {
            type: TYPE,
            data: {
                text: this.content
            }
        }
    }
}