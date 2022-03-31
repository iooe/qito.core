import ObjectContent from "./ObjectContent";
import Content from "./Content";

const TYPE = 'choice';

export default class ChoiceContent extends Content implements ObjectContent {
    private readonly id: string

    constructor(id: string) {
        super()
        this.id = id
    }

    public getContentAsObject() {
        return {
            id: this.id
        }
    }

    public type() {
        return TYPE
    }

    public getId() {
        return this.id
    }

    public export() {
        return {
            type: TYPE,
            data: {
                id: this.id
            }
        }
    }
}