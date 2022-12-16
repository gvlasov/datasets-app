<template>
    <Datasets :datasetInfos="datasetInfos" :allCountries="countries"/>
</template>

<script setup lang="ts">
import Datasets from "../components/Datasets.vue";
import NarrativeIoApi from "../api/NarrativeIoApi";
import DatasetInfoRepository from "../api/data/DatasetInfoRepository";
const repo = new DatasetInfoRepository(
    new NarrativeIoApi()
)
await repo.refresh()
const datasetInfos = repo.getDatasetInfos()
const countries = repo.getCountries()
</script>

<style scoped>
</style>
