import type {CardType} from "@/entities/cards/model/cardType.ts";

export type CardFaction = 'gladiator' | 'hacker' | 'droid' | 'neutral';

export type CardTypeMode = 'unit' | 'spell';

export type Rarity = 'common' | 'rare' | 'mythic';

export type CardKeyword =
    | 'Overclock'
    | 'Glitch'
    | 'Absorb'
    | 'Protocol'
    | 'Silence'
    | 'On Play'
    | 'On Death';

export interface LaneUnit {
    card: CardTypeMode;
    instanceId: string; // уникален для каждой копии на поле
    owner: 'player' | 'opponent';
    power: number;
    buffs?: string[];
    silenced?: boolean;
    overclocked?: boolean;
}

export interface Lane {
    units: LaneUnit[];
    index: number;
    bonus?: string; // для будущих бонусов линии
}

export enum GamePhase {
    Start = 'Start',
    Draw = 'Draw',
    Play = 'Play',
    Reveal = 'Reveal',
    Resolve = 'Resolve',
    End = 'End'
}

export interface PlayerState {
    hand: CardType[];
    deck: CardType[];
    graveyard: CardType[];
    mana: number;
    maxMana: number;
    name: string;
    id: string;
}

export interface GameState {
    phase: GamePhase;
    player: PlayerState;
    opponent: PlayerState;
    lanes: Lane[];
    turn: number;
    winner?: 'player' | 'opponent' | null;
}
