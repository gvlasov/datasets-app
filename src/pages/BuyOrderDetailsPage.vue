<template>
    <BuyOrderDetails
            :buyOrder="buyOrder"
            :editing="false"
    />
</template>

<script setup lang="ts">
import NarrativeIoApi from "../api/NarrativeIoApi";
import BuyOrderDetails from "../components/BuyOrderDetails.vue";
import {computed, ComputedRef} from "vue";
import {useRoute} from "vue-router";

const api = new NarrativeIoApi();
const buyOrderId: ComputedRef<number> = computed(() => Number.parseInt(useRoute().params.id as string))
const buyOrder = await api.getBuyOrderById(buyOrderId.value)
</script>

<style scoped>
</style>
