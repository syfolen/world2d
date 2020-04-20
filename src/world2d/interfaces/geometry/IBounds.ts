
module world2d {
    /**
     * 图形边界对象接口
     */
    export interface IBounds {

        left: number;
        right: number;

        top: number;
        bottom: number;

        /**
         * 更新边界值
         */
        updateBounds(left: number, right: number, top: number, bottom: number): void;
    }
}