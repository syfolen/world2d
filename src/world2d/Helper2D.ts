
module world2d {
    /**
     * export
     */
    export namespace Helper2D {
        /**
         * PI
         */
        export const PI: number = Math.PI;

        /**
         * 2PI
         */
        export const PI2: number = Math.PI * 2;

        /**
         * 整数的最大安全值
         */
        export const MAX_SAFE_INTEGER: number = 9007199254740991;

        /**
         * 整数的最小安全值
         */
        export const MIN_SAFE_INTEGER: number = -9007199254740991;

        /**
         * 角度换算为弧度
         * export
         */
        export function d2r(d: number): number {
            return d * Math.PI / 180;
        }

        /**
         * 弧度换算为角度
         * export
         */
        export function r2d(a: number): number {
            return a * 180 / Math.PI;
        }

        /**
         * 获取绝对值
         */
        export function abs(a: number): number {
            if (a < 0) {
                return -a;
            }
            else {
                return a;
            }
        }

        /**
         * 获取较小值
         */
        export function min(a: number, b: number): number {
            if (a < b) {
                return a;
            }
            else {
                return b;
            }
        }

        /**
         * 获取较大值
         */
        export function max(a: number, b: number): number {
            if (a > b) {
                return a;
            }
            else {
                return b;
            }
        }

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