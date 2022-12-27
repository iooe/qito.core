import TextNode from '../../../Models/Blueprint/Nodes/TextNode/TextNode';
import InteractableContainer from '../../../Structures/InteractableContent/InteractableContainer';
import InteractableContent from '../../../Structures/InteractableContent/InteractableContent';

export const NAME = 'blueprint.nodes.texts';

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1]);
    state.data.splice(length, 1);
};

export const scheme = {
    namespaced: true,
    state: () => ({
        data: Array<any>(),
    }),
    actions: {
        add(context: any, value: TextNode) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false;
            }

            context.state.data.push(value);

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: TextNode) => value.uuid.get() === uuid);

            if (index === -1) {
                return false;
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<TextNode> = [];

            data.forEach((partRaw: any) => {
                const partInstance = new TextNode(partRaw.uuid);
                partInstance.title.set(partRaw.title);

                partRaw.pages.forEach((page: any) => {
                    const pageInstance = new InteractableContainer(page.uuid);

                    page.blocks.forEach(blockRaw => {
                        pageInstance.blocks.add(new InteractableContent(blockRaw.uuid, blockRaw.type, blockRaw.data));
                    });

                    partInstance.pages.add(pageInstance);
                });

                values.push(partInstance);
            });

            context.state.data = values;
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((item: TextNode) => item.export()),
            };
        },
    },
    getters: {
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: TextNode) => value.uuid.get() === uuid) !== undefined;
        },
        first: (state: any) => (uuid: string = ''): TextNode | undefined => {
            if (state.data.length === 0) {
                return undefined;
            }

            if (uuid.length === 0) {
                return state.data[0];
            }

            return state.data.find((value: TextNode) => value.uuid.get() === uuid);
        },
    },
};

export default scheme;