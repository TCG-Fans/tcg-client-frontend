<template>
  <Dialog  v-model:visible="isShowMintModal"
           class="h-[80vh] w-[80vw]"
           header="Minted cards">
    <SolitaireCards :cards="mintedCards" />
  </Dialog>
</template>

<script setup lang="ts">
import {  Dialog  } from "primevue";
import SolitaireCards from "@/widgets/solitaire-cards-animation/ui/SolitaireCards.vue";
import {useMintModel} from "@/features/mint/model/useMintModel.ts";

const { isShowMintModal, mintedCards } = useMintModel()
</script>
