import { Application } from 'pixi.js';
import {useRenderLane} from "@/entities/lane/model/useRenderLane.ts";

export function usePixiBattlefield(container: HTMLDivElement) {
    const {  createLane, highlightLane }  = useRenderLane()

    const app = new Application();

    app.init({
        width: container.clientWidth,
        height: container.clientHeight,
        background: '#16191e',
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    }).then(() => {
        container.appendChild(app.canvas);

        // Рисуем 3 линии
        for (let i = 0; i < 3; i++) {
            createLane(app, i, 3);
        }
    });


    // expose highlightLane для использования из drag'n'drop
    return { highlightLane };
}
