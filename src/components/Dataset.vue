<template>
    <div class="dataset">
        <div class="header">
            <img :src="dataset.thumbnailUrl"/>
            <h2>{{ dataset.label }}</h2>
        </div>
        <CommonHeading>Dataset Description</CommonHeading>
        <div class="description">{{ dataset.description }}</div>
        <div class="cost-per-record-wrap">
            <CommonHeading>Cost Per Record:</CommonHeading>
            <div class="cost-per-record">${{ dataset.costPerRecord }}</div>
        </div>
        <div class="available-records-count-wrap">
            <CommonHeading>Available Records</CommonHeading>
            <div class="available-records-count">{{ recordCount }}</div>
        </div>
        <div class="included-countries-wrap">
            <CommonHeading>Included Countries</CommonHeading>
            <div class="countries-list">
                <CountryLabel
                        v-for="country in dataset.includedCountries"
                        :key="country.countryCode"
                        :country="country"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import DatasetInfo from "../api/data/DatasetInfo";
import CountryLabel from "./CountryLabel.vue";
import Country from "../api/data/Country";
import {computed} from "@vue/reactivity";
import CommonHeading from "./CommonHeading.vue";
const props = defineProps<{ datasetInfo: DatasetInfo, selectedCountries: Country[] }>()
const dataset = props.datasetInfo
const components = [CountryLabel,CommonHeading]
const recordCount = computed(
    () =>
        Object.entries(dataset.availableRecords)
            .filter(
                entry =>
                    props.selectedCountries
                        .find(c => c.countryCode === entry[0])
            )
            .map(entry => entry[1])
            .reduce((prev: number, current: number) => prev + current)
)
</script>

<style lang="scss" scoped>
@import "../color-scheme";
.dataset {
    color: black;
    border-radius: .3rem;
    background-color: $color-scheme-light-unsaturated;
    padding: 2rem;

    .header {
        display: flex;
        flex-wrap: nowrap;
        text-overflow: clip;
        align-items: center;
        margin-bottom: 1rem;

        img {
            flex-grow: 0;
            flex-shrink: 0;
        }

        h2 {
            flex-grow: 1;
            font-size: 1.4rem;
            text-align: center;
        }
    }

    .cost-per-record-wrap, .available-records-count-wrap {
        display: flex;
        justify-content: space-between;
    }

    .description {
        margin-bottom: 1.2rem;
    }

    .included-countries-wrap {
        h3 {
            display: block;
        }

        .countries-list {
            display: flex;
            gap: .3rem;
            flex-wrap: wrap;
        }
    }
}
</style>
