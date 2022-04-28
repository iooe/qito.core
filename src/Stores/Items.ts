import Item from "../Entities/Databases/Item/Item";
import Media from "../Entities/Basic/Objects/Media";

export const NAME = 'items'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

const scheme: any = {
    namespaced: true,
    state: () => ({
        data: Array<Item>(),
    }),
    mutations: {
        set(state: any, data: Array<Item>) {
            state.data = data;
        }
    },
    actions: {
        add(context: any, item: Item) {
            if (context.getters.first(item.getUuid()) !== undefined) {
                return false
            }

            context.state.data.push(item)

            return true;
        },
        edit(context: any, item: Item) {
            const editedValue = context.state.data.find((value: Item) => value.getUuid() === item.getUuid());

            editedValue.name.set(item.name.get())
            editedValue.state.set(item.state.get())
            editedValue.media.set(item.media.get())

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<Item> = [];

            data.map(value => {
                const instance = new Item(value.uuid)
                instance.name.set(value.name)
                instance.state.set(value.state)
                instance.media.set(new Media(value.media.id))

                values.push(instance)
            })

            context.state.data = values
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((item: Item) => item.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        },
        first: (state: any) => (id: string): Item => {
            return state.data.find((item: Item) => item.getUuid() === id);
        },
        has: (state: any) => (id: string) => {
            return state.data.find((item: Item) => item.getUuid() === id && item.state.get()) !== undefined;
        },
    },
}

export default scheme