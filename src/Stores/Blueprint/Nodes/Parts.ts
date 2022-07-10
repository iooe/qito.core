import Part from "../../Entities/Databases/Part/Part";
import Page from "../../Entities/Basic/Objects/Page";

export const NAME = 'nodes.parts'

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1])
    state.data.splice(length, 1)
}

export const scheme = {
    namespaced: true,
    state: () => ({
        data: Array<any>(),
    }),
    actions: {
        add(context: any, value: Part) {
            if (context.getters.first(value.getUuid()) !== undefined) {
                return false
            }

            context.state.data.push(value)

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Part) => value.getUuid() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<Part> = []

            data.forEach((partRaw: any) => {
                const partInstance = new Part(partRaw.uuid)
                partInstance.title.set(partRaw.title)

                partRaw.pages.forEach((page: any) => {
                    const pageInstance = new Page(page.uuid)
                    pageInstance.setBlocks(page.blocks)
                    partInstance.pages.push(pageInstance)
                })

                values.push(partInstance)
            })

            context.state.data = values
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((item: Part) => item.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        },
        first: (state: any) => (uuid: string = ''): Part | undefined => {
            if (state.data.length === 0) {
                return undefined
            }

            if (uuid.length === 0) {
                return state.data[0]
            }

            return state.data.find((item: Part) => item.getUuid() === uuid);
        }
    }
}

export default scheme