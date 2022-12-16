export default interface BuyOrder {
    id?: number
    name: string
    createdAt: string
    datasetIds: number[]
    countries: string[]
    budget: number
}