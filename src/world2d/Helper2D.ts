
module world2d {
    /**
     * export
     */
    export namespace Helper2D {

        /**
         * 为一组顶点计算边界值
         */
        export function calculateBoundsForVertexs(vertexs: IVector2D[], bounds: IBounds): void {
            const p: IVector2D = vertexs[0];

            let left: number = p.x;
            let right: number = p.x;
            let top: number = p.y;
            let bottom: number = p.y;

            for (let i: number = 1; i < vertexs.length; i++) {
                const p: IVector2D = vertexs[i];
                if (left > p.x) {
                    left = p.x;
                }
                else if (right < p.x) {
                    right = p.x;
                }
                if (top > p.y) {
                    top = p.y;
                }
                else if (bottom < p.y) {
                    bottom = p.y;
                }
            }

            bounds.updateBounds(left, right, top, bottom);
        }
    }
}