export default interface CallbackContract {
    callback: {
        set(value: CallableFunction): void,
        get(): CallableFunction
        call(store: any): void
    }

    config: {
        set(value: Object): void,
        get(): Object
    }

    type: {
        set(value: String): void,
        get(): string
    }
}