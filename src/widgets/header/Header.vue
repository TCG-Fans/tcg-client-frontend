<template>
  <header class="flex justify-between items-center m-2 p-1 gap-1 border-cyb-base rounded-sm border-solid border-2">
    <router-link :to="{ name: RouterName.MainPage }">
      <div>Logo</div>
    </router-link>
    <div class="flex gap-1 items-center">
      <Button>wallet</Button>
      <router-link :to="{ name: RouterName.ProfilePage }">
        <Avatar label="U" class="mr-2" size="large" shape="circle" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Avatar } from "primevue";
import { Button } from "primevue"
import {RouterName} from "@/shared/router/routerNames.ts";
</script>

<style scoped>

</style>
