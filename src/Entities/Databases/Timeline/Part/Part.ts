import Title from "../Meta/Title";
import Nav from "../Meta/Nav";
import Page from "../Page/Page";
import Callback from "./Callbacks/Callback";


export default class Part {
    private _title: Title
    private _nav: Nav
    private _type: string | null = null
    private _pages: Array<Page> = []
    private readonly _uuid: string;
    protected _onCreated = Array<Callback>();

    constructor(id: string) {
        this._uuid = id
        this._nav = new Nav(null, null)
        this._title = new Title();
    }

    public getType() {
        return this._type
    }

    public getUuid() {
        return this._uuid
    }

    public getPages() {
        return this._pages
    }

    public getOnCreatedCallbacks() {
        return this._onCreated
    }

    public pushOnCreatedCallback(instance: Callback) {
        this._onCreated.push(instance)
    }

    public setType(type: string) {
        this._type = type
    }

    public setNav(instance: Nav) {
        this._nav = instance
    }

    public getNav() {
        return this._nav
    }

    public setTitle(instance: Title) {
        this._title = instance
    }

    public pushPage(page: Page) {
        this._pages.push(page)
    }

    public getTitle(): Title {
        return this._title
    }
}