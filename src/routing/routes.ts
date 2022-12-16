import DatasetsPage from "../pages/DatasetsPage.vue";
import BuyOrderDetailsPage from "../pages/BuyOrderDetailsPage.vue";
import YourBuyOrdersPage from "../pages/YourBuyOrdersPage.vue";
import NewBuyOrderPage from "../pages/NewBuyOrderPage.vue";

export default [
    { path: '/', component: DatasetsPage, meta: { title: 'Datasets' } },
    { path: '/datasets', component: DatasetsPage, meta: { title: 'Datasets' } },
    { path: '/buy-orders', component: YourBuyOrdersPage, meta: { title: 'Your Buy Orders' } },
    { path: '/buy-orders/:id', component: BuyOrderDetailsPage, meta: { title: 'Buy Order Details' } },
    { path: '/buy-orders/new', component: NewBuyOrderPage, meta: { title: 'Buy Order Details' } },
]
