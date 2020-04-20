
module world2d {
    /**
     * export
     */
    export abstract class Helper2D {
        /**
         * PI
         */
        static PI: number = Math.PI;

        /**
         * 2PI
         */
        static PI2: number = Math.PI * 2;

        /**
         * 角度换算为弧度
         * export
         */
        static d2r(d: number): number {
            return d * Math.PI / 180;
        }

        /**
         * 弧度换算为角度
         * export
         */
        static r2d(a: number): number {
            return a * 180 / Math.PI;
        }

        /**
         * 获取绝对值
         */
        static abs(a: number): number {
            if (a < 0) {
                return -a;
            }
            return a;
        }

        /**
         * 获取较小值
         */
        static min(a: number, b: number): number {
            return a < b ? a : b;
        }

        /**
         * 获取较大值
         */
        static max(a: number, b: number): number {
            return a > b ? a : b;
        }

        /**
         * 为一组顶点计算边界值
         */
        static calculateBoundsForVertexs(vertexs: IVector2D[], bounds: IBounds): void {
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