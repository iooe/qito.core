import PersonalityRequirement from "./Requirements/PersonalityRequirement";
import ItemRequirement from "./Requirements/ItemRequirement";
import RelationshipRequirement from "./Requirements/RelationshipRequirement";
import PersonalityVariantResult from "./Result/PersonalityVariantResult";
import FactVariantResult from "./Result/FactVariantResult";
import RelationshipVariantResult from "./Result/RelationshipVariantResult";
import IVariantResult from "./Result/IVariantResult";
import ItemVariantResult from "./Result/ItemVariantResult";
import RequirementsBlock from "./RequirementsBlock";
import FactRequirement from "./Requirements/FactRequirement";
import PageVariantResult from "./Result/PageVariantResult";
import NarrativeVariantResult from "./Result/NarrativeVariantResult";

export default class Variant {
    private result: Array<IVariantResult> = []
    private requirements: Array<RequirementsBlock> = []

    private readonly name: string;

    private readonly RESULT_PROCESS = {
        personality: (uuid: string, data: object) => {
            //@ts-ignore
            return new PersonalityVariantResult(uuid, data.action, data.value)
        },
        fact: (uuid: string) => {
            return new FactVariantResult(uuid)
        },
        page: (uuid: string) => {
            return new PageVariantResult(uuid)
        },
        narrative: (uuid: string) => {
            return new NarrativeVariantResult(uuid)
        },
        item: (uuid: string, data: object) => {
            //@ts-ignore
            return new ItemVariantResult(uuid, data.action)
        },
        relationship: (uuid: string, data: object) => {
            //@ts-ignore
            return (new RelationshipVariantResult(uuid, data.action, data.value))
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
        this.name = content.name

        // @ts-ignore
        content.requirements.forEach(block => {
            const requirementsBlock = new RequirementsBlock()
            // @ts-ignore
            block.forEach(data => {
                // @ts-ignore
                requirementsBlock.push(this.REQUIREMENT_PROCESS[data.type](data.uuid, data))
            })

            this.requirements.push(requirementsBlock)
        })

        // @ts-ignore
        content.result.forEach(data => {
            // @ts-ignore
            this.result.push(this.RESULT_PROCESS[data.type](data.uuid, data))
        })
    }

    public getRequirements(): Array<RequirementsBlock> {
        return this.requirements
    }

    public getResult(): Array<IVariantResult> {
        return this.result
    }

    public getName(): string {
        return this.name
    }
}