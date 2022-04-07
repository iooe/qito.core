import ObjectContent from "./ObjectContent";
import Content from "./Content";

const TYPE = 'choice';

export default class ChoiceContent extends Content implements ObjectContent {
    private readonly uuid: string

    constructor(id: string) {
        super()
        this.uuid = id
    }

    public getContentAsObject() {
        return {
            uuid: this.uuid
        }
    }

    public type() {
        return TYPE
    }

    public getId() {
        return this.uuid
    }

    public export() {
        return {
            type: TYPE,
            data: {
                uuid: this.uuid
            }
        }
    }
}