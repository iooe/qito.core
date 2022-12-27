import Character from '../../Models/Actors/Character/Character';

export const NAME = 'actors.characters';

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1]);
    state.data.splice(length, 1);
};

export const scheme: any = {
    namespaced: true,
    state: () => ({
        data: Array<Character>(),
    }),
    mutations: {
        set(state: any, characters: Array<Character>) {
            state.data = characters;
        },
    },
    actions: {
        add(context: any, character: Character) {
            if (context.getters.first(character.uuid.get()) !== undefined) {
                return false;
            }

            context.state.data.push(character);

            return true;
        },
        edit(context: any, value: Character) {
            const index = context.state.data.find((value: Character) => value.uuid.get() === value.uuid.get());

            if (index === -1) {
                throw false;
            }

            context.state.data.splice(index, 1, value);

            touch(context.state);

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Character) => value.uuid.get() === uuid);

            if (index === -1) {
                return false;
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<Character> = [];

            data.forEach(value => {
                const instance = new Character(value.uuid);
                instance.name.set(value.name);
                instance.relationship.set(value.relationship);
                instance.mediaUuid.set(value.media.uuid);
                instance.type.set(value.type);
                values.push(instance);
            });

            context.commit('set', values);
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: Character) => value.export()),
            };
        },
    },
    getters: {
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: Character) => value.uuid.get() === uuid) !== undefined;
        },
        first: (state: any) => (uuid: string): Character => {
            return state.data.find((value: Character) => value.uuid.get() === uuid);
        },
    },
};

export default scheme;