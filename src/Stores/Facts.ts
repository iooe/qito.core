import Fact from "../Entities/Databases/Fact/Fact";
import Preview from "../Entities/Databases/Fact/Preview/Preview";
import Title from "../Entities/Basic/Objects/Title";

export const NAME = 'facts'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

const scheme: any = {
    namespaced: true,
    state: () => ({
        data: Array<Fact>(),
    }),
    mutations: {
        set(state: any, items: Array<Fact>) {
            state.data = items;
        },
        open(state: any, id: string) {
            state.data.find((item: Fact) => item.getUuid() === id).open()
        },
        hide(state: any, id: string) {
            state.data.find((item: Fact) => item.getUuid() === id).hide()
        }
    },
    actions: {
        add(context: any, fact: Fact) {
            if (context.getters.first(fact.getUuid()) !== undefined) {
                return false
            }

            context.state.data.push(fact)

            return true;
        },
        edit(context: any, item: Fact) {
            const editedValue = context.state.data.find((value: Fact) => value.getUuid() === item.getUuid());

            editedValue.preview.set(item.preview.get())

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Fact) => value.getUuid() === uuid);

            if (index === undefined) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<Fact> = [];

            data.map(item => {
                const instance = new Fact(item.uuid)

                instance.title.set(new Title(item.title.value))
                instance.preview.set(new Preview(item.preview.message))
                instance.state.set(item.state)

                values.push(instance)
            })

            context.commit('set', values)
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: Fact) => value.export())
            }
        }
    },
    getters: {
        first: (state: any) => (id: string): Fact => {
            return state.data.find((item: Fact) => item.getUuid() === id);
        },
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (id: string): boolean => {
            return state.data.find((item: Fact) => item.getUuid() === id && item.state.get()) !== undefined;
        }
    }
}

export default scheme