<template>
  <div class="border-2 rounded-md border-cyb-base p-1">
    <div v-if="props.isCollectionLoading"
        class="flex justify-between items-center">
      <ProgressSpinner />
    </div>
    <div v-else-if="props.cards.length"
        class="grid grid-cols-3 gap-2 place-items-center">
      <GameCard v-for="card in props.cards"
                :card="card"
                :key="card.id"
      />
    </div>
    <template v-else>
      <p class="text-center">{{ en.cardsCollection.empty }}</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import GameCard from "@/entities/cards/ui/GameCard.vue";
import ProgressSpinner from 'primevue/progressspinner';
import en from '@/shared/lib/languages/en.ts'
import type {CardType} from "@/entities/cards/model/cardType.ts";

const props = defineProps<{
  isCollectionLoading: boolean,
  cards: CardType[]
}>()
</script>

<style scoped>

</style>
