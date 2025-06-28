import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {CardType} from "@/entities/cards/model/cardType.ts";
import {GamePhase} from "@/shared/gameTypes/types.ts";

export const useGameStore = defineStore('game', () => {
    // const hand = ref<CardType[]>([]);
    const hand = ref<CardType[]>([
        {
            id: 65537,
            attributes: {},
            imageUrl: '',
            name: 'Razor Grunt',
            power: 2,
            cost: 1,
            faction: 'gladiator',
            rarity: 'common',
            type: 'unit',
            description: 'Overclock: +1 Power',
            // keywords: ['Overclock'],
        },
        {
            id: 65539,
            attributes: {},
            imageUrl: '',
            name: 'Stim Junkie',
            power: 1,
            cost: 1,
            faction: 'gladiator',
            rarity: 'common',
            type: 'unit',
            description: 'On Play: Another Gladiator gains +1 Power this turn',
            // keywords: ['On Play'],
        },
        // ...добавь сколько нужно для теста
    ]);

    const lanes = ref<[]>([]);
    const mana = ref(1);
    const phase = ref<GamePhase>(GamePhase.Start);
    const deck = ref<CardType[]>([]);
    const graveyard = ref<CardType[]>([]);

    function updateGameState(newState: any) {
        hand.value = newState.hand;
        lanes.value = newState.lanes;
        mana.value = newState.mana;
        phase.value = newState.phase;
        deck.value = newState.deck;
        graveyard.value = newState.graveyard;
    }

    return { hand, lanes, mana, phase, deck, graveyard, updateGameState };
});
