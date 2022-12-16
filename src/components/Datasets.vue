<template>
    <FilterText
            :countries="selectedCountriesRepo.getSelectedCountries()"
            :filteredItems="filteredItems"
    />
    <div class="items">
        <div
                v-for="datasetInfo in filteredItems"
                :key="datasetInfo.id"
        >
            <DatasetComponent
                    :datasetInfo="datasetInfo"
                    :selectedCountries="selectedCountriesRepo.getSelectedCountries()"
            />
        </div>
    </div>
    <CountryFilterInput :repo="selectedCountriesRepo" :allCountries="allCountries"/>
</template>

<script setup lang="ts">
import DatasetInfo from "../api/data/DatasetInfo";
import Country from "../api/data/Country";
import DatasetComponent from "./Dataset.vue";
import SelectedCountryNamesRepository
    from "../api/data/SelectedCountriesRepository";
import {computed} from "@vue/reactivity";
import FilterText from "./FilterText.vue";
import CountryFilterInput from "./CountryFilterInput.vue";

const components = [DatasetComponent, FilterText, CountryFilterInput]
const props = defineProps<{ datasetInfos: DatasetInfo[], allCountries: Country[] }>()
const datasetInfos = props.datasetInfos
const allCountries = props.allCountries
const selectedCountriesRepo = new SelectedCountryNamesRepository(allCountries)
const filteredItems = computed(
    (): DatasetInfo[] => {
        return datasetInfos.filter(info => selectedCountriesRepo.filterDataset(info))
    }
)
</script>

<style lang="scss" scoped>
@import "../color-scheme";
strong {
    font-weight: bold;
}

h1 {
    font-size: 3rem;
}

.items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.datasets-filter {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 3rem;
    background-color: $color-scheme-light-unsaturated;
    border: 3px solid $color-scheme-dark;
    margin: auto;
    padding: 1rem;

    label {
        text-decoration: underline;
    }

    .countries-list {
        user-select: none;
        display: flex;
        gap: .3rem;

        .country-label {
            cursor: pointer;
        }
    }
}
</style>
