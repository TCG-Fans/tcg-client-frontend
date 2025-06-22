<template>
  <div class="flex flex-col md:flex-row gap-6 border-2 rounded-md border-cyb-base p-1">
    <ProgressSpinner v-if="props.isCollectionLoading" />
    <draggable
        v-else
        v-model="props.cards"
        class="collection flex-1 grid grid-cols-3 gap-2 place-items-center"
        group="cards"
        item-key="id"
        ghost-class="ghost"
        :animation="200"
    >
      <template #item="{ element }">
        <GameCard :card="element" />
      </template>
    </draggable>

    <DeckStack
        class="fixed bottom-4"
        :is-loading="false"
        :initial-deck="deck"
        @cardAdded="onAdd"
        @cardRemoved="onRemove"
    />
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'
import draggable from 'vuedraggable'
import DeckStack from '@/features/deck/ui/DeckStack.vue'
import GameCard from '@/entities/cards/ui/GameCard.vue'
import {useDeckBuilderApi} from '@/features/deck/model/useDeck.js'
import type {CardType} from "@/entities/cards/model/cardType.ts";
import ProgressSpinner from 'primevue/progressspinner'

const props = defineProps<{
  isCollectionLoading: boolean,
  cards: CardType[]
}>()

const { getUserDeck, deleteCardFromUserDeck, addCardToUserDeck } = useDeckBuilderApi()

const deck = ref<CardType[]>([])

onBeforeMount(() => {
  getUserDeck()
})

async function onAdd(card: CardType) {
  deck.value.push(card)

  await addCardToUserDeck(card.id)
}

async function onRemove(card: CardType) {
  deck.value = deck.value.filter(c => c.id !== card.id)

  await deleteCardFromUserDeck(card.id)
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background-color: var(--color-cyb-plum);
}
</style>
