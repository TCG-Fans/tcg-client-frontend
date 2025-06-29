<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GameCard from '@/entities/cards/ui/GameCard.vue' // путь свой

const props = defineProps<{
  cards: Array<{
    id: number,
    name: string,
    cost: number,
    description: string,
    faction: string,
    imageUrl: string,
    power: number,
    rarity: string,
    type: string,
    attributes: Record<string, any>
  }>
}>()

// Для пошагового "раскладывания" карт
const shownCount = ref(0)

onMounted(() => {
  shownCount.value = 0
  // Анимация — по одной карте раз в 120мс
  const interval = setInterval(() => {
    if (shownCount.value < props.cards.length) {
      shownCount.value++
    } else {
      clearInterval(interval)
    }
  }, 120)
})
</script>

<template>
  <div class="relative min-h-[400px]">
    <div
        v-for="(card, i) in props.cards.slice(0, shownCount)"
        :key="card.id"
        :style="{
          left: `${i * 56}px`, // смещение каждой карты вправо, поиграйся с числом для плотности
          zIndex: i,
        }"
        class="absolute transition-all duration-700 ease-out"
    >
      <GameCard
          :card="card"
          class="w-40"
      />
    </div>
  </div>
</template>
