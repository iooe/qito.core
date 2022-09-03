import LocalMedia from "../../Entities/Databases/Actors/Media/LocalMedia";

export const NAME = 'actors.media'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

export const scheme = {
    namespaced: true,
    state: () => ({
        data: Array<LocalMedia>(),
    }),
    mutations: {
        set(state: any, values: Array<LocalMedia>) {
            state.data = values;
        }
    },
    actions: {
        add(context: any, value: LocalMedia) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false
            }

            context.state.data.push(value)

            return true;
        },
        edit(context: any, editedValue: LocalMedia) {
            const index = context.state.data.find((value: LocalMedia) => value.uuid.get() === editedValue.uuid.get());

            if (index < 0) {
                return false
            }

            context.state.data[index] = editedValue

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: LocalMedia) => value.uuid.get() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<LocalMedia> = [];

            data.forEach(value => {
                const instance = new LocalMedia(value.uuid)
                instance.extension.set(value.extension)
                instance.type.set(value.type)

                values.push(instance)
            })

            context.commit('set', values)
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: LocalMedia) => value.export())
            }
        }
    },
    getters: {
        first: (state: any) => (uuid: string): LocalMedia => {
            return state.data.find((value: LocalMedia) => value.uuid.get() === uuid);
        },
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (uuid: string): boolean => {
            return state.data.find((value: LocalMedia) => value.uuid.get() === uuid) !== undefined;
        }
    }
}

export default scheme