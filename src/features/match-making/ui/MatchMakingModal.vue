<template>
  <teleport to="body">
    <transition name="fade">
      <div class="modal-backdrop" @click="handleBackdropClick">
        <transition name="scale">
          <div ref="panelRef" class="modal-content" @click.stop>
            <div class="mb-4 flex justify-between items-center">
              <h2 class="text-xl font-bold ">Matchmaking</h2>
              <div @click="closeModal">x</div>
            </div>

            <div class="flex gap-2 mb-4">
              <Button @click="joinQueue">Join</Button>
              <Button @click="leaveQueue">Leave</Button>
              <Button @click="confirmMatch">Confirm</Button>
              <Button @click="loadStatus">Status</Button>
            </div>

            <pre class="bg-white rounded p-2 text-sm text-gray-800 whitespace-pre-wrap mb-2">
              {{ status }}
            </pre>

            <ul class="text-xs text-gray-600 space-y-1 max-h-48 overflow-y-auto">
              <li v-for="log in logs" :key="log">{{ log }}</li>
            </ul>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import {Button} from "primevue";
import { ref, onMounted, onUnmounted } from 'vue'
import {useMatchmaking} from "@/features/match-making/model/useMatchMaking.ts";

const {
  status, logs, closeModal,
  joinQueue, leaveQueue, confirmMatch, loadStatus
} = useMatchmaking()

const panelRef = ref<HTMLElement | null>(null)

const handleBackdropClick = (e: MouseEvent) => {
  if (!panelRef.value?.contains(e.target as Node)) {
    closeModal()
  }
}

const onEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  window.addEventListener('keydown', onEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onEscape)
})
</script>

<style scoped>
@reference "tailwindcss";

.modal-backdrop {
  @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50;
}

.modal-content {
  @apply bg-white dark:bg-zinc-800 text-black dark:text-white rounded-2xl p-6 w-full max-w-xl shadow-lg;
}

.fade-enter-active, .fade-leave-active {
  @apply transition-opacity duration-200;
}
.fade-enter-from, .fade-leave-to {
  @apply opacity-0;
}

.scale-enter-active, .scale-leave-active {
  @apply transition-transform duration-200 ease-out;
}
.scale-enter-from {
  @apply scale-95 opacity-0;
}
.scale-leave-to {
  @apply scale-95 opacity-0;
}
</style>
