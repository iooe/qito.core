import Choice from '../../../Models/Blueprint/Nodes/ChoiceNode/Choice';
import Variant from '../../../Models/Blueprint/Nodes/ChoiceNode/Variant';
import VariantRulesContainer from '../../../Models/Blueprint/Nodes/ChoiceNode/VariantRulesContainer';
import Rule from '../../../Structures/Expression/Rule';
import ActorDto from '../../../Dto/ActorDto';
import VariantCommitsContainer from '../../../Models/Blueprint/Nodes/ChoiceNode/VariantCommitsContainer';
import Commit from '../../../Structures/Expression/Commit';

export const NAME = 'blueprint.nodes.choices';

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
        edit(context: any, value: Choice) {
            const index = context.state.data.find((value: Choice) => value.uuid.get() === value.uuid.get());

            if (index === -1) {
                throw false;
            }

            context.state.data.splice(index, 1, value);

            touch(context.state);

            return true;
        },
        add(context: any, value: Choice) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false;
            }

            context.state.data.push(value);

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Choice) => value.uuid.get() === uuid);

            if (index === -1) {
                return false;
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<Choice> = [];


            const variantImporter = (variantInstance, variantRaw) => {
                variantRaw.rules.forEach(container => {
                    const containerInstance = new VariantRulesContainer(container.uuid);

                    container.data.forEach((expressionRawData: any) => {
                        const expression = new Rule();
                        expression.operator.set(expressionRawData.expression.operator);
                        expression.value.set(expressionRawData.expression.value);

                        const statementInstance = new ActorDto(expressionRawData.uuid);

                        statementInstance.expression.set(expression);
                        statementInstance.component.setEntity(expressionRawData.component.entity);
                        statementInstance.component.setUuid(expressionRawData.component.uuid);

                        containerInstance.values.add(statementInstance);
                    });

                    variantInstance.rules.add(containerInstance);
                });

                const commitsContainer = new VariantCommitsContainer(variantRaw.commits.uuid);

                variantRaw.commits.data.forEach(expressionRawData => {
                    const expression = new Commit();
                    expression.value.set(expressionRawData.expression.value);

                    const statementInstance = new ActorDto(expressionRawData.uuid);

                    statementInstance.expression.set(expression);
                    statementInstance.component.setEntity(expressionRawData.component.entity);
                    statementInstance.component.setUuid(expressionRawData.component.uuid);

                    commitsContainer.values.add(statementInstance);
                });

                variantInstance.commits.set(commitsContainer);

                return variantInstance;
            };

            data.map(value => {
                const instance = new Choice(value.uuid);

                instance.title.set(value.metadata.title);

                value.data.forEach((variantRaw: object) => {
                    let variantInstance = new Variant(variantRaw.uuid);
                    variantInstance.title.set(variantRaw.metadata.title);

                    variantInstance = variantImporter(variantInstance, variantRaw);

                    instance.containers.add(variantInstance);
                });


                values.push(instance);
            });

            context.state.data = values;
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((item: Choice) => item.export()),
            };
        },
    },
    getters: {
        get: (state: any) => {
            return state.data;
        },
        first: (state: any) => (uuid: string = ''): Choice | undefined => {
            if (state.data.length === 0) {
                return undefined;
            }

            if (uuid.length === 0) {
                return state.data[0];
            }

            return state.data.find((value: Choice) => value.uuid.get() === uuid);
        },
    },
};

export default scheme;