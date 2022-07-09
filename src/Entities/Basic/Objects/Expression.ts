export const constants = {
    OPERATORS: {
        Equal: '=',
        NotEqual: '!=',
        GreaterThanOrEqualTo: '>=',
        LessThanOrEqualTo: '<='
    }
} as const;

const TYPES = {
    string: 'string',
    boolean: 'boolean',
    number: 'number'
}

export default class Expression {
    private _operator: string = constants.OPERATORS.Equal
    private _value: string | number | boolean = 0

    public export() {
        return {
            operator: this._operator,
            value: this._value,
        }
    }

    public operator = {
        set: (operator: string) => {
            // @ts-ignore
            if (!Object.entries(constants.OPERATORS).map(value => value[1]).includes(operator)) {
                throw Error('Unexpected operator')
            }

            this._operator = operator
        },
        get: () => this._operator
    }

    public value = {
        set: (value: string | number | boolean) => {
            this._value = value
        },
        get: () => this._value
    }

    public compare(comparableValue: string | number | boolean): boolean {
        if (typeof this._value === TYPES.string && typeof comparableValue === TYPES.string) {
            if (this._operator === constants.OPERATORS.Equal) {
                return this._value === comparableValue
            }

            if (this._operator === constants.OPERATORS.NotEqual) {
                return this._value !== comparableValue
            }
        }

        if (typeof this._value === TYPES.number && typeof comparableValue === TYPES.number) {
            if (this._operator === constants.OPERATORS.Equal) {
                return this._value === comparableValue
            }

            if (this._operator === constants.OPERATORS.NotEqual) {
                return this._value !== comparableValue
            }

            if (this._operator === constants.OPERATORS.GreaterThanOrEqualTo) {
                return this._value >= comparableValue
            }

            if (this._operator === constants.OPERATORS.LessThanOrEqualTo) {
                return this._value <= comparableValue
            }
        }

        if (typeof this._value === TYPES.boolean && typeof comparableValue === TYPES.boolean) {
            if (this._operator === constants.OPERATORS.Equal) {
                return this._value === comparableValue
            }

            if (this._operator === constants.OPERATORS.NotEqual) {
                return this._value != comparableValue
            }
        }

        return false
    }
}