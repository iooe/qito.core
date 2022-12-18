import Fact from '../../Models/Actors/Fact/Fact';
import Preview from '../../Models/Actors/Fact/Preview/Preview';

export const NAME = 'actors.facts';

export const touch = (state: any) => {
    const length = state.data.length;
    state.data.push(state.data[length - 1]);
    state.data.splice(length, 1);
};

export const scheme = {
    namespaced: true,
    state: () => ({
        data: Array<Fact>(),
    }),
    mutations: {
        set(state: any, items: Array<Fact>) {
            state.data = items;
        },
        open(state: any, uuid: string) {
            state.data.find((item: Fact) => item.uuid.get() === uuid).open();
        },
        hide(state: any, uuid: string) {
            state.data.find((item: Fact) => item.uuid.get() === uuid).hide();
        },
    },
    actions: {
        add(context: any, fact: Fact) {
            if (context.getters.first(fact.uuid.get()) !== undefined) {
                return false;
            }

            context.state.data.push(fact);

            return true;
        },
        edit(context: any, value: Fact) {
            const index = context.state.data.find((value: Fact) => value.uuid.get() === value.uuid.get());

            if (index === -1) {
                throw false;
            }

            context.state.data[index] = value;

            touch(context.state);

            return true;
        },
        remove(context: any, uuid: string) {
            const index = context.state.data.findIndex((value: Fact) => value.uuid.get() === uuid);

            if (index === -1) {
                return false;
            }

            context.state.data.splice(index, 1);

            return true;
        },
        import(context: any, data: Array<any>) {
            let values: Array<Fact> = [];

            data.forEach(value => {
                const instance = new Fact(value.uuid);

                instance.title.set(value.title);
                instance.preview.set(new Preview(value.preview.message));
                instance.state.set(value.state);

                values.push(instance);
            });

            context.commit('set', values);
        },
        export(context: any) {
            return {
                name: NAME,
                data: context.state.data.map((value: Fact) => value.export()),
            };
        },
    },
    getters: {
        first: (state: any) => (uuid: string): Fact => {
            return state.data.find((value: Fact) => value.uuid.get() === uuid);
        },
        get: (state: any) => {
            return state.data;
        },
        has: (state: any) => (uuid: string): boolean => {
            return state.data.find((value: Fact) => value.uuid.get() === uuid && value.state.get()) !== undefined;
        },
    },
};

export default scheme;