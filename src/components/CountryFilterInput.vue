<template>
    <div class="country-filter">
        <div class="title">Included countries:</div>
        <div class="countries-list">
            <CountryLabel
                    v-for="country in allCountries"
                    :key="country.countryCode"
                    :country="country"
                    :class="selectedCountriesRepo.isSelected(country) ? 'selected' : ''"
                    @click="selectedCountriesRepo.toggle(country)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Country from "../api/data/Country";
import CountryLabel from "./CountryLabel.vue";
import SelectedCountryNamesRepository
    from "../api/data/SelectedCountriesRepository";

const props = defineProps<{ repo: SelectedCountryNamesRepository, allCountries: Country[] }>()
const selectedCountriesRepo = props.repo
const allCountries = props.allCountries
</script>

<style lang="scss" scoped>
@import "../color-scheme";
.country-filter {
    color: $color-scheme-dark;
    box-shadow: 0 0 .6rem $color-scheme-dark;
    border-radius: .3rem;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 3rem;
    background-color: $color-scheme-light-unsaturated;
    padding: 1rem;

    label {
        text-decoration: underline;
    }

    .countries-list {
        user-select: none;
        display: flex;
        gap: .7rem;

        .country-label {
            cursor: pointer;
            &.selected {
                outline: 2px solid $color-scheme-dark !important;
                background-color: white;
            }
        }
    }

    .title {
        text-decoration: underline;
        margin-bottom: .4rem;
        font-size: 1.2rem;
    }
}
</style>
