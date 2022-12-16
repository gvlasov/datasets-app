<template>
    <div class="buy-order-details">
        <div class="grid-items">
            <div class="order-name">
                <CommonHeading>Order name</CommonHeading>
                <div v-if="!editing">{{ buyOrder.name }}</div>
                <input v-else type="text" v-model="buyOrder.name"/>
            </div>
            <div class="date-created">
                <CommonHeading>Date created</CommonHeading>
                <div>{{ dateFormatted }}</div>
            </div>
            <div class="order-budget">
                <CommonHeading>Order budget</CommonHeading>
                <div v-if="!editing">${{ buyOrder.budget.toFixed(2) }}</div>
                <div class="order-budget-input-wrap" v-else>
                    <div class="dollar">$</div>
                    <input type="number" min="0" v-model.number="buyOrder.budget"/>
                </div>
            </div>
        </div>
        <div class="included-datasets">
            <CommonHeading>Included datasets</CommonHeading>
            <div class="included-datasets-list">
                <DatasetBadge
                        v-for="selection in displayedDatasetSelections"
                        :key="selection.dataset.id"
                        :dataset="selection.dataset"
                        :state="editing ? selection.selected : ref(false)"
                        :disabled="!editing"
                        @toggle="(e) => onDatasetToggle(selection)(e)"
                />
            </div>
        </div>
        <div class="included-countries">
            <CommonHeading>Included countries</CommonHeading>
            <div class="included-countries-list">
                <CountryLabel
                        v-for="selection in displayedCountrySelections"
                        :key="selection.country.countryCode"
                        :country="selection.country"
                        :disabled="!editing"
                        :class="editing ? (selection.selected.value ? 'selected' : '') : ''"
                        @click="(e) => (editing ? onCountryToggle(selection) : () => void 0)"
                />
            </div>
        </div>
        <div class="buttons" :class="editing ? 'editing' : ''">
            <SimpleButton
                    v-if="!editing"
                    class="edit-order"
                    @click="editOrder"
            >Edit order
            </SimpleButton>
            <SimpleButton
                    v-if="!editing"
                    class="delete-order"
                    @click="deleteOrder"
            >Delete order
            </SimpleButton>
            <SimpleButton
                    v-if="editing"
                    class="save-order"
                    @click="saveOrder"
                    :disabled="saving"
            >{{typeof buyOrder.id === 'undefined' ? 'Create Order' : 'Save'}}
            </SimpleButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import BuyOrder from "../api/data/BuyOrder";
import DatasetBadge from "../components/DatasetBadge.vue";
import {computed, ref} from "vue";
import NarrativeIoApi from "../api/NarrativeIoApi";
import Dataset from "../api/data/Dataset";
import CountryLabel from "./CountryLabel.vue";
import Country from "../api/data/Country";
import {Ref} from "@vue/reactivity";
import SimpleButton from "./SimpleButton.vue";
import {useRouter} from "vue-router";
import {utcNow, formatDate} from "../api/data/functions"
import CommonHeading from "./CommonHeading.vue";
const components =
     [SimpleButton, DatasetBadge, CountryLabel, CommonHeading]
const props = defineProps<{
    buyOrder: BuyOrder,
    editing: boolean,
}>()
const api = new NarrativeIoApi()
const allCountries = await api.getCountries()
const buyOrder = props.buyOrder
let editing = ref(props.editing)
type DatasetSelection = {
    dataset: Dataset,
    selected: Ref<boolean>
}
type CountrySelection = {
    country: Country,
    selected: Ref<boolean>
}
const saving = ref(false)
const datasetSelections: DatasetSelection[] =
    (await new NarrativeIoApi().getDatasets())
        .map(
            (dataset: Dataset) => {
                return {
                    dataset,
                    selected: ref(buyOrder.datasetIds.includes(dataset.id))
                }
            }
        );
const countrySelections: CountrySelection[] = allCountries
    .map((country: Country) => {
        return {
            country,
            selected: ref(buyOrder.countries.includes(country.countryCode))
        }
    })
const displayedDatasetSelections = computed(() => {
    if (editing.value) {
        return datasetSelections
    } else {
        return datasetSelections.filter(selection => selection.selected.value)
    }
})
const displayedCountrySelections = computed(() => {
    if (editing.value) {
        return countrySelections
    } else {
        return countrySelections.filter(selection => selection.selected.value)
    }
})
const dateFormatted = computed(
    () => {
        let date = new Date(buyOrder.createdAt);
        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
)

function onDatasetToggle(selection: DatasetSelection) {
    return (newState: boolean) => {
        selection.selected.value = newState
    }
}

function onCountryToggle(selection: DatasetSelection) {
    selection.selected.value = !selection.selected.value
}

function editOrder() {
    editing.value = true
}

function deleteOrder() {
    api.deleteBuyOrder(buyOrder)
        .then(() => {
            useRouter().push('/buy-orders')
        })
}

function saveOrder() {
    saving.value = true
    let order = {
        ...buyOrder,
        datasetIds: datasetSelections
            .filter(d => d.selected.value)
            .map(d => d.dataset.id),
        countries: countrySelections
            .filter(d => d.selected.value)
            .map(d => d.country.countryCode),
        createdAt: formatDate(utcNow()),
    } as BuyOrder;
    let operation;
    if (typeof buyOrder.id === 'undefined') {
        operation = api.createBuyOrder(order)
            .then((buyOrder: BuyOrder) => {
                useRouter().push('/buy-order/'+buyOrder.id)
            })
    } else {
        operation = api.updateBuyOrder(order)
    }
    operation
        .finally(() => {
            editing.value = false
            saving.value = false
        })
}
</script>

<style lang="scss" scoped>
@import "../color-scheme";
.buy-order-details {
    border-radius: .3rem;
    background-color: $color-scheme-light-unsaturated;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;

    .grid-items {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .included-datasets-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .included-countries-list {
        display: flex;
        flex-grow: 0;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 2rem;
        margin-top: 1rem;
        .country-label {
            cursor: pointer;
            color: #444;
            &.selected {
                outline: 2px solid $color-scheme-dark !important;
                background-color: white;
            }
        }
    }

    .buttons {
        display: flex;
        gap: 1rem;
        justify-content: end;
        width: 100%;

        &.editing {
            justify-content: center;
        }
    }

    h3 {
        margin-bottom: .3rem;
    }

    input[type=text], input[type=number] {
        display: block;
        width: 100%;
        background-color: white;
        padding: .5rem;
        border-radius: .3rem;
        flex-grow: 1;
    }

    .order-budget-input-wrap {
        display: flex;
        gap: 1ch;
        align-items: center;
    }
}
</style>
