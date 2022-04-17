import Item from "../Entities/Databases/Item/Item";
import Media from "../Entities/Basic/Objects/Media";

export const NAME = 'items'

export const touch = (state: any) => {
    const length = state.items.length;
    state.items.push(state.items[length - 1])
    state.items.splice(state.items[length], 1)
}

const scheme: any = {
    namespaced: true,
    state: () => ({
        items: Array<Item>(),
    }),
    mutations: {
        set(state: any, items: Array<Item>) {
            state.items = items;
        }
    },
    actions: {
        add(context: any, item: Item) {
            if (context.getters.first(item.getUuid()) !== undefined) {
                return false
            }

            context.state.items.push(item)

            return true;
        },
        edit(context: any, item: Item) {
            const editedValue = context.state.items.find((value: Item) => value.getUuid() === item.getUuid());

            editedValue.name.set(item.name.get())
            editedValue.state.set(item.state.get())
            editedValue.media.set(item.media.get())

            return true;
        },
        import(context: any, data: Array<any>) {
            let items: Array<Item> = [];

            data.map(value => {
                const instance = new Item(value.uuid)
                instance.name.set(value.name)
                instance.state.set(value.state)
                instance.media.set(new Media(value.media.id))

                items.push(instance)
            })

            context.commit('set', items)
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.items.map((item: Item) => item.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.items
        },
        first: (state: any) => (id: string): Item => {
            return state.items.find((item: Item) => item.getUuid() === id);
        },
        has: (state: any) => (id: string) => {
            return state.items.find((item: Item) => item.getUuid() === id && item.state.get()) !== undefined;
        },
    },
}

export default scheme