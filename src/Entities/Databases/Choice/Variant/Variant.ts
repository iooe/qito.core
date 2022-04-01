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
        personality: (id: string, data: object) => {
            //@ts-ignore
            return new PersonalityVariantResult(id, data.action, data.value)
        },
        fact: (id: string) => {
            return new FactVariantResult(id)
        },
        page: (id: string) => {
            return new PageVariantResult(id)
        },
        narrative: (id: string) => {
            return new NarrativeVariantResult(id)
        },
        item: (id: string, data: object) => {
            //@ts-ignore
            return new ItemVariantResult(id, data.action)
        },
        relationship: (id: string, data: object) => {
            //@ts-ignore
            return (new RelationshipVariantResult(id, data.action, data.value))
        }
    }

    private readonly REQUIREMENT_PROCESS = {
        personality: (id: string, data: object) => {
            //@ts-ignore
            return new PersonalityRequirement(id, data.operator, data.value)
        },
        item: (id: string) => {
            return new ItemRequirement(id)
        },
        fact: (id: string, data: object) => {
            //@ts-ignore
            return new FactRequirement(id, data.operator)
        },
        relationship: (id: string, data: object) => {
            //@ts-ignore
            return new RelationshipRequirement(id, data.operator, data.value)
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
                requirementsBlock.push(this.REQUIREMENT_PROCESS[data.type](data.id, data))
            })

            this.requirements.push(requirementsBlock)
        })

        // @ts-ignore
        content.result.forEach(data => {
            // @ts-ignore
            this.result.push(this.RESULT_PROCESS[data.type](data.id, data))
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