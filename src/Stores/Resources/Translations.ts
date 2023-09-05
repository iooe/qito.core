import TranslationResource from '../../Models/Resources/TranslationResource/TranslationResource';
import TranslationValue from '../../Models/Resources/TranslationResource/TranslationValue';

export const NAME = 'resources.translations';

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1]);
    state.data.splice(length, 1);
};

export const scheme = {
    namespaced: true,
    state: () => ({
        data: Array<TranslationResource>(),
    }),
    mutations: {
        set(state: any, values: Array<TranslationResource>) {
            state.data = values;
        },
    },
    actions: {
        add(context: any, value: TranslationResource) {
            if (context.getters.first(value.lang.get()) !== undefined) {
                return false;
            }

            context.state.data.push(value);

            return true;
        },
        edit(context: any, value: TranslationResource) {
            const index = context.state.data.find((value: TranslationResource) => value.lang.get() === value.lang.get());

            if (index === -1) {
                throw false;
            }

            context.state.data[index] = value;

            touch(context.state);

            return true;
        },
        remove(context: any, lang: string) {
            const index = context.state.data.findIndex((value: TranslationResource) => value.lang.get() === lang);

            if (index === -1) {
                return false;
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            const values: Array<TranslationResource> = [];

            data.forEach(value => {
                const resourceInstance = new TranslationResource(value.lang);

                value.data.forEach(transitionValue => {
                    const translationValueInstance = new TranslationValue(transitionValue.key, transitionValue.type, transitionValue.value);

                    resourceInstance.values.add(translationValueInstance);
                });

                values.push(resourceInstance);
            });

            context.commit('set', values);
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: TranslationResource) => value.export()),
            };
        },
    },
    getters: {
        first: (state: any) => (lang: string): TranslationResource => {
            return state.data.find((value: TranslationResource) => value.lang.get() === lang);
        },
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (lang: string): boolean => {
            return state.data.find((value: TranslationResource) => value.lang.get() === lang) !== undefined;
        },
    },
};

export default scheme;