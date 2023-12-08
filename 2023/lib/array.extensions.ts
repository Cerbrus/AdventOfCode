declare global {
    interface Array<T> {
        /**
         * Group items by key.
         * @param {TKey} keyProperty The property to group by.
         * @template T The type of the items in the array.
         * @template TKey The type of the key to group by.
         * @returns {Record<TKey, Array<T>>} The grouped items.
         */
        groupBy<TKey extends keyof T>(keyProperty: TKey): Record<TKey, Array<T>>;

        /**
         * Sum the values of an array.
         * @param {(item: TValue) => number} selector The selector to get the value to sum.
         * @template TValue The type of the items in the array.
         * @returns {number} The sum of all selected values.
         */
        sum(selector: (item: T) => number): number;

        /**
         * Multiply the values of an array.
         * @param {(item: TValue) => number} selector The selector to get the value to multiply.
         * @template TValue The type of the items in the array.
         * @returns {number} The product of all selected values.
         */
        product(selector: (item: T) => number): number;

        /**
         * Count the number of occurrences of each item in an array.
         * @template TValue The type of the items in the array.
         * @returns {Record<TValue, number>} The number of occurrences of each item.
         */
        count<TKey extends keyof any>(selector: (item: T) => TKey): Record<TKey, number>;

        /**
         * Sort an array by a selector.
         * @param {(item: TValue) => number} selector The selector to get the value to sort by.
         * @template TValue The type of the items in the array.
         * @returns {Array<TValue>} The sorted array.
         */
        sortOn<TValue>(selector: (item: TValue) => number): Array<TValue>;
    }
}

Array.prototype.groupBy ??= function <T, TKey extends keyof T>(keyProperty: TKey): Record<TKey, Array<T>> {
    return this.reduce((result: Record<TKey, Array<T>>, item: T) => {
        const key = String(item[keyProperty]);
        result[key] ||= [];
        result[key].push(item);
        return result;
    }, {} as Record<TKey, Array<T>>);
};

Array.prototype.sum ??= function <TValue>(selector: (item: TValue) => number): number {
    return this.reduce((sum: number, item: TValue) => sum + selector(item), 0);
};

Array.prototype.product ??= function <TValue>(selector: (item: TValue) => number): number {
    return this.reduce((product: number, item: TValue) => product * selector(item), 1);
};

Array.prototype.count ??= function <T, TKey extends keyof any>(selector: (item: T) => TKey): Record<TKey, number> {
    return this.reduce((acc: Record<TKey, number>, value: T) => {
        const key = selector(value);
        return ({ ...acc, [key]: (acc[key] ?? 0) + 1 });
    }, {} as Record<TKey, number>);
};

Array.prototype.sortOn ??= function <TValue>(selector: (item: TValue) => number): Array<TValue> {
    return this.sort((a: TValue, b: TValue) => selector(a) - selector(b));
};

export {};
