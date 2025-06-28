import { createRouter, createWebHashHistory } from 'vue-router'

import {RouterName} from "@/shared/router/routerNames.ts";

const MarketPage = () => import('@/pages/MarketPage/ui/MarketPage.vue')
const BattleGamePage = () => import('@/pages/BattleGamePage/ui/BattleGamePage.vue')
const ProfilePage = () => import('@/pages/ProfilePage/ui/ProfilePage.vue')
const MainPage = () => import('@/pages/MainPage/ui/MainPage.vue')

const routes = [
  { path: '/market-page', component: MarketPage, name: RouterName.MarketPage },
  { path: '/profile-page', component: ProfilePage, name: RouterName.ProfilePage, meta: { hideProfileIcon: true, } },
  { path: '/battlefield', component: BattleGamePage, name: RouterName.BattleGame, meta: { hideProfileIcon: true, } },
  { path: '/', component: MainPage, name: RouterName.MainPage },
]

export const APP_ROUTER = createRouter({
  history: createWebHashHistory('/tcg-client-frontend/'),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})
