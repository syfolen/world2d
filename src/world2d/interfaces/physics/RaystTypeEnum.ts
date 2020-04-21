
module world2d {
    /**
     * 射线检测类型
     */
    export enum RaycastTypeEnum {
        /**
         * 返回检测到的任意对象（最快）
         * 说明：
         * 1. 由于射线检测的顺序并不是由距离射线起始点的远近来排序的，所以此类型射线返回的未必是射线碰到的第一个对象
         */
        ANY,

        /**
         * 返回射线碰到的最近的对象（默认，稍慢）
         */
        CLOSEST,

        ALL,

        ALL_CLOSEST
    }
}