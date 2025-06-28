<template>
  <header class="flex justify-between items-center gap-1 border-cyb-base rounded-md border-solid border-2">
    <router-link :to="{ name: RouterName.MainPage }">
      <img class="w-[32px] h-[32px]" src="/tcg-logo.png" alt="tcg-logo">
    </router-link>
    <div class="flex gap-1 items-center">
      <WalletConnection />
      <router-link :to="{ name: RouterName.ProfilePage }">
        <Avatar label="P" size="normal" shape="circle" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Avatar } from "primevue";
import WalletConnection from "@/features/wallet/connectUserWallet/ui/WalletConnection.vue";
import {RouterName} from "@/shared/router/routerNames.ts";
</script>

<style scoped>

</style>
