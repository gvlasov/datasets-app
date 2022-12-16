<template>
    <nav class="root">
        <a href="#/buy-orders" :class="currentPath === '/buy-orders' ? 'current' : ''"><div>Buy Orders</div></a>
        <a href="#/datasets" :class="currentPath === '/datasets' ? 'current' : ''"><div>Datasets</div></a>
    </nav>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useRoute} from "vue-router";

const currentPath = computed(() => useRoute().path)
</script>

<style lang="scss" scoped>
@import "../color-scheme";
nav {
    display: flex;
    background-color: $color-scheme-bright;
    gap: 1rem;
    $link-color: white;
    a {
        position: relative;
        color: $link-color;
        padding: 1.4rem 2rem;
        width: 10rem;
        height: 4rem;
        &:hover {
            background-color: $color-scheme-medium;
        }
        & > div {
            position: absolute;
            white-space: nowrap;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        &.current {
            font-weight: bold;
        }
    }
}
</style>
