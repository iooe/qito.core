import Switcher from "../../../Entities/Databases/Blueprint/Nodes/Switcher/Switcher";
import Expression from "../../../Entities/Basic/Objects/Expression";
import Case from "../../../Entities/Databases/Blueprint/Nodes/Switcher/Case/Case";
import Statement from "../../../Entities/Databases/Blueprint/Nodes/Switcher/Case/Statement";
import Item from "../../../Entities/Databases/Actors/Item/Item";

export const NAME = 'blueprint.nodes.switchers'

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
        add(context: any, value: Switcher) {
            if (context.getters.first(value.uuid.get()) !== undefined) {
                return false
            }

            context.state.data.push(value)

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Switcher) => value.uuid.get() === uuid);

            if (index === -1) {
                return false
            }

            context.state.data.splice(index, 1)

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<Switcher> = []

            data.map(switcherRaw => {
                const switcherInstance = new Switcher(switcherRaw.uuid)

                switcherRaw.data.forEach((caseRaw: any) => {
                    const caseInstance = new Case(caseRaw.uuid)

                    caseRaw.data.forEach((statementRaw: any) => {
                        const expression = new Expression()
                        expression.operator.set(statementRaw.expression.operator)
                        expression.value.set(statementRaw.expression.value)

                        const statementInstance = new Statement(statementRaw.uuid)

                        statementInstance.expression.set(expression)
                        statementInstance.component.setEntity(statementRaw.component.entity)
                        statementInstance.component.setUuid(statementRaw.component.uuid)

                        caseInstance.statements.add(statementInstance)

                    })

                    switcherInstance.cases.add(caseInstance)
                })

                values.push(switcherInstance)
            })

            context.state.data = values
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((item: Switcher) => item.export())
            }
        }
    },
    getters: {
        get: (state: any) => {
            return state.data
        },
        has: (state: any) => (uuid: string) => {
            return state.data.find((value: Switcher) => value.uuid.get() === uuid) !== undefined;
        },
        first: (state: any) => (uuid: string = ''): Switcher | undefined => {
            if (state.data.length === 0) {
                return undefined
            }

            if (uuid.length === 0) {
                return state.data[0]
            }

            return state.data.find((value: Switcher) => value.uuid.get() === uuid);
        }
    }
}

export default scheme