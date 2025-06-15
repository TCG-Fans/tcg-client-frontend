<template>
  <div class="flex flex-col md:flex-row gap-6">
    <div class="collection flex-1 grid grid-cols-2 gap-4">
      <draggable
          v-model="collection"
          group="cards"
          item-key="id"
          ghost-class="ghost"
          :animation="200"
      >
        <template #item="{ element }">
          <div class="bg-cyb-plum/10 p-4 rounded shadow">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>

    <DeckStack
        class="fixed bottom-4"
        :initial-deck="deck"
        @cardAdded="onAdd"
        @cardRemoved="onRemove"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import DeckStack from '@/entities/deck/ui/DeckStack.vue'

const collection = ref([
  { id: 1, name: 'Fire Dragon' },
  { id: 2, name: 'Water Sprite' },
  { id: 3, name: 'Earth Golem' },
])

const deck = ref([])

function onAdd(card) {
  const idx = collection.value.findIndex(c => c.id === card.id)

  if (idx !== -1) {
    collection.value.splice(idx, 1)
  }
}

function onRemove(card) {
  deck.value = deck.value.filter(c => c.id !== card.id)
  collection.value.push(card)
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background-color: var(--color-cyb-plum);
}
</style>
