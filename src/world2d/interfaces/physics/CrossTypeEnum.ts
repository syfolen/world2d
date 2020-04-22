
module world2d {
    /**
     * 线段相交类型枚举
     */
    export enum CrossTypeEnum {
        /**
         * 没有相交
         */
        NONE,

        /**
         * 相交于一点
         */
        CROSS,

        /**
         * 相交于两点（线段与图形专用）
         */
        CROSS_2,

        /**
         * 重叠（线段与线段专用）
         */
        OVERLAP,
    }
}