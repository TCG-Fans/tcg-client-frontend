<template>
  <div class="flex gap-2 p-2 bg-cyb-base-100 rounded-xl">
    <button
        :class="[
        'px-4 py-2 rounded-lg',
        activeSection === ProfileSection.Collection ? 'bg-cyb-accent text-cyb-plum' : 'bg-cyb-base text-cyb-blackish',
      ]"
        @click="setSection(ProfileSection.Collection)"
    >
      {{ en.switchProfileSection.collection }}
    </button>
    <button
        :class="[
        'px-4 py-2 rounded-lg',
        activeSection === ProfileSection.Deck ? 'bg-cyb-accent text-cyb-plum' : 'bg-cyb-base text-cyb-blackish',
      ]"
        @click="setSection(ProfileSection.Deck)"
    >
      {{ en.switchProfileSection.deck }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {ProfileSection, useProfileSectionStore} from "@/features/switch-profile-section/model/useSwitchProfile.ts";
import en from '@/shared/lib/languages/en.ts'

const { activeSection, setSection } = useProfileSectionStore()
</script>
