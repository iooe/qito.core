import Segment from "../Entities/Databases/Timeline/Segment";
import Part from "../Entities/Databases/Timeline/Part/Part";
import Title from "../Entities/Basic/Objects/Title";
import Nav from "../Entities/Databases/Timeline/Meta/Nav";
import PageCallback from "../Entities/Databases/Timeline/Part/Callback/Callback";
import Page from "../Entities/Basic/Objects/Page";

export const NAME = 'timeline'

const touch = (state: any) => {
    const length = state.segments.length;

    state.segments.push(state.segments[length - 1])
    state.segments.splice(length, 1)
}

export const scheme: any = {
    namespaced: true,
    state: () => ({
        segments: Array<Segment>(),
        hash: {}
    }),
    mutations: {},
    actions: {
        editSegment(context: any, updatedSegment: Segment) {
            const segment: Segment = context.getters.getSegment(updatedSegment.getUuid());

            if (segment === undefined) {
                return false
            }

            segment.title.set(updatedSegment.title.get())
        },
        addSegment(context: any, segment: Segment) {
            context.state.segments.push(segment)

            segment.parts.get().forEach((part: Part) => context.state.hash[part.getUuid()] = segment.getUuid())
        },
        addPart(context: any, {segmentUuid, part}: any) {
            const segment: Segment = context.getters.getSegment(segmentUuid);

            if (segment === undefined) {
                return false
            }

            segment.parts.push(part)
            context.state.hash[part.getUuid()] = segment.getUuid()

            touch(context.state)

            return true;
        },
        editPart(context: any, {segmentUuid, part}: any) {
            const segment: Segment = context.getters.getSegment(segmentUuid);

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

                const segmentInstance = new Segment(segmentRaw.uuid)
                segmentInstance.title.set(new Title(segmentRaw.title.value, segmentRaw.title.slug))

                parts.forEach((part: any) => {

                    const partInstance = new Part(part.uuid)
                    partInstance.title.set(new Title(part.title.value, part.title.slug))
                    partInstance.nav.set(new Nav(part.nav.prev, part.nav.next))
                    partInstance.type.set(part.type)

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
                data: context.state.segments.map((value: Segment) => value.export())
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
                .find((segment: Segment) => segment.getUuid() === segmentUuid)
                .parts.first(uuid)
        },
        getSegmentByPartUuid: (state: any) => (uuid: string) => {
            const segmentUuid = state.hash[uuid]

            if (!segmentUuid) {
                return undefined
            }

            return state.segments
                .find((segment: Segment) => segment.getUuid() === segmentUuid)
        },
        getSegment: (state: any) => (uuid: any): Segment => {
            return state.segments.find((segment: Segment) => segment.getUuid() === uuid)
        },
        getSegments: (state: any) => {
            return state.segments
        }
    },
}

export default scheme