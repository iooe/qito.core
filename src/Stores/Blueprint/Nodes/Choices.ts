import Choice from "../../../Entities/Databases/Blueprint/Nodes/Render/Choice/Choice";

export const NAME = 'blueprint.nodes.choices'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

export const scheme = {
    namespaced: true,
    state: () => ({
        data: Array<any>(),
    }),
    actions: {
        add(context: any, value: Choice) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false
            }

            context.state.data.push(value)

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Choice) => value.uuid.get() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<Choice> = []

            data.map(value => {
                const instance = new Choice(value.uuid)
                instance.title.set(value.title)
                value.data.forEach((variant: object) => instance.variants.import(variant))

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
        first: (state: any) => (uuid: string = ''): Choice | undefined => {
            if (state.data.length === 0) {
                return undefined
            }

            if (uuid.length === 0) {
                return state.data[0]
            }

            return state.data.find((value: Choice) => value.uuid.get() === uuid);
        }
    }
}

export default scheme