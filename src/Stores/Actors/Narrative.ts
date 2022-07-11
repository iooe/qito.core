import Narrative from "../../Entities/Databases/Actors/Narrative/Narrative";
import Page from "../../Entities/Basic/Objects/Page";
import Fact from "src/Entities/Databases/Actors/Fact/Fact";

export const NAME = 'actors.narrative'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

export const scheme: any = {
    namespaced: true,
    state: () => ({
        data: Array<Narrative>()
    }),
    mutations: {},
    actions: {
        add(context: any, value: Narrative) {
            if (context.getters.first(value.getUuid()) !== undefined) {
                return false
            }

            context.state.data.push(value)

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Narrative) => value.getUuid() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<Narrative> = [];

            data.forEach(part => {
                const instance = new Narrative(part.uuid)
                instance.title.set(part.title)
                instance.styles.set(part.style)

                part.pages.forEach((page: any) => {
                    const pageInstance = new Page(page.uuid)

                    pageInstance.setBlocks(page.blocks)
                    instance.pages.push(pageInstance)
                })

                values.push(instance)
            })

            context.state.data = values
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: Narrative) => value.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        },
        first: (state: any) => (uuid: string): Fact => {
            return state.data.find((value: Narrative) => value.getUuid() === uuid);
        },
        has: (state: any) => (uuid: string): boolean => {
            return state.data.find((value: Narrative) => value.getUuid() === uuid) !== undefined;
        }
    },
}

export default scheme;