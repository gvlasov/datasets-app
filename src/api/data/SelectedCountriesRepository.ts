import Country from "./Country";
import {reactive} from "@vue/reactivity";
import DatasetInfo from "./DatasetInfo";

export default class SelectedCountryNamesRepository {
    protected static key: string = 'selected-countries'

    protected countries: Country[] = reactive([])

    constructor(initial: Country[]) {
        this.selectCountries(initial)
    }

    getSelectedCountries(): Country[] {
        return this.countries
    }

    selectCountries(countries: Country[]): void {
        this.countries.splice(0, this.countries.length, ...countries)
    }

    isSelected(country: Country): boolean {
        return this.countries.filter(selected => selected.name === country.name).length > 0
    }

    /**
     * @param country Whether repository now contains this country
     */
    toggle(country: Country): boolean {
        let result
        if (this.isSelected(country)) {
            this.countries.splice(
                this.countries.indexOf(country),
                1
            )
            result = false
        } else {
            this.countries.push(country)
            result = true
        }
        return result
    }

    /**
     * @return boolean True if dataset has a selected country
     */
    filterDataset(datasetInfo: DatasetInfo): boolean {
        for (const country of this.countries) {
            for (const countryCode of Object.keys(datasetInfo.availableRecords)) {
                if (country.countryCode === countryCode) {
                    return true
                }
            }
        }
        return false
    }

    isCountrySelectedByCountryCode(countryCode: string): boolean {
        return this.countries.some(c => c.countryCode === countryCode)
    }
}