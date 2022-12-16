import Dataset from "./Dataset";
import Country from "./Country";

type CountryCode = string

export default interface DatasetInfo extends Dataset {
    availableRecords: {
        [key: CountryCode]: number
    }
    includedCountries: Country[]
}