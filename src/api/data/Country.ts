export default interface Country {
    countryCode: string
    name: string
    storedData: {
        datasetId: number
        recordCount: number
    }[]

}