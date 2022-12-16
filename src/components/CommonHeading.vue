<template>
    <h3>
        <slot/>
    </h3>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@import "../color-scheme";

h3 {
    text-decoration: underline;
    font-size: 1.2rem;
    margin-bottom: .6rem;
    color: black;
}
</style>
