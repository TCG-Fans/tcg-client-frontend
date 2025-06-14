<template>
  <main class="w-full h-full">
    <Header class="m-2 p-2" />
    <div class="p-2" >
      <router-view />
    </div>
    <Toast position="top-right" />
  </main>
</template>

<script setup lang="ts">
import Header from "@/widgets/header/ui/Header.vue";
import {Toast} from "primevue";
</script>
