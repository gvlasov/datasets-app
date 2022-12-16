<template>
    <button>
        <slot/>
    </button>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
button {
    color: black;
    cursor: pointer;
    padding: .7rem 1.2rem;
    background-color: white;
    border-radius: .6rem;
    font-size: 1.2rem;
    &:hover {
        background-color: #ddd;
    }
    &:disabled {
        color: gray;
        background-color: #ccc;
    }
}
</style>
