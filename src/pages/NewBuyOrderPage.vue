<template>
    <BuyOrderDetails
            :buyOrder="buyOrder"
            :editing="true"
    />
</template>

<script setup lang="ts">
import BuyOrderDetails from "../components/BuyOrderDetails.vue";
import BuyOrder from "../api/data/BuyOrder";
import {formatDate} from "../api/data/functions"
const buyOrder = {
    name: '',
    budget: 0,
    countries: [],
    datasetIds: [],
    createdAt: formatDate(new Date()),
} as BuyOrder
</script>

<style scoped>
</style>
