<template>
  <div>
    <div class="text-center">
      Profile page
    </div>
    <SwitchProfileSection class="justify-center" />
    <CardsCollection v-if="activeSection === ProfileSection.Collection"/>
    <DeckBuilder v-if="activeSection === ProfileSection.Deck"/>
  </div>
</template>

<script setup lang="ts">
import { ProfileSection, useProfileSectionStore } from "@/features/switch-profile-section/model/useSwitchProfile.ts";
import SwitchProfileSection from "@/features/switch-profile-section/ui/SwitchProfileSection.vue";
import CardsCollection from "@/widgets/cards-collection/ui/CardsCollection.vue";
import DeckBuilder from "@/widgets/deck-builder/ui/DeckBuilder.vue";

const { activeSection } = useProfileSectionStore()
</script>

<style scoped>

</style>
