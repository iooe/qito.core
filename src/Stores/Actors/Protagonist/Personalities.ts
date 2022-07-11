import Personality from "../../../Entities/Databases/Actors/Protagonist/Personality";
import Media from "../../../Entities/Basic/Objects/Media";

export const NAME = 'actors.protagonist.personalities'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(state.data[length], 1)
}

export const scheme: any = {
    namespaced: true,
    state: () => ({
        data: Array<Personality>(),
    }),
    mutations: {
        set(state: any, items: Array<Personality>) {
            state.data = items
        },
        increase(state: any, {uuid, value}: any) {
            const instance = state.data.find((item: Personality) => item.uuid.get() === uuid);

            if (instance === undefined) {
                return
            }

            instance.value.set(instance.value.get() + value);
        },
        decrease(state: any, {uuid, value}: any) {
            const instance = state.data.find((item: Personality) => item.uuid.get() === uuid);

            if (instance === undefined) {
                return
            }

            instance.value.set(instance.value.get() - value);
        },
    },
    actions: {
        add(context: any, personality: Personality) {
            if (context.getters.first(personality.uuid.get()) !== undefined) {
                return false
            }

            context.state.data.push(personality)

            return true;
        },
        edit(context: any, personality: Personality) {
            const editedValue = context.state.data.find((value: Personality) => value.uuid.get() === personality.uuid.get());

            editedValue.name.set(personality.name.get())
            editedValue.value.set(personality.value.get())

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Personality) => value.uuid.get() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<Personality> = []

            data.forEach((value: any) => {
                const personality = new Personality(value.uuid)
                personality.name.set(value.name)
                personality.media.set(new Media(value.media.id))
                personality.value.set(value.value)
                values.push(personality)
            })

            context.commit('set', values)
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: Personality) => value.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: Personality) => value.uuid.get() === uuid) !== undefined;
        },
        first: (state: any) => (uuid: string): Personality => {
            return state.data.find((value: Personality) => value.uuid.get() === uuid)
        }
    }
}

export default scheme