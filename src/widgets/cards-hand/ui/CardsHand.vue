<template>
  <div ref="handRoot" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] pointer-events-none z-20" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch} from 'vue';
import { Application } from 'pixi.js';
import {renderCard} from "@/entities/cards/composables/renderCard.ts";
import {useGameStore} from "@/entities/player/model/gameStore.ts";
import {storeToRefs} from "pinia";
import { useCardDrag } from '@/features/card-drag/lib/useCardDrag';
import {getLaneIndexByGlobal} from "@/entities/lane/lib/getLaneIndexByGlobal.ts";

const props = defineProps<{ battlefieldRef: any }>();

const handRoot = ref<HTMLDivElement | null>(null);

const gameModel = useGameStore();

const { hand } = storeToRefs(gameModel)

let app: Application | null = null;

const pixiCards = ref([]);

function rerender() {
  if (!app) {
    return
  }

  app.stage.removeChildren();

  pixiCards.value = [];

  const padding = 8;

  hand.value.forEach((card, i) => {
    const cardSprite = renderCard(card, {
      x: i * (92 + padding),
      y: 10,
      interactive: true,
    });

    useCardDrag(cardSprite, {
      onDrop: (globalX) => {
        const battlefieldDiv = props.battlefieldRef?.container.value;

        if (!battlefieldDiv) {
          return cardSprite
        };

        const rect = battlefieldDiv.getBoundingClientRect();

        const laneIndex = getLaneIndexByGlobal(globalX, rect, 3);

        if (laneIndex !== null) {
          // Только если над полем — отправляем действие
          // playCard(card.id, laneIndex);

          // Для MVP: убираем карту из руки сразу
          hand.value.splice(i, 1);
        } else {
          // Возвращаем карту на место
          cardSprite.x = i * (92 + padding);

          cardSprite.y = 10;
        }
      },
    });

    app?.stage.addChild(cardSprite);

    pixiCards.value.push(cardSprite);
  });
}

onMounted(async () => {
  if (!handRoot.value) {
    return
  }

  app = new Application();

  await app.init({
    width: handRoot.value.clientWidth,
    height: handRoot.value.clientHeight,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  handRoot.value.appendChild(app.canvas);

  rerender();
});

watch(hand, rerender, { deep: true });
</script>
