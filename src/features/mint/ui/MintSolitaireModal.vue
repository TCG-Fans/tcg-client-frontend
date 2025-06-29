<template>
  <Dialog  v-model:visible="isShowMintModal"
           class="h-[80vh] w-[80vw]"
           header="Minted cards">
    <SolitaireCards :cards="cards" />
  </Dialog>
</template>

<script setup lang="ts">
import {  Dialog  } from "primevue";
import SolitaireCards from "@/widgets/solitaire-cards-animation/ui/SolitaireCards.vue";
import {useMintModel} from "@/features/mint/model/useMintModel.ts";
import {ref} from "vue";

const { isShowMintModal, mintedCards } = useMintModel()

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
</script>
