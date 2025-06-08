<template>
  <main class="w-full h-full">
    <Header />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import Header from "@/widgets/header/Header.vue";
</script>
