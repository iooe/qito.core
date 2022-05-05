import Personality from "../Entities/Databases/Protagonist/Personality";
import Media from "../Entities/Basic/Objects/Media";
import Narrative from "../Entities/Databases/Narrative/Narrative";

export const NAME = 'protagonist'

export const touchPersonality = (state: any) => {
    const length = state.personalities.length;
    state.personalities.push(state.personalities[length - 1])
    state.personalities.splice(state.personalities[length], 1)
}

export const scheme: any = {
    namespaced: true,
    state: () => ({
        personalities: Array<Personality>(),
    }),
    mutations: {
        pushPersonality(state: any, item: Personality) {
            state.personalities.push(item)
        },
        increasePersonality(state: any, {uuid, value}: any) {
            const instance = state.personalities.find((item: Personality) => item.getUuid() === uuid);

            if (instance === undefined) {
                return
            }

            instance.value.set(instance.value.get() + value);
        },
        decreasePersonality(state: any, {uuid, value}: any) {
            const instance = state.personalities.find((item: Personality) => item.getUuid() === uuid);

            if (instance === undefined) {
                return
            }

            instance.value.set(instance.value.get() - value);
        },
    },
    actions: {
        addPersonality(context: any, personality: Personality) {
            if (context.getters.getPersonality(personality.getUuid()) !== undefined) {
                return false
            }

            context.state.personalities.push(personality)

            return true;
        },
        editPersonality(context: any, personality: Personality) {
            const editedValue = context.state.personalities.find((value: Personality) => value.getUuid() === personality.getUuid());

            editedValue.name.set(personality.name.get())
            editedValue.value.set(personality.value.get())

            return true;
        },
        removePersonality(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Personality) => value.getUuid() === uuid);

            if (index === undefined) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            context.personalities = []

            data.forEach(instance => {
                if (instance.key === 'personalities') {
                    instance.data.forEach((value: any) => {
                        const instance = new Personality(value.uuid)
                        instance.name.set(value.name)
                        instance.media.set(new Media(value.media.id))
                        instance.value.set(value.value)

                        context.commit('pushPersonality', instance)
                    })
                }
            })
        },
        export(context: any) {
            return {
                name: NAME,
                data: [
                    {
                        'personalities': context.state.personalities.map((value: Personality) => value.export())
                    }
                ]
            }
        }
    },
    getters: {
        getPersonalities: (state: any) => {
            return state.personalities
        },
        getPersonality: (state: any) => (id: string): Personality => {
            return state.personalities.find((item: Personality) => item.getUuid() === id)
        }
    }
}

export default scheme