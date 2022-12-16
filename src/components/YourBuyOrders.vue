<template>
    <div class="create-order-wrap">
        <SimpleButton @click="router.push('/buy-orders/new')">Create new order</SimpleButton>
    </div>
    <FilterText
        :countries="selectedCountriesRepo.getSelectedCountries()"
        :filteredItems="filteredItems"
    />
    <div class="items">
        <BuyOrderComponent
            v-for="buyOrder in filteredItems"
            :key="buyOrder.id"
            :buyOrder="buyOrder"
        />
    </div>
    <CountryFilterInput :repo="selectedCountriesRepo" :allCountries="allCountries"/>
</template>

<script setup lang="ts">
import BuyOrder from "../api/data/BuyOrder";
import BuyOrderComponent from "../components/BuyOrder.vue";
import FilterText from "./FilterText.vue";
import CountryFilterInput from "./CountryFilterInput.vue";
import SelectedCountryNamesRepository
    from "../api/data/SelectedCountriesRepository";
import Country from "../api/data/Country";
import {computed, ComputedRef} from "vue";
import SimpleButton from "./SimpleButton.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const components = [SimpleButton, CountryFilterInput, FilterText, BuyOrderComponent];
const props = defineProps<{ buyOrders: BuyOrder[], allCountries: Country[] }>()
const buyOrders = props.buyOrders
const allCountries = props.allCountries
const selectedCountriesRepo = new SelectedCountryNamesRepository(allCountries)
const filteredItems = computed(() => buyOrders.filter(
    (order: BuyOrder) =>
        order.countries.some(
            countryCode =>
                selectedCountriesRepo.isCountrySelectedByCountryCode(countryCode)
        )
    )
)
</script>

<style lang="scss" scoped>
@import "../color-scheme";
.create-order-wrap {
    margin: .5rem 0 1.5rem 0;
    text-align: center;
    button {
        background-color: $unselected-checkbox-color;
        &:hover {
            background-color: $color-scheme-bright;
        }
    }
}
strong {
    font-weight: bold;
}
h1 {
    font-size: 3rem;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
