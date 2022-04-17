import Choice from "../Entities/Databases/Choice/Choice";

export const NAME = 'choices'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(state.data[length], 1)
}

export const scheme = {
    namespaced: true,
    state: () => ({
        data: Array<any>(),
    }),
    actions: {
        import(context: any, data: Array<any>) {
            const values: Array<Choice> = []

            data.map(item => {
                const instance = new Choice(item.uuid)
                instance.setData(item.data)

                values.push(instance)
            })

            context.state.data = values
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((item: Choice) => item.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        },
        first: (state: any) => (id: string): Choice => {
            return state.data.find((item: Choice) => item.getUuid() === id);
        }
    }
}

export default scheme