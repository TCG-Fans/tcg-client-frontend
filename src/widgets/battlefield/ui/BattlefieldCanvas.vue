<template>
  <div ref="container" class="w-full h-full relative"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePixiBattlefield } from '../lib/usePixiBattlefield';

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (container.value) {
    usePixiBattlefield(container.value)
  };
});

defineExpose({ container });
</script>
