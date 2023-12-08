declare global {
    interface Math {
        /**
         * Least common multiple
         * @param {number} a
         * @param {number} b
         * @returns {number}
         */
        lcm(a: number, b: number): number;

        /**
         * Greatest common divisor
         * @param {number} a
         * @param {number} b
         * @returns {number}
         */
        gcd(a: number, b: number): number;
    }
}
export {};

Math.lcm ??= function (a: number, b: number): number {
    return (a * b) / Math.gcd(a, b);
};

Math.gcd ??= function (a: number, b: number): number {
    return b == 0 ? a : Math.gcd(b, a % b);
};