<template>
    <NavigationBar/>
    <div class="content-sizer">
        <h1>{{pageHeading}}</h1>
        <Suspense>
            <router-view/>
        </Suspense>
        <div class="space"></div>
    </div>
</template>

<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import { useRoute } from 'vue-router'
import {computed} from "vue";
const components = [NavigationBar]
const pageHeading = computed(() => useRoute().meta.title)
</script>
<style lang="scss" scoped>
h1 {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0 2rem 0;
}

.content-sizer {
    display: flex;
    flex-direction: column;
    max-width: 52rem;
    margin: 0 auto;
}

.space {
    height: 1rem;
}
</style>
