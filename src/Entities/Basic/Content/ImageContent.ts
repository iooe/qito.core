import Content from "./Content";
import ObjectContent from "./ObjectContent";

const TYPE = 'image';

export default class ImageContent extends Content implements ObjectContent {
    private readonly path: string;
    private readonly format: string;

    constructor(path: string, format: string) {
        super()
        this.path = path
        this.format = format
    }

    public getContentAsObject() {
        return {
            path: this.path,
            format: this.format
        }
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
                url: this.path,
                format: this.format
            }
        }
    }
}