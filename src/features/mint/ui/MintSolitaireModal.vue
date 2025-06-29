<template>
  <Dialog  v-model:visible="isShowMintModal"
           class="h-[80vh] w-[80vw]"
           header="Minted cards">
    <ProgressSpinner v-if="isCardProcessing" />
<!--    <SolitaireCards v-else :cards="mintedCards" />-->
    {{ mintedCards }}
  </Dialog>
</template>

<script setup lang="ts">
import {  Dialog  } from "primevue";
import SolitaireCards from "@/widgets/solitaire-cards-animation/ui/SolitaireCards.vue";
import {useMintModel} from "@/features/mint/model/useMintModel.ts";
import ProgressSpinner from "primevue/progressspinner";

const { isShowMintModal, mintedCards, isCardProcessing } = useMintModel()
</script>
