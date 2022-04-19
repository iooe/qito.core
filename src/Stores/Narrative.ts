import Narrative from "../Entities/Databases/Narrative/Narrative";
import Page from "../Entities/Basic/Objects/Page";

export const NAME = 'narrative'
export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(state.data[length], 1)
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
                    const pageInstance = new Page()

                    pageInstance.setBlocks(page.blocks)
                    instance.pages.push(pageInstance)
                })

                values.push(instance)
            })

            context.state.data = values
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        }
    },
}

export default scheme;