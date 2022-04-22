import PersonalityRequirement from "../Requirements/Foundataion/PersonalityRequirement";
import ItemRequirement from "../Requirements/Foundataion/ItemRequirement";
import RelationshipRequirement from "../Requirements/Foundataion/RelationshipRequirement";
import PersonalityResult from "../Results/Foundation/PersonalityResult";
import FactResult from "../Results/Foundation/FactResult";
import RelationshipResult from "../Results/Foundation/RelationshipResult";
import ResultContract from "../Results/ResultContract";
import ItemResult from "../Results/Foundation/ItemResult";
import RequirementsContainer from "../Requirements/RequirementsContainer";
import FactRequirement from "../Requirements/Foundataion/FactRequirement";
import PageResult from "../Results/Foundation/PageResult";
import NarrativeResult from "../Results/Foundation/NarrativeResult";

export default class Variant {
    private _result: Array<ResultContract> = []
    private _requirements: Array<RequirementsContainer> = []

    private _name: string;

    private readonly RESULT_PROCESS = {
        personality: (uuid: string, data: object) => {
            //@ts-ignore
            return new PersonalityResult(uuid, data.action, data.value)
        },
        fact: (uuid: string) => {
            return new FactResult(uuid)
        },
        page: (uuid: string) => {
            return new PageResult(uuid)
        },
        narrative: (uuid: string) => {
            return new NarrativeResult(uuid)
        },
        item: (uuid: string, data: object) => {
            //@ts-ignore
            return new ItemResult(uuid, data.action)
        },
        relationship: (uuid: string, data: object) => {
            //@ts-ignore
            return (new RelationshipResult(uuid, data.action, data.value))
        }
    }

    private readonly REQUIREMENT_PROCESS = {
        personality: (uuid: string, data: object) => {
            //@ts-ignore
            return new PersonalityRequirement(uuid, data.operator, data.value)
        },
        item: (uuid: string) => {
            return new ItemRequirement(uuid)
        },
        fact: (uuid: string, data: object) => {
            //@ts-ignore
            return new FactRequirement(uuid, data.operator)
        },
        relationship: (uuid: string, data: object) => {
            //@ts-ignore
            return new RelationshipRequirement(uuid, data.operator, data.value)
        }
    }

    constructor(content: Object) {
        // @ts-ignore
        this._name = content.name

        // @ts-ignore
        content.requirements.forEach(block => {
            const requirementsBlock = new RequirementsContainer(block.uuid)
            // @ts-ignore
            block.data.forEach(data => {
                // @ts-ignore
                requirementsBlock.values.add(this.REQUIREMENT_PROCESS[data.type](data.uuid, data))
            })

            this._requirements.push(requirementsBlock)
        })

        // @ts-ignore
        content.result.forEach(data => {
            // @ts-ignore
            this._result.push(this.RESULT_PROCESS[data.type](data.uuid, data))
        })
    }

    public name = {
        set: (value: string) => {
            this._name = value
        },

        get: () => {
            return this._name
        }
    }

    public getRequirement(): Array<RequirementsContainer> {
        return this._requirements
    }

    public getResult(): Array<ResultContract> {
        return this._result
    }

    public export() {
        return {
            name: this._name,
            requirements: this._requirements.map((value: RequirementsContainer) => value.export()),
            result: this._result.map((value: ResultContract) => value.export()),
        }
    }
}