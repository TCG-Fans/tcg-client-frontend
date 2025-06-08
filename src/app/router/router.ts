import { createMemoryHistory, createRouter } from 'vue-router'

import MainPage from "@/pages/MainPage/ui/MainPage.vue";
import ProfilePage from "@/pages/ProfilePage/ui/ProfilePage.vue";
import MarketPage from "@/pages/MarketPage/ui/MarketPage.vue";

const routes = [
  { path: '/market-page', component: MarketPage, name: 'MarketPage' },
  { path: '/profile-page', component: ProfilePage, name: 'ProfilePage' },
  { path: '/', component: MainPage, name: 'MainPage' },
]

export const APP_ROUTER = createRouter({
  history: createMemoryHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})
