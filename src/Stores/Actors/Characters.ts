import Character from "../../Entities/Databases/Actors/Character/Character";
import Media from "../../Entities/Basic/Objects/Media";

export const NAME = 'actors.characters'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

export const scheme: any = {
    namespaced: true,
    state: () => ({
        data: Array<Character>(),
    }),
    mutations: {
        set(state: any, characters: Array<Character>) {
            state.data = characters;
        }
    },
    actions: {
        add(context: any, character: Character) {
            if (context.getters.first(character.uuid.get()) !== undefined) {
                return false
            }

            context.state.data.push(character)

            return true;
        },
        edit(context: any, character: Character) {
            const editedValue = context.state.data.find((value: Character) => value.uuid.get() === character.uuid.get());

            editedValue.name.set(character.name.get())
            editedValue.type.set(character.type.get())
            editedValue.media.set(character.media.get())
            editedValue.relationship.set(character.relationship.get())

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Character) => value.uuid.get() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<Character> = [];

            data.forEach(value => {
                const instance = new Character(value.uuid)
                instance.name.set(value.name)
                instance.relationship.set(value.relationship)
                instance.media.set(new Media(value.media.id))
                instance.type.set(value.type)
                values.push(instance)
            })

            context.commit('set', values)
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: Character) => value.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: Character) => value.uuid.get() === uuid) !== undefined;
        },
        first: (state: any) => (uuid: string): Character => {
            return state.data.find((value: Character) => value.uuid.get() === uuid);
        }
    }
}

export default scheme