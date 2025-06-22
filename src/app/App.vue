<template>
  <main class="w-full h-full flex flex-col">
    <Header class="m-2 p-2" />
    <div class="p-2 flex-shrink-0 flex-grow" >
      <router-view />
    </div>
    <Toast position="top-right" />
    <MatchMakingModal v-if="isOpenMatchmakingModal" />
  </main>
</template>

<script setup lang="ts">
import Header from "@/widgets/header/ui/Header.vue";
import {Toast} from "primevue";
import {useMatchmaking} from "@/features/match-making/model/useMatchMaking.ts";
import MatchMakingModal from "@/features/match-making/ui/MatchMakingModal.vue";
import {useAuthApi} from "@/features/auth/api/useAuthApi.ts";

const { isOpenMatchmakingModal } = useMatchmaking()

const { restoreSession } = useAuthApi()

restoreSession()
</script>
