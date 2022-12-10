import VariantRulesContainer from "./VariantRulesContainer";
import {v4 as uuidv4} from 'uuid';
import Rule from "../../../../../Structures/Expression/Rule";
import ActorDto from "../../../../../Dto/ActorDto";
import Commit from "../../../../../Structures/Expression/Commit";
import VariantCommit from "./VariantCommit";
import VariantCommitsContainer from "./VariantCommitsContainer";

export default class Variant {
    private _commits: VariantCommitsContainer
    private _rules: Array<VariantRulesContainer> = []
    private _name: string = '';
    private readonly _uuid: string

    constructor(uuid: string) {
        this._uuid = uuid
    }

    public static create() {
        return new Variant(uuidv4())
    }

    public name = {
        set: (value: string) => {
            this._name = value
        },

        get: () => {
            return this._name
        }
    }

    public uuid = {
        get: (): string => this._uuid
    }

    public commits = {
        add: (value: VariantCommit) => {
            return this._commits.values.add(value)
        },
        first: (uuid: string = ''): VariantCommit | undefined => {
            return this._commits.values.first(uuid);
        },
        get: (): Array<VariantCommit> => {
            return this._commits
        },
        delete: (uuid: string) => {
            this._commits.values.delete(uuid)
        }
    }

    public rules = {
        add: (value: VariantRulesContainer) => {
            return this._rules.push(value)
        },
        first: (uuid: string = ''): VariantRulesContainer | undefined => {
            if (this._rules.length === 0) {
                return undefined
            }

            if (uuid.length === 0) {
                return this._rules[0]
            }

            return this._rules.find((value: VariantRulesContainer) => value.uuid.get() === uuid);
        },
        edit: (newValue: VariantRulesContainer) => {
            const index = this._rules.findIndex((value: VariantRulesContainer) => value.uuid.get() === newValue.uuid.get())

            if (index === -1) {
                return
            }

            this._rules[index] = newValue
        },
        get: (): Array<VariantRulesContainer> => {
            return this._rules
        },
        delete: (uuid: string) => {
            const index = this._rules.findIndex((value: VariantRulesContainer) => value.uuid.get() === uuid)

            if (index === -1) {
                return
            }

            this._rules.splice(index, 1)
        }
    }

    public export() {
        return {
            uuid: this._uuid,
            name: this._name,
            rules: this._rules.map((value: VariantRulesContainer) => value.export()),
            commits: this._commits.export()
        }
    }

    public import(content: Object) {
        // @ts-ignore
        content.rules.forEach(container => {
            const containerInstance = new VariantRulesContainer(container.uuid)

            container.data.forEach((expressionRawData: any) => {
                const expression = new Rule()
                expression.operator.set(expressionRawData.expression.operator)
                expression.value.set(expressionRawData.expression.value)

                const statementInstance = new ActorDto(expressionRawData.uuid)

                statementInstance.expression.set(expression)
                statementInstance.component.setEntity(expressionRawData.component.entity)
                statementInstance.component.setUuid(expressionRawData.component.uuid)

                containerInstance.values.add(statementInstance)
            })

            this._rules.push(containerInstance)
        })

        // @ts-ignore
        const commitsContainer = new VariantCommitsContainer(content.commits.uuid)

        // @ts-ignore
        content.commits.data.forEach(expressionRawData => {
            const expression = new Commit()
            expression.value.set(expressionRawData.expression.value)

            const statementInstance = new ActorDto(expressionRawData.uuid)

            statementInstance.expression.set(expression)
            statementInstance.component.setEntity(expressionRawData.component.entity)
            statementInstance.component.setUuid(expressionRawData.component.uuid)

            commitsContainer.values.add(statementInstance)
        })

        this._commits = commitsContainer
    }
}