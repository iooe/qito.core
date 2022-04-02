import Block from "./Block/Block";

export default class Segment {
    private blocks: Array<Block> = [];
    private _id: string = ''

    constructor() {
    }

    public setId(id: string) {
        this._id = id
    }

    public getId() {
        return this._id
    }

    public getBlocks() {
        return this.blocks
    }

    public pushBlock(block: Block) {
        this.blocks.push(block)
    }
}