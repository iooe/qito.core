import Personality from "../Entities/Databases/Protagonist/Personality";
import Media from "../Entities/Basic/Objects/Media";

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
        setPersonalities(state: any, items: Array<Personality>) {
            state.personalities = items
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
            const index = context.state.personalities.findIndex((value: Personality) => value.getUuid() === uuid);

            if (index === -1) {
                return false
            }

            context.state.personalities.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            context.personalities = []

            data.forEach(instance => {
                if (instance.key === 'personalities') {
                    const personalities = []

                    instance.data.forEach((value: any) => {
                        const personality = new Personality(value.uuid)
                        personality.name.set(value.name)
                        personality.media.set(new Media(value.media.id))
                        personality.value.set(value.value)
                        personalities.push(personality)
                    })

                    context.commit('setPersonalities', personalities)

                }
            })
        },
        export(context: any) {
            return {
                name: NAME,
                data: [
                    {
                        key: 'personalities',
                        data: context.state.personalities.map((value: Personality) => value.export())
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