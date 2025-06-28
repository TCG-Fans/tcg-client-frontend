<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GameCard from '@/entities/cards/ui/GameCard.vue' // измени путь под свой проект

const cards = ref([
  {
    id: 1,
    name: 'Razor Grunt',
    cost: 1,
    description: 'Overclock: +1 Power',
    faction: 'gladiator',
    imageUrl: 'https://placeholder.com/300x400',
    power: 2,
    rarity: 'common',
    type: 'unit',
    attributes: {},
  },
  {
    id: 2,
    name: 'Data Wraith',
    cost: 2,
    description: 'Glitch: Draw a card',
    faction: 'hacker',
    imageUrl: 'https://placeholder.com/300x400',
    power: 1,
    rarity: 'rare',
    type: 'unit',
    attributes: {},
  },
  {
    id: 3,
    name: 'Drone Scout',
    cost: 1,
    description: 'Protocol: Reveal top deck card',
    faction: 'droid',
    imageUrl: 'https://placeholder.com/300x400',
    power: 1,
    rarity: 'common',
    type: 'unit',
    attributes: {},
  },
  {
    id: 4,
    name: 'Firewall Agent',
    cost: 3,
    description: 'Absorb: +2 Power',
    faction: 'neutral',
    imageUrl: 'https://placeholder.com/300x400',
    power: 3,
    rarity: 'epic',
    type: 'unit',
    attributes: {},
  },
  {
    id: 5,
    name: 'Bit Slicer',
    cost: 2,
    description: 'Glitch: Draw a card',
    faction: 'hacker',
    imageUrl: 'https://placeholder.com/300x400',
    power: 2,
    rarity: 'rare',
    type: 'unit',
    attributes: {},
  },
  {
    id: 6,
    name: 'Blade Sentinel',
    cost: 2,
    description: 'Overclock: +2 Power',
    faction: 'gladiator',
    imageUrl: 'https://placeholder.com/300x400',
    power: 3,
    rarity: 'uncommon',
    type: 'unit',
    attributes: {},
  },
  {
    id: 7,
    name: 'Neuro Hacker',
    cost: 3,
    description: 'Glitch: Steal 1 Power from enemy',
    faction: 'hacker',
    imageUrl: 'https://placeholder.com/300x400',
    power: 2,
    rarity: 'epic',
    type: 'unit',
    attributes: {},
  },
  {
    id: 8,
    name: 'Pulse Droid',
    cost: 1,
    description: 'Protocol: Gain Shield',
    faction: 'droid',
    imageUrl: 'https://placeholder.com/300x400',
    power: 1,
    rarity: 'common',
    type: 'unit',
    attributes: {},
  },
  {
    id: 9,
    name: 'System Patch',
    cost: 2,
    description: 'Absorb: Restore 2 Health',
    faction: 'neutral',
    imageUrl: 'https://placeholder.com/300x400',
    power: 1,
    rarity: 'rare',
    type: 'unit',
    attributes: {},
  },
  {
    id: 10,
    name: 'Steel Raptor',
    cost: 3,
    description: 'Overclock: +1 Power & Draw',
    faction: 'gladiator',
    imageUrl: 'https://placeholder.com/300x400',
    power: 4,
    rarity: 'epic',
    type: 'unit',
    attributes: {},
  },
  {
    id: 11,
    name: 'Bitshift Phantom',
    cost: 2,
    description: 'Glitch: Discard 1 enemy card',
    faction: 'hacker',
    imageUrl: 'https://placeholder.com/300x400',
    power: 2,
    rarity: 'rare',
    type: 'unit',
    attributes: {},
  },
])

const numCards = cards.value.length
const animationState = ref(0)

onMounted(() => {
  setInterval(() => {
    animationState.value = (animationState.value + 1) % numCards
  }, 4500)
})

function getCardStyle(index: number) {
  const spread = 30
  const radius = 180
  const active = animationState.value
  const pos = (index - active + numCards) % numCards
  const half = Math.floor(numCards / 2)
  if (pos === 0) {
    return {
      transform: 'translate(0, 0) rotate(0deg) scale(1.08)',
      zIndex: 100,
      opacity: 1,
      pointerEvents: 'none',
      transition: 'all 0.7s cubic-bezier(.7,.2,.3,1)',
      filter: 'drop-shadow(0 6px 24px #38bdf8aa)'
    }
  }
  let offset = pos
  if (pos > half) offset = pos - numCards
  const angle = offset * spread
  const x = Math.sin(angle * Math.PI / 180) * radius
  const y = Math.cos(angle * Math.PI / 180) * radius * 0.4
  return {
    transform: `translate(${x}px, ${y}px) rotate(${angle}deg) scale(0.85)`,
    zIndex: 100 - Math.abs(offset),
    opacity: Math.abs(offset) > half ? 0 : 1,
    pointerEvents: 'none',
    transition: 'all 0.7s cubic-bezier(.7,.2,.3,1)',
    filter: 'none'
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div v-for="(card, i) in cards" :key="card.id"
           :style="getCardStyle(i)"
           class="absolute transition-all duration-700 ease-in-out"
      >
        <GameCard :card="card" />
      </div>
    </div>
  </div>
</template>
