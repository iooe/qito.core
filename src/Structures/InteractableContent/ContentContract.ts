export default interface ContentContract {
    export(): object;

    getAttribute(key: string): string | number | object | boolean | CallableFunction | null;

    getAttributes(): { [key: string]: string | number | boolean | null | CallableFunction };
}