<template>
  <div>
    <div class="text-center">
      Profile page
    </div>
    <SwitchProfileSection class="justify-center" />
    <keep-alive>
      <CardsCollection v-if="activeSection === ProfileSection.Collection"
                       :cards="userCardCollections"
                       :isCollectionLoading="isCollectionLoading"
      />
    </keep-alive>
    <keep-alive>
      <DeckBuilder v-if="activeSection === ProfileSection.Deck"
                   :cards="userCardCollections"
                   :isCollectionLoading="isCollectionLoading"
      />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { ProfileSection, useProfileSectionStore } from "@/features/switch-profile-section/model/useSwitchProfile.ts";
import SwitchProfileSection from "@/features/switch-profile-section/ui/SwitchProfileSection.vue";
import CardsCollection from "@/widgets/cards-collection/ui/CardsCollection.vue";
import DeckBuilder from "@/widgets/deck-builder/ui/DeckBuilder.vue";
import {useCardsApi} from "@/entities/cards/api/useCardsApi.ts";
import {onMounted, ref} from "vue";
import {CardType} from "@/entities/cards/model/cardType.ts";

const { activeSection } = useProfileSectionStore()

const { getCardsByWallet, getAllCards, isCollectionLoading } = useCardsApi()

const userCardCollections = ref<CardType[]>([])

onMounted(() => {
  getAllCards().then(cards => {
    userCardCollections.value = cards.data
  })

  // getCardsByWallet().then(cards => {
  //   userCardCollections.value = cards.data
  // })
})
</script>

<style scoped>

</style>
