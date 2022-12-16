<template>
    <YourBuyOrders :buyOrders="buyOrders" :allCountries="allCountries"/>
</template>

<script setup lang="ts">
import NarrativeIoApi from "../api/NarrativeIoApi";
import YourBuyOrders from "../components/YourBuyOrders.vue";

const api = new NarrativeIoApi();
const buyOrders = await api.getBuyOrders()
const allCountries = await api.getCountries()
</script>

<style scoped>
</style>
