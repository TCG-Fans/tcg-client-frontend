<template>
  <section
      class="deck-stack bg-cyb-base p-4 rounded-xl shadow-lg w-full overflow-x-auto"
  >
    <h2 class="text-lg font-bold">
      {{ deckTitle }}
    </h2>

    <ProgressSpinner v-if="props.isLoading" />
    <template v-else>
      <draggable
          v-model="deck"
          group="cards"
          item-key="id"
          ghost-class="ghost"
          :animation="200"
          direction="horizontal"
          class="flex space-x-2 overflow-x-scroll pt-2"
          @change="handleChange"
      >
        <template #item="{ element }">
          <GameCard :card="element" mode="deck" />
        </template>
      </draggable>

      <p v-if="deck.length === 0" class="text-gray-500 pt-2">
        {{ en.userDeck.dragYourCard }}
      </p>
    </template>
  </section>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import draggable from 'vuedraggable'
import en from '@/shared/lib/languages/en.ts'
import ProgressSpinner from 'primevue/progressspinner'
import GameCard from '@/entities/cards/ui/GameCard.vue'
import type {CardType} from "@/entities/cards/model/cardType.ts";

const props = defineProps<{
  isLoading: boolean,
  initialDeck: CardType[]
}>()

const emit = defineEmits(['cardAdded', 'cardRemoved'])

const deck = ref([...props.initialDeck])

const deckTitle = computed(() => props.isLoading ? en.userDeck.deckIsLoading : `${en.userDeck.title} ${deck.value.length}`)

function handleChange(evt) {
  if (evt.added) {
    emit('cardAdded', evt.added.element)

    return
  }


  if (evt.removed) {
    emit('cardRemoved', evt.removed.element)
  }
}
</script>

<style scoped>
.deck-stack {
  max-height: 70vh;
  overflow-y: auto;
  width: calc(100% - 28px);
}

.ghost {
  opacity: 0.4;
  border: 2px dashed #00ffe0;
}

/* Увеличение hit-area для тач-действий */
.deck-stack .card-item {
  touch-action: pan-y;
}
</style>
