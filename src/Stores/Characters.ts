import Character from "../Entities/Databases/Character/Character";
import Media from "../Entities/Basic/Objects/Media";
import Fact from "../Entities/Databases/Fact/Fact";

export const NAME = 'characters'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

export const scheme:any = {
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
            if (context.getters.first(character.getUuid()) !== undefined) {
                return false
            }

            context.state.data.push(character)

            return true;
        },
        edit(context: any, item: Character) {
            const editedValue = context.state.data.find((value: Fact) => value.getUuid() === item.getUuid());

            editedValue.name.set(item.name.get())
            editedValue.type.set(item.type.get())
            editedValue.media.set(item.media.get())
            editedValue.relationship.set(item.relationship.get())

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
        first: (state: any) => (id: string): Character => {
            return state.data.find((character: Character) => character.getUuid() === id);
        }
    }
}

export default scheme