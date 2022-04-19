import Choice from "../Entities/Databases/Choice/Choice";
import Title from "../Entities/Basic/Objects/Title";

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
                instance.title.set(new Title(item.title.value, item.title.slug))
                item.data.forEach((variant: object) => instance.variants.add(variant))

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