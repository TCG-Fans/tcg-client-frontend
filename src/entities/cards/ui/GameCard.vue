<template>
  <div
      class="w-60 rounded-2xl shadow-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-4 flex flex-col relative"
      :class="{'game-card_deckMode': props.mode === 'deck'}"
  >
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-bold uppercase tracking-wide text-gray-300">{{ card.name }}</span>
      <span class="bg-yellow-500 rounded-full px-2 py-0.5 text-xs font-bold shadow text-gray-900">
        {{ card.cost }}
      </span>
    </div>
    <img
        :src="card.imageUrl"
        :alt="card.name"
        class="w-full aspect-square object-cover rounded-xl mb-2 border border-slate-600"
    />
    <div class="flex items-center justify-between mt-2">
      <span
          class="text-lg font-semibold text-white"
      >{{ card.faction }}</span>
      <span
          class="bg-slate-700 text-slate-200 rounded px-2 py-0.5 text-xs uppercase"
      >{{ card.rarity }}</span>
    </div>
    <div class="text-xs text-gray-400 mt-1 mb-2">{{ card.type }}</div>
    <div class="text-sm text-gray-200 mb-2 flex-1">
      {{ card.description }}
    </div>
    <div class="flex items-center justify-between mt-auto">
      <span class="text-2xl font-bold text-cyan-400 drop-shadow">{{ card.power }}</span>
      <div v-if="card.attributes" class="text-xs text-slate-400">{{ Object.keys(card.attributes).length ? '[Effect]' : '' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameCardViewMode } from "@/entities/cards/model/cardType.ts";

const props = defineProps<{
  mode?: GameCardViewMode,
  card: {
    attributes: Record<string, any>,
    cost: number,
    description: string,
    faction: string,
    id: number,
    imageUrl: string,
    name: string,
    power: number,
    rarity: string,
    type: string
  }
}>()
</script>

<style scoped>
.game-card_deckMode {
  @apply flex-shrink-0;
}

.game-card_deckMode img {
  display: none;
}
</style>
