import ObjectContent from "./ObjectContent";
import Content from "./Content";

const TYPE = 'character';

export default class CharacterContent extends Content implements ObjectContent {
    private readonly id: string
    private readonly text: string

    constructor(id: string, text: string) {
        super()
        this.id = id
        this.text = text
    }

    public getContentAsObject() {
        return {
            id: this.id,
            text: this.text
        }
    }

    public type() {
        return TYPE
    }

    public export() {
        return {
            type: TYPE,
            data: {
                id: this.id,
                text: this.text
            }
        }
    }
}