<template>
  <Dialog  v-model:visible="isShowMintModal"
           class="h-[80vh] w-[80vw]"
           header="Minted cards">
    <div v-if="isCardProcessing" class="flex items-center justify-center w-full">
      <ProgressSpinner  />
    </div>
    <SolitaireCards v-else :cards="mintedCards" />
  </Dialog>
</template>

<script setup lang="ts">
import {  Dialog  } from "primevue";
import SolitaireCards from "@/widgets/solitaire-cards-animation/ui/SolitaireCards.vue";
import {useMintModel} from "@/features/mint/model/useMintModel.ts";
import ProgressSpinner from "primevue/progressspinner";
import {ref, watch} from "vue";
import {useCardsApi} from "@/entities/cards/api/useCardsApi.ts";

const { isShowMintModal, mintedCards, isCardProcessing } = useMintModel()

const cardDetails = ref([])

const { getCardById } = useCardsApi()

watch(mintedCards, async (newMinted) => {
  if (!newMinted || !newMinted.length < 8) {
    return
  }

  cardDetails.value = []

  // Собираем все cardId из сминченных карт
  const fetches = newMinted.map(async (item) => {
    // getCardById может быть асинхронным — дожидаемся
    const card = await getCardById(item.cardId)

    return {
      ...card.data,
    }
  })

  cardDetails.value = await Promise.all(fetches)

  isCardProcessing.value = false
})
</script>
