import { createMemoryHistory, createRouter } from 'vue-router'

import MainPage from "@/pages/MainPage/ui/MainPage.vue";
import ProfilePage from "@/pages/ProfilePage/ui/ProfilePage.vue";
import MarketPage from "@/pages/MarketPage/ui/MarketPage.vue";
import {RouterName} from "@/shared/router/routerNames.ts";

const routes = [
  { path: '/market-page', component: MarketPage, name: RouterName.MarketPage },
  { path: '/profile-page', component: ProfilePage, name: RouterName.ProfilePage },
  { path: '/', component: MainPage, name: RouterName.MainPage },
]

export const APP_ROUTER = createRouter({
  history: createMemoryHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})
