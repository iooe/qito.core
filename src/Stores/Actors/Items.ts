import Item from "../../Entities/Databases/Actors/Item/Item";
import Media from "../../Entities/Basic/Objects/Media";

export const NAME = 'actors.items'

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
        add(context: any, value: Item) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false
            }

            context.state.data.push(value)

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Item) => value.uuid.get() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<Item> = [];

            data.forEach(value => {
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
        first: (state: any) => (uuid: string): Item => {
            return state.data.find((value: Item) => value.uuid.get() === uuid);
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: Item) => value.uuid.get() === uuid && value.state.get()) !== undefined;
        }
    },
}

export default scheme