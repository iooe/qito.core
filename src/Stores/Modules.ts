import Module from "../Entities/Databases/Module/Module";
import Part from "../Entities/Databases/Module/Part/Part";
import Title from "../Entities/Basic/Objects/Title";
import Connection from "../Entities/Databases/Module/Connection";
import PageCallback from "../Entities/Databases/Module/Part/Callback/Callback";
import Page from "../Entities/Basic/Objects/Page";

export const NAME = 'segments'

const touch = (state: any) => {
    const length = state.segments.length;

    state.segments.push(state.segments[length - 1])
    state.segments.splice(length, 1)
}

export const scheme: any = {
    namespaced: true,
    state: () => ({
        segments: Array<Module>(),
        hash: {}
    }),
    mutations: {},
    actions: {
        editSegment(context: any, updatedSegment: Module) {
            const segment: Module = context.getters.getSegment(updatedSegment.getUuid());

            if (segment === undefined) {
                return false
            }

            segment.title.set(updatedSegment.title.get())
        },
        addSegment(context: any, segment: Module) {
            context.state.segments.push(segment)

            segment.parts.get().forEach((part: Part) => context.state.hash[part.getUuid()] = segment.getUuid())
        },
        addPart(context: any, {segmentUuid, part}: any) {
            const segment: Module = context.getters.getSegment(segmentUuid);

            if (segment === undefined) {
                return false
            }

            segment.parts.push(part)
            context.state.hash[part.getUuid()] = segment.getUuid()

            touch(context.state)

            return true;
        },
        editPart(context: any, {segmentUuid, part}: any) {
            const segment: Module = context.getters.getSegment(segmentUuid);

            if (segment === undefined) {
                return false
            }

            segment.parts.update(part)

            touch(context.state)
        },
        import(context: any, data: Array<any>) {
            context.state.segments = []
            context.state.hash = []

            data.forEach((segmentRaw, key) => {

                const parts = segmentRaw.parts

                const segmentInstance = new Module(segmentRaw.uuid)
                segmentInstance.title.set(new Title(segmentRaw.title.value, segmentRaw.title.slug))

                parts.forEach((part: any) => {

                    const partInstance = new Part(part.uuid)
                    partInstance.title.set(new Title(part.title.value, part.title.slug))

                    if (part.connection !== null) {
                        partInstance.connection.set(new Connection(part.connection.component, part.connection.uuid))
                    }

                    Object.entries(part.callbacks).forEach((callbackValue: any) => {

                        const callbackKey = callbackValue[0]

                        callbackValue[1].forEach(((value: any) => {

                            const callbackInstance = new PageCallback()
                            callbackInstance.type.set(value.type)
                            callbackInstance.config.set(value)

                            if (value.type === 'narrative') {
                                callbackInstance.callback.set((store: any) => store.commit('narrative/pushQueue', value.id))
                            }

                            partInstance.callbacks.push(callbackKey, callbackInstance)
                        }))
                    })

                    part.pages.forEach((page: any) => {
                        const pageInstance = new Page(page.uuid)
                        pageInstance.setBlocks(page.blocks)
                        partInstance.pages.push(pageInstance)
                    })

                    segmentInstance.parts.push(partInstance)
                })

                context.dispatch('addSegment', segmentInstance)
            })
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.segments.map((value: Module) => value.export())
            }
        }
    },
    getters: {
        getPart: (state: any) => (uuid: string) => {
            const segmentUuid = state.hash[uuid]

            if (!segmentUuid) {
                return undefined
            }

            return state.segments
                .find((segment: Module) => segment.getUuid() === segmentUuid)
                .parts.first(uuid)
        },
        getSegmentByPartUuid: (state: any) => (uuid: string) => {
            const segmentUuid = state.hash[uuid]

            if (!segmentUuid) {
                return undefined
            }

            return state.segments
                .find((segment: Module) => segment.getUuid() === segmentUuid)
        },
        getSegment: (state: any) => (uuid: any): Module => {
            return state.segments.find((segment: Module) => segment.getUuid() === uuid)
        },
        getSegments: (state: any) => {
            return state.segments
        }
    },
}

export default scheme