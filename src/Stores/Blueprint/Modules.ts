import Module from '../../Models/Blueprint/Module/Module';
import Connection from '../../Models/Blueprint/Module/Connection';
import BaseNode from '../../Models/Blueprint/Module/Node/BaseNode';

export const NAME = 'blueprint.modules';

const touch = (state: any) => {
    const length = state.data.length;

    state.data.push(state.data[length - 1]);
    state.data.splice(length, 1);
};

export const scheme: any = {
    namespaced: true,
    state: () => ({
        data: Array<Module>(),
        hash: {},
    }),
    mutations: {},
    actions: {
        editModule(context: any, value: Module) {
            /* store.dispatch('blueprint.modules/editModule', {
                       uuid: variables.modelInstance.uuid.get(),
                       params: {
                           title: newtitle,
                       },
                   });*/

            const index = context.getters.getModuleIndex(value.uuid.get());

            if (index === -1) {
                throw false;
            }

            context.state.data.splice(index, 1, value);

            touch(context.state);

            return true;
        },
        addModule(context: any, segment: Module) {
            context.state.data.push(segment);

            segment.nodes.get().forEach((part: BaseNode) => context.state.hash[part.uuid.get()] = segment.uuid.get());
        },
        addNode(context: any, {moduleUuid, node}: any) {
            const module: Module = context.getters.getModule(moduleUuid);

            if (module === undefined) {
                return false;
            }

            module.nodes.add(node);
            context.state.hash[node.uuid.get()] = module.uuid.get();

            touch(context.state);

            return true;
        },
        import(context: any, data: Array<any>) {
            context.state.data = [];
            context.state.hash = [];

            const nodeImporter = (nodeRaw: any) => {
                const nodeInstance = new BaseNode(nodeRaw.uuid);

                nodeInstance.data.set(nodeRaw.data.component, nodeRaw.data.uuid);
                nodeInstance.title.set(nodeRaw.metadata.title);

                if (nodeRaw.metadata.isOutputNode === true) {
                    nodeInstance.metadata.setAsOutputNode();
                }

                nodeRaw.nodes.forEach((nodeSubRaw: never) => nodeInstance.nodes.add(nodeImporter(nodeSubRaw)));

                // eslint-disable-next-line no-prototype-builtins
                if (nodeRaw.hasOwnProperty('connection') && nodeRaw.connection !== null && Object.keys(nodeRaw.connection).length > 0) {
                    nodeInstance.connection.set(new Connection(nodeRaw.connection.uuid));
                }

                nodeInstance.metadata.setKeywords(nodeRaw.metadata.keywords);

                return nodeInstance;
            };

            data.forEach(moduleRaw => {
                const moduleInstance = new Module(moduleRaw.uuid);
                moduleRaw.nodes.forEach((node: any) => moduleInstance.nodes.add(nodeImporter(node)));
                moduleInstance.title.set(moduleRaw.metadata.title);
                moduleInstance.description.set(moduleRaw.metadata.description);

                moduleInstance.setInputUuid(moduleRaw.data.inputUuid);
                moduleInstance.setOutputUuid(moduleRaw.data.outputUuid);

                context.dispatch('addModule', moduleInstance);
            });
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: Module) => value.export()),
            };
        },
    },
    getters: {
        getNode: (state: any) => (uuid: string) => {
            const segmentUuid = state.hash[uuid];

            if (!segmentUuid) {
                return undefined;
            }

            return state.data
                .find((segment: Module) => segment.uuid.get() === segmentUuid)
                .nodes.first(uuid);
        },
        getModuleByPartUuid: (state: any) => (uuid: string) => {
            const segmentUuid = state.hash[uuid];

            if (!segmentUuid) {
                return undefined;
            }

            return state.data
                .find((segment: Module) => segment.uuid.get() === segmentUuid);
        },
        getModule: (state: any) => (uuid: any): Module => {
            return state.data.find((segment: Module) => segment.uuid.get() === uuid);
        },
        getModuleIndex: (state: any) => (uuid: any): Module => {
            return state.data.findIndex((segment: Module) => segment.uuid.get() === uuid);
        },
        getModules: (state: any) => {
            return state.data;
        },
    },
};

export default scheme;