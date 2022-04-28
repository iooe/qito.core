import Narrative from "../Entities/Databases/Narrative/Narrative";
import Page from "../Entities/Basic/Objects/Page";
import Fact from "hanzo.core/src/Entities/Databases/Fact/Fact";

export const NAME = 'narrative'

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