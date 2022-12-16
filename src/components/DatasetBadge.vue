<template>
    <button class="dataset-badge" :class="state ? 'selected' : ''" @click="e => toggleSelection(e)">
        <img :src="dataset.thumbnailUrl"/>
        <div class="name">{{dataset.label}}</div>
        <div class="cost-per-record">${{dataset.costPerRecord}} per record</div>
    </button>
</template>

<script setup lang="ts">
import Dataset from "../api/data/Dataset";
import {Ref, ref} from "@vue/reactivity";
const props = defineProps<{ dataset: Dataset, state: Ref<Boolean> }>()
const dataset = props.dataset
let state = props.state
const emit = defineEmits(['toggle'])
function toggleSelection(e: MouseEvent) {
    state.value = !state.value
    emit('toggle', state.value)
}
</script>

<style lang="scss" scoped>
@import "../color-scheme";
.dataset-badge {
    &.selected {
        background-color: white;
        outline: 2px solid $color-scheme-dark !important;
        .cost-per-record {
            color: #909090
        }
    }
    display: flex;
    flex-direction: column;
    background-color: $unselected-checkbox-color;
    padding: 1rem;
    flex-wrap: wrap;
    height: 6rem;
    column-gap: 2rem;
    justify-content: space-around;
    align-content: start;
    cursor: pointer;
    &:disabled {
        cursor: default;
    }
    img {
        height: 100%;
        width: fit-content;
    }
    .name, .cost-per-record {
        flex: 1;
        flex-grow: 0;
        flex-shrink: 0;
    }
    .name {
        font-weight: bold;
        font-size: 1.4rem;
    }
    .cost-per-record {
        color: #666;
    }
}
</style>
