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
import {v4 as uuidv4} from 'uuid';

export default class Variant {
    private _result: Array<ResultContract> = []
    private _requirements: Array<RequirementsContainer> = []
    private _name: string = '';
    private _uuid: string

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

    public getUuid(): string {
        return this._uuid
    }

    public results = {
        add: (value: ResultContract) => {
            return this._result.push(value)
        },
        first: (uuid: string = ''): ResultContract | undefined => {
            if (this._result.length === 0) {
                return undefined
            }

            if (uuid.length === 0) {
                return this._result[0]
            }

            return this._result.find((value: ResultContract) => value.getUuid() === uuid);
        },
        get: (): Array<ResultContract> => {
            return this._result
        },
        delete: (uuid: string) => {
            const index = this._result.findIndex((value: ResultContract) => value.getUuid() === uuid)

            if (index === -1) {
                return
            }

            this._result.splice(index, 1)
        }
    }

    public requirements = {
        add: (value: RequirementsContainer) => {
            return this._requirements.push(value)
        },
        first: (uuid: string = ''): RequirementsContainer | undefined => {
            if (this._requirements.length === 0) {
                return undefined
            }

            if (uuid.length === 0) {
                return this._requirements[0]
            }

            return this._requirements.find((value: RequirementsContainer) => value.getUuid() === uuid);
        },
        edit: (newValue: RequirementsContainer) => {
            const index = this._requirements.findIndex((value: RequirementsContainer) => value.getUuid() === newValue.getUuid())

            if (index === -1) {
                return
            }

            this._requirements[index] = newValue
        },
        get: (): Array<RequirementsContainer> => {
            return this._requirements
        },
        delete: (uuid: string) => {
            const index = this._requirements.findIndex((value: RequirementsContainer) => value.getUuid() === uuid)

            if (index === -1) {
                return
            }

            this._requirements.splice(index, 1)
        }
    }

    public export() {
        return {
            name: this._name,
            requirements: this._requirements.map((value: RequirementsContainer) => value.export()),
            result: this._result.map((value: ResultContract) => value.export()),
        }
    }

    public import(content: Object) {
        // @ts-ignore
        content.requirements.forEach(container => {
            const containerInstance = new RequirementsContainer(container.uuid)
            container.data.forEach(data => {
                console.log(data)
                containerInstance.values.add(this.REQUIREMENT_PROCESS[data.type](data.uuid, data))
            })

            this._requirements.push(containerInstance)
        })

        // @ts-ignore
        content.result.forEach(data => {
            // @ts-ignore
            this._result.push(this.RESULT_PROCESS[data.type](data.uuid, data))
        })
    }
}