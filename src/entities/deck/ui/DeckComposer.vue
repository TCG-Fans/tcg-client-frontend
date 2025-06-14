<template>
  <section
      class="deck-builder bg-cyb-base p-4 rounded-xl shadow-lg w-full overflow-x-auto"
  >
    <h2 class="text-lg font-bold mb-2">Колода ({{ deck.length }})</h2>

    <draggable
        v-model="deck"
        group="cards"
        item-key="id"
        ghost-class="ghost"
        :animation="200"
        direction="horizontal"
        class="flex space-x-2"
        @change="handleChange"
    >
      <template #item="{ element }">
        <div class="card-item bg-white p-2 rounded shadow flex items-center flex-none">
          {{ element.name }}
          <button
              class="text-cyb-red ml-2"
              @click.stop="remove(element)"
          >
            ×
          </button>
        </div>
      </template>
    </draggable>

    <p v-if="deck.length === 0" class="text-gray-500">Перетащи сюда карту</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
  initialDeck: { type: Array, default: () => [] }
})
const emit = defineEmits(['cardAdded', 'cardRemoved'])

const deck = ref([...props.initialDeck])

function handleChange(evt) {
  if (evt.added) {
    emit('cardAdded', evt.added.element)
  }
}

function remove(card) {
  const idx = deck.value.findIndex(c => c.id === card.id)
  if (idx !== -1) {
    deck.value.splice(idx, 1)
    emit('cardRemoved', card)
  }
}
</script>

<style scoped>
.deck-builder {
  max-height: 70vh;
  overflow-y: auto;
  width: calc(100% - 16px);
}

.ghost {
  opacity: 0.4;
  border: 2px dashed #00ffe0;
}

/* Увеличение hit-area для тач-действий */
.deck-builder .card-item {
  touch-action: pan-y;
}
</style>

<!--<style scoped>-->
<!--.deck-builder {-->
<!--  max-height: 30vh;-->
<!--}-->
<!--.ghost {-->
<!--  opacity: 0.4;-->
<!--  border: 2px dashed #00ffe0;-->
<!--}-->

<!--</style>-->
