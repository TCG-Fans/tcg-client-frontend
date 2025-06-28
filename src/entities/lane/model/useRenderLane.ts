import { Application, Graphics } from 'pixi.js';
import {ref} from "vue";

export function useRenderLane() {
    const lanes = ref<Graphics[]>([])

    function createLane(app: Application, index: number, total: number) {
        const zoneWidth = app.screen.width / total;
        const zoneHeight = app.screen.height;
        const margin = 12;

        const lane = new Graphics()
            .rect(index * zoneWidth + margin, margin, zoneWidth - margin * 2, zoneHeight - margin * 2)
            .fill({ color: 0x202432 })
            .stroke({ width: 6, color: 0x474fa6 });

        app.stage.addChild(lane);

        lanes.value.push(lane);

        return lane;
    }

    function highlightLane(app: Application, index: number, total: number) {
        const zoneWidth = app.screen.width / total;
        const zoneHeight = app.screen.height;
        const margin = 12;

        lanes.value.forEach((lane, i) => {
            lane.clear();
            lane
                .rect(i * zoneWidth + margin, margin, zoneWidth - margin * 2, zoneHeight - margin * 2)
                .fill({ color: 0x202432 })
                .stroke({
                    width: 6,
                    color: i === index ? 0xffde00 : 0x474fa6,
                });
        });
    }

    return  {
        createLane,
        highlightLane,
    }
}
