<template>
  <div class="relative w-full h-screen bg-gradient-to-br from-[#181d29] via-[#202441] to-[#181e2b] overflow-hidden">
    <BattlefieldCanvas ref="battlefieldRef" />
    <CardsHand :battlefieldRef="battlefieldRef" />
    <!-- дальше будут PhaseBanner, Hand, PlayerPanel, ... -->
  </div>
</template>

<script setup lang="ts">
import BattlefieldCanvas from '@/widgets/battlefield/ui/BattlefieldCanvas.vue';
import CardsHand from "@/widgets/cards-hand/ui/CardsHand.vue";
import {ref} from "vue";

const battlefieldRef = ref(null);
</script>
