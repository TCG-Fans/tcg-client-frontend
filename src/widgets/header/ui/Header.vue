<template>
  <header class="flex justify-between items-center gap-1 border-cyb-base rounded-md border-solid border-2">
    <router-link :to="{ name: RouterName.MainPage }">
      <div>Logo</div>
    </router-link>
    <div class="flex gap-1 items-center">
      <WalletConnection />
      <router-link :to="{ name: RouterName.ProfilePage }">
        <Avatar label="U" class="mr-2" size="normal" shape="circle" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Avatar } from "primevue";
import {RouterName} from "@/shared/router/routerNames.ts";
import WalletConnection from "@/features/wallet/connectUserWallet/ui/WalletConnection.vue";
</script>

<style scoped>

</style>
