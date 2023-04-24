import MediaResource from '../../Models/Resources/MediaResource';

export const NAME = 'resources.media';

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1]);
    state.data.splice(length, 1);
};

export const scheme = {
    namespaced: true,
    state: () => ({
        data: Array<MediaResource>(),
    }),
    mutations: {
        set(state: any, values: Array<MediaResource>) {
            state.data = values;
        },
    },
    actions: {
        add(context: any, value: MediaResource) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false;
            }

            context.state.data.push(value);

            return true;
        },
        edit(context: any, value: MediaResource) {
            const index = context.state.data.find((value: MediaResource) => value.uuid.get() === value.uuid.get());

            if (index === -1) {
                throw false;
            }

            context.state.data[index] = value;

            touch(context.state);

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: MediaResource) => value.uuid.get() === uuid);

            if (index === -1) {
                return false;
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<MediaResource> = [];

            data.forEach(value => {
                const instance = new MediaResource(value.uuid);
                instance.extension.set(value.extension);
                instance.type.set(value.type);
                instance.name.set(value.name);

                values.push(instance);
            });

            context.commit('set', values);
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: MediaResource) => value.export()),
            };
        },
    },
    getters: {
        first: (state: any) => (uuid: string): MediaResource => {
            return state.data.find((value: MediaResource) => value.uuid.get() === uuid || value.name.get() === uuid);
        },
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (uuid: string): boolean => {
            return state.data.find((value: MediaResource) => value.uuid.get() === uuid) !== undefined;
        },
    },
};

export default scheme;