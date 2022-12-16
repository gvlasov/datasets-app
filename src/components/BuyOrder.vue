<template>
    <router-link :to="'/buy-orders/'+buyOrder.id" class="buy-order">
        <div class="order-name">
            <h3>Order name</h3>
            <div>{{buyOrder.name}}</div>
        </div>
        <div class="date-created">
            <h3>Date created</h3>
            <div>{{dateFormatted}}</div>
        </div>
        <div class="budget">
            <h3>Budget</h3>
            <div>${{buyOrder.budget.toFixed(2)}}</div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import BuyOrder from "../api/data/BuyOrder";
import {computed} from "vue";
const props = defineProps<{ buyOrder: BuyOrder }>()
const buyOrder = props.buyOrder
const dateFormatted = computed(
    () => {
        let date = new Date(buyOrder.createdAt);
        return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
)
</script>

<style lang="scss" scoped>
@import "../color-scheme";
.buy-order {
    color: $color-scheme-dark;
    background-color: $color-scheme-light-unsaturated;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    border-radius: .3rem;
    &:hover {
        background-color: $color-scheme-brighter;
    }
    & > * {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .header {
        display: flex;
        flex-wrap: nowrap;
        text-overflow: clip;
        align-items: center;

        img {
            flex-grow: 0;
            flex-shrink: 0;
        }

        h2 {
            flex-grow: 1;
            font-size: 1.5rem;
            text-align: center;
        }
    }

    h3 {
        text-decoration: underline;
        font-size: 1.2rem;
    }
}
</style>
