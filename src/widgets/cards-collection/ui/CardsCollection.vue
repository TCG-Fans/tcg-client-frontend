<template>
  <div class="border-2 rounded-md border-cyb-base p-1">
    <div class="grid grid-cols-3 gap-2">
      <GameCard v-for="card in CARDS_MOCK"
                :key="card.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCard from "@/entities/cards/ui/GameCard.vue";
import { CARDS_MOCK } from "@/shared/mocks/cards.ts";
</script>

<style scoped>

</style>
