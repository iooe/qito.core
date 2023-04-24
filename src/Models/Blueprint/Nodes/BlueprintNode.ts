export default class BlueprintNode {
    protected _options = {
        isSingleton: false,
        hasUi: false,
    };
    public options = {
        getIsSingleton: () => {
            return this._options.isSingleton;
        },
        getHasUi: () => {
            return this._options.hasUi;
        },
    };
}