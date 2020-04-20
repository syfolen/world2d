
module world2d {
    /**
     * 图形边界对象
     */
    export class Bounds implements IBounds {

        left: number;
        right: number;

        top: number;
        bottom: number;

        /**
         * 更新边界数据
         */
        updateBounds(left: number, right: number, top: number, bottom: number): void {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
    }
}