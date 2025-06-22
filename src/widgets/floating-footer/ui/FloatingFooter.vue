<template>
  <div class="flex justify-center box-border border-2 border-cyb-base rounded-md">
    <Button aria-label="Filter" @click="openModal">
      Battle
    </Button>
  </div>
</template>

<script setup lang="ts">
import {Button} from "primevue";
import {useMatchmaking} from "@/features/match-making/model/useMatchMaking.ts";

const { openModal } = useMatchmaking()
</script>

<style scoped>

</style>
