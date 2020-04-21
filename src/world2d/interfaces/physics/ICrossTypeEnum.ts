
module world2d {
    /**
     * 线段交叉类型枚举
     */
    export enum ICrossTypeEnum {
        /**
         * 没有发生交叉
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