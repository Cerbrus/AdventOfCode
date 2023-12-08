export namespace Lib.Math {
    /**
     * Least common multiple
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    function _lcm(a: number, b: number): number {
        return (a * b) / gcd(a, b);
    }

    export const lcm = _lcm.bind(Math);

    /**
     * Greatest common divisor
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    function _gcd(a: number, b: number): number {
        return b == 0 ? a : this.gcd(b, a % b);
    }

    export const gcd = _gcd.bind(Math);
}