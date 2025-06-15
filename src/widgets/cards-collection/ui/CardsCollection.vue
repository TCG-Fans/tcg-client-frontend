<template>
  <div class="border-2 rounded-md border-cyb-base p-1">
    <div class="grid grid-cols-3 gap-2">
      <GameCard v-for="card in 5"
                :key="card.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCard from "@/entities/cards/ui/GameCard.vue";
import {useCardsApi} from "@/entities/cards/api/useCardsApi.ts";
import {useWallet} from "@/shared/lib/ethers/useWallet.ts";
import {onMounted} from "vue";

const { walletAddress } = useWallet()

const { getCardsByWallet, getAllCards } = useCardsApi()

onMounted(() => {
  // getAllCards()
})
</script>

<style scoped>

</style>
