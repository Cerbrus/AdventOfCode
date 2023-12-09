export interface IDifference {
    values: Array<number>,
    differences?: IDifference
    parent?: IDifference
}