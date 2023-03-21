import SwitcherNode from '../../../Models/Blueprint/Nodes/SwitcherNode/SwitcherNode';
import Rule from '../../../Structures/Expression/Rule';
import SwitcherCase from '../../../Models/Blueprint/Nodes/SwitcherNode/SwitcherCase';
import ActorDto from '../../../Dto/ActorDto';

export const NAME = 'blueprint.nodes.switchers';

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
        edit(context: any, value: SwitcherNode) {
            const index = context.state.data.find((value: SwitcherNode) => value.uuid.get() === value.uuid.get());

            if (index === -1) {
                throw false;
            }

            context.state.data.splice(index, 1, value);

            touch(context.state);

            return true;
        },
        add(context: any, value: SwitcherNode) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false;
            }

            context.state.data.push(value);

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: SwitcherNode) => value.uuid.get() === uuid);

            if (index === -1) {
                return false;
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<SwitcherNode> = [];

            data.map(switcherRaw => {
                const switcherInstance = new SwitcherNode(switcherRaw.uuid);

                switcherInstance.title.set(switcherRaw.metadata.title);

                switcherRaw.data.forEach((caseRaw: any) => {
                    const caseInstance = new SwitcherCase(caseRaw.uuid);

                    caseRaw.data.forEach((statementRaw: any) => {
                        const expression = new Rule();
                        expression.operator.set(statementRaw.expression.operator);
                        expression.value.set(statementRaw.expression.value);

                        const statementInstance = new ActorDto(statementRaw.uuid);

                        statementInstance.expression.set(expression);
                        statementInstance.component.setEntity(statementRaw.component.entity);
                        statementInstance.component.setUuid(statementRaw.component.uuid);

                        caseInstance.values.add(statementInstance);
                    });

                    switcherInstance.containers.add(caseInstance);
                });

                values.push(switcherInstance);
            });

            context.state.data = values;
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((item: SwitcherNode) => item.export()),
            };
        },
    },
    getters: {
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: SwitcherNode) => value.uuid.get() === uuid) !== undefined;
        },
        first: (state: any) => (uuid: string = ''): SwitcherNode | undefined => {
            if (state.data.length === 0) {
                return undefined;
            }

            if (uuid.length === 0) {
                return state.data[0];
            }

            return state.data.find((value: SwitcherNode) => value.uuid.get() === uuid);
        },
    },
};

export default scheme;