<template>
  <div class="flex justify-center items-center h-full relative">
    <MainPageAnimation />
    <FloatingFooter class="fixed z-30 left-0  w-full p-2 bottom-0" />
  </div>
</template>

<script setup lang="ts">

import FloatingFooter from "@/widgets/floating-footer/ui/FloatingFooter.vue";
import MainPageAnimation from "@/widgets/main-page-animation/ui/MainPageAnimation.vue"
</script>
