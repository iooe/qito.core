export default interface CallbackContract {
    callback: {
        set(value: CallableFunction),
        get()
    }

    config: {
        set(value: Object),
        get()
    }

    type: {
        set(value: String),
        get()
    }
}