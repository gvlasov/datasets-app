<template>
    <div class="country-label">{{ country.name }}</div>
</template>

<script setup lang="ts">
import Country from "../api/data/Country";

const props = defineProps<{ country: Country }>()
const country = props.country
</script>

<style lang="scss" scoped>
@import "../color-scheme";
.country-label {
    border-radius: 1rem;
    padding: .5rem;
    background-color: $unselected-checkbox-color;
    white-space: nowrap;
    cursor: default;
    color: black;
    &[disabled=disabled] {
        background-color: $color-scheme-light-unsaturated;
        color: $color-scheme-medium;
    }
}
</style>
