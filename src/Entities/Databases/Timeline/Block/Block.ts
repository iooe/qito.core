import Title from "../Meta/Title";
import Nav from "../Meta/Nav";
import Page from "../Page/Page";
import Callback from "./Callbacks/Callback";


export default class Block {
    private title: Title
    private nav: Nav
    private type: string | null = null
    private pages: Array<Page> = []
    private readonly id: string;
    protected _onCreated = Array<Callback>();

    constructor(id: string) {
        this.id = id
        this.nav = new Nav(null, null)
        this.title = new Title();
    }

    public getType() {
        return this.type
    }

    public getId() {
        return this.id
    }

    public getPages() {
        return this.pages
    }

    public getOnCreatedCallbacks() {
        return this._onCreated
    }

    public pushOnCreatedCallback(instance: Callback) {
        this._onCreated.push(instance)
    }

    public setType(type: string) {
        this.type = type
    }

    public setNav(instance: Nav) {
        this.nav = instance
    }

    public getNav() {
        return this.nav
    }

    public setTitle(instance: Title) {
        this.title = instance
    }

    public pushPage(page: Page) {
        this.pages.push(page)
    }

    public getTitleInstance(): Title {
        return this.title
    }
}