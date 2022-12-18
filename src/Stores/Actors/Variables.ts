import Variable from "../../Models/Actors/Variable/Variable";

export const NAME = 'actors.variables'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

const scheme: any = {
    namespaced: true,
    state: () => ({
        data: Array<Variable>(),
    }),
    mutations: {
        set(state: any, data: Array<Variable>) {
            state.data = data;
        }
    },
    actions: {
        add(context: any, value: Variable) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false
            }

            context.state.data.push(value)

            return true;
        },
        edit(context: any, value: Variable) {
            const index = context.state.data.find((value: Variable) => value.uuid.get() === value.uuid.get());

            if (index === -1) {
                throw false;
            }

            context.state.data[index] = value;

            touch(context.state)

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Variable) => value.uuid.get() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<Variable> = [];

            data.forEach(value => {
                const instance = new Variable(value.uuid)
                instance.name.set(value.name)
                instance.type.set(value.type)
                instance.value.set(value.value)

                values.push(instance)
            })

            context.state.data = values
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: Variable) => value.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        },
        first: (state: any) => (uuid: string): Variable => {
            return state.data.find((value: Variable) => value.uuid.get() === uuid);
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: Variable) => value.uuid.get() === uuid) !== undefined;
        }
    },
}

export default scheme