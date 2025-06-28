export function getLaneIndexByGlobal(globalX: number, battlefieldRect: DOMRect, lanes = 3): number | null {
    const { left, width } = battlefieldRect;

    const x = globalX - left;

    const laneWidth = width / lanes;

    if (x < 0 || x > width) {
        return null
    };

    return Math.floor(x / laneWidth)
}
