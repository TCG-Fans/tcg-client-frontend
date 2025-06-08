<template>
  <main class="w-full h-full">
    <Header class="m-2 p-2" />
    <div class="p-2" >
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">
import Header from "@/widgets/header/ui/Header.vue";
</script>
