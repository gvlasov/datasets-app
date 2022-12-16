<template>
    <div class="filter-text" v-if="filteredItems.length > 0">Showing
        <strong>{{ filteredItems.length }}</strong> results from
        <strong>{{ countriesListText }}</strong>
    </div>
</template>

<script setup lang="ts">
import {computed} from "@vue/reactivity";
import Country from "../api/data/Country";

const props = defineProps<{
    countries: Country[],
    filteredItems: any[]
}>()
const countries = props.countries
const countriesListText = computed(
    (): string => {
        if (countries.length === 0) {
            return '';
        }
        const lastCountryName = countries[countries.length - 1].name;
        if (countries.length === 1) {
            return lastCountryName
        }
        const countryNamesBeforeLast = countries
            .slice(0, countries.length - 1).map(country => country.name);
        return countryNamesBeforeLast.join(', ') + ' & ' + lastCountryName
    }
)
</script>

<style lang="scss" scoped>
strong {
    font-weight: bold;
}
.filter-text {
    margin-bottom: .3rem;
}
</style>
