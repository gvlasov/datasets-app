import NarrativeIoApi from "../NarrativeIoApi";
import Dataset from "./Dataset";
import Country from "./Country";
import DatasetInfo from "./DatasetInfo";

export default class DatasetInfoRepository {
    protected api: NarrativeIoApi
    private datasets: Dataset[] = []
    private countries: Country[] = []

    constructor(api: NarrativeIoApi) {
        this.api = api
    }

    async refresh() {
        this.datasets = await this.api.getDatasets()
        this.countries = await this.api.getCountries()
    }

    getDatasetInfos(): DatasetInfo[] {
        return this.datasets.map(
            dataset => this.produceDatasetInfo(dataset)
        )
    }

    getCountries(): Country[] {
        return this.countries;
    }

    private produceDatasetInfo(dataset:  Dataset): DatasetInfo {
        const availableRecords: {[key: string]: number} = {}
        const includedCountries = []
        for (const country of this.countries) {
            let countryUsed = false
            for (const datum of country.storedData) {
                if (datum.datasetId === dataset.id) {
                    countryUsed = true
                    availableRecords[country.countryCode] = datum.recordCount
                }
            }
            if (countryUsed) {
                includedCountries.push(country)
            }
        }
        return {
            ...dataset,
            availableRecords,
            includedCountries
        }
    }

    protected getIncludedCountries(datasetId: number): number {
        let availableRecords = 0
        for (const country of this.countries) {
            for (const datum of country.storedData) {
                if (datum.datasetId === datasetId) {
                    availableRecords += datum.recordCount
                }
            }
        }
        return availableRecords
    }
}