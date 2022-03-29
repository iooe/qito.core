import Block from "./Block/Block";

export default class Segment {
    private blocks: Array<Block> = [];

    constructor() {
    }

    public getBlocks() {
        return this.blocks
    }

    public pushBlock(block: Block) {
        this.blocks.push(block)
    }
}