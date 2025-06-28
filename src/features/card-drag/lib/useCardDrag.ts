import type { Container } from 'pixi.js';

export function useCardDrag(
    cardSprite: Container,
    options: { onDrop?: (globalX: number, globalY: number) => void }
) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let origX = 0;
    let origY = 0;

    cardSprite.eventMode = 'static';
    cardSprite.cursor = 'pointer';

    cardSprite.on('pointerdown', (event: any) => {
        dragging = true;
        origX = cardSprite.x;
        origY = cardSprite.y;
        const pointer = event.data.global;
        offsetX = pointer.x - cardSprite.x;
        offsetY = pointer.y - cardSprite.y;
        cardSprite.zIndex = 99;
        cardSprite.alpha = 0.85;
    });

    cardSprite.on('pointerup', (event: any) => {
        if (dragging) {
            dragging = false;
            cardSprite.alpha = 1;
            cardSprite.zIndex = 1;
            const pointer = event.data.global;
            // debug:
            console.log('pointerup at', pointer.x, pointer.y);
            if (options.onDrop) options.onDrop(pointer.x, pointer.y);
        }
    });

    cardSprite.on('pointerupoutside', () => {
        if (dragging) {
            dragging = false;
            cardSprite.alpha = 1;
            cardSprite.x = origX;
            cardSprite.y = origY;
            cardSprite.zIndex = 1;
        }
    });

    cardSprite.on('pointermove', (event: any) => {
        if (dragging) {
            const pointer = event.data.global;
            cardSprite.x = pointer.x - offsetX;
            cardSprite.y = pointer.y - offsetY;
        }
    });
}
