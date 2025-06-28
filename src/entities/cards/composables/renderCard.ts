import { Container, Graphics, Text } from 'pixi.js';
import type {CardType} from "@/entities/cards/model/cardType.ts";

// Цвета фракций для обводки/градиента
const FACTION_COLORS: Record<string, number> = {
    gladiator: '0xff3656',
    hacker: '0x1de6f4',
    droid: '0x7de347',
    neutral: '0xbebebe',
};

export function renderCard(card: CardType, options?: { x?: number; y?: number; interactive?: boolean }) {
    const cardWidth = 92;
    const cardHeight = 130;
    const radius = 14;
    const color = FACTION_COLORS[card.faction] ?? 0xbebebe;

    const container = new Container();
    container.x = options?.x ?? 0;
    container.y = options?.y ?? 0;

    // Фон
    const bg = new Graphics()
        .roundRect(0, 0, cardWidth, cardHeight, radius)
        .fill({ color: 0x262c37 })
        .stroke({ width: 3, color, alignment: 1 });

    container.addChild(bg);

    // Имя
    const name = new Text({
        text: card.name,
        style: {
            fill: color,
            fontWeight: 'bold',
            fontSize: 15,
            wordWrap: true,
            wordWrapWidth: cardWidth - 16,
            align: 'center',
        },
    });

    name.x = cardWidth / 2 - name.width / 2;

    name.y = 8;

    container.addChild(name);

    // Power & cost
    if (card.power !== undefined) {
        const power = new Text({
            text: String(card.power),
            style: {
                fill: '#ffe266',
                fontSize: 21,
                fontWeight: 'bold',
                dropShadow: true,
            },
        });

        power.x = 8;

        power.y = cardHeight - 26;

        container.addChild(power);
    }

    const cost = new Text({
        text: String(card.cost),
        style: {
            fill: '#b0ceff',
            fontWeight: 'bold',
            fontSize: 16,
        },
    });

    cost.x = cardWidth - 28;
    cost.y = 8;
    container.addChild(cost);

    // Описание
    if (card.description) {
        const desc = new Text({
            text: card.description,
            style: {
                fill: '#bbbbbb',
                fontSize: 11,
                wordWrap: true,
                wordWrapWidth: cardWidth - 12,
            },
        });

        desc.x = 6;

        desc.y = cardHeight - desc.height - 6;

        container.addChild(desc);
    }

    // Включить интерактив
    if (options?.interactive) {
        container.eventMode = 'static';
        container.cursor = 'pointer';
    }

    return container;
}
