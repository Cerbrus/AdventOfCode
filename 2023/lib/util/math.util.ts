export class MathUtil {
    /**
     * Least common multiple
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    public static lcm(a: number, b: number): number {
        return (a * b) / this.gcd(a, b);
    }

    /**
     * Greatest common divisor
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    public static gcd(a: number, b: number): number {
        return b == 0 ? a : this.gcd(b, a % b);
    }
}