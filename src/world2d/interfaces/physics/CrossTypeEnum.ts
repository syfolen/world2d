
module world2d {
    /**
     * 线段交叉类型枚举
     */
    export enum CrossTypeEnum {
        /**
         * 没有交叉
         */
        NONE,

        /**
         * 交叉于一点
         */
        CROSS,

        /**
         * 重叠
         */
        OVERLAP,
    }
}