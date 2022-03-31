import Content from "./Content";
import ObjectContent from "./ObjectContent";

const TYPE = 'image';

export default class ImageContent extends Content implements ObjectContent {
    private readonly url: string;
    private readonly format: string;

    constructor(url: string, format: string) {
        super()
        this.url = url
        this.format = format
    }

    public getContentAsObject() {
        return {
            url: this.url,
            format: this.format
        }
    }

    public getId() {
        return this.url
    }

    public type() {
        return TYPE
    }

    public static import() {

    }

    public export() {
        return {
            type: TYPE,
            data: {
                url: this.url,
                format: this.format
            }
        }
    }
}