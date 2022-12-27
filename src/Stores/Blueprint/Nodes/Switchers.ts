import Switcher from '../../../Models/Blueprint/Nodes/Switcher/Switcher';
import Rule from '../../../Structures/Expression/Rule';
import Case from '../../../Models/Blueprint/Nodes/Switcher/Case';
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
        add(context: any, value: Switcher) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false;
            }

            context.state.data.push(value);

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Switcher) => value.uuid.get() === uuid);

            if (index === -1) {
                return false;
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<Switcher> = [];

            data.map(switcherRaw => {
                const switcherInstance = new Switcher(switcherRaw.uuid);

                switcherRaw.data.forEach((caseRaw: any) => {
                    const caseInstance = new Case(caseRaw.uuid);

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
                data: context.state.data.map((item: Switcher) => item.export()),
            };
        },
    },
    getters: {
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: Switcher) => value.uuid.get() === uuid) !== undefined;
        },
        first: (state: any) => (uuid: string = ''): Switcher | undefined => {
            if (state.data.length === 0) {
                return undefined;
            }

            if (uuid.length === 0) {
                return state.data[0];
            }

            return state.data.find((value: Switcher) => value.uuid.get() === uuid);
        },
    },
};

export default scheme;