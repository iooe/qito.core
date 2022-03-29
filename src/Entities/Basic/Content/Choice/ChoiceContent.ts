import Variant from "./Variant/Variant";
import ArrayContent from "../ArrayContent";
import Content from "../Content";

export default class ChoiceContent extends Content implements ArrayContent {

    private readonly variants: Array<Variant> = []

    constructor(content: Array<any>) {
        super()
        content.forEach(variant => {
            this.variants.push(new Variant(variant))
        })
    }

    getContentAsArray(): Array<Variant> {
        return this.variants
    }

    public type() {
        return 'choice'
    }
}