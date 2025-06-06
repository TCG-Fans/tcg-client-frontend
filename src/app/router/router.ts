import { createMemoryHistory, createRouter } from 'vue-router'
import MainPage from "@/pages/MainPage/ui/MainPage.vue";
import ProfilePage from "@/pages/ProfilePage/ui/ProfilePage.vue";
import MarketPage from "@/pages/MarketPage/ui/MarketPage.vue";

const routes = [
  { path: '/', component: MainPage, name: 'MainPage' },
  { path: '/market-page', component: MarketPage, name: 'ProjectPage' },
  { path: '/profile-page', component: ProfilePage, name: 'ProfilePage' },
]

export const APP_ROUTER = createRouter({
  history: createMemoryHistory(),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  routes,
})
