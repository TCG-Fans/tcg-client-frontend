<!--<template>-->
<!--  <div class="flex gap-6">-->
<!--    <div class="collection flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">-->
<!--      <draggable-->
<!--          v-model="collection"-->
<!--          group="cards"-->
<!--          item-key="id"-->
<!--          ghost-class="ghost"-->
<!--          :animation="200"-->
<!--      >-->
<!--        <template #item="{ element }">-->
<!--          <div class="bg-cyb-plum/10 p-4 rounded shadow touch-action-pan-y">{{ element.name }}</div>-->
<!--        </template>-->
<!--      </draggable>-->
<!--    </div>-->

<!--    <DeckComposer :deck="deck" @cardAdded="handleAdded" />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from 'vue'-->
<!--import draggable from 'vuedraggable'-->
<!--import DeckComposer from "@/entities/deck/ui/DeckComposer.vue";-->

<!--const collection = ref([{ id: 1, name: 'Fire Dragon' }, { id: 2, name: 'Water Sprite' }])-->
<!--const deck = ref([])-->

<!--function handleAdded(card) {-->
<!--  const idx = collection.value.findIndex(c => c.id === card.id)-->
<!--  if (idx !== -1) collection.value.splice(idx, 1)-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--.ghost {-->
<!--  opacity: 0.5;-->
<!--  border: 2px dashed #801d36;-->
<!--}-->
<!--</style>-->


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

    <DeckComposer
        class="fixed bottom-0"
        :initialDeck="deck"
        @cardAdded="onAdd"
        @cardRemoved="onRemove"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import DeckComposer from '@/entities/deck/ui/DeckComposer.vue'

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
  border: 2px dashed #801d36;
}
</style>
