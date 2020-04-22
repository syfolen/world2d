
module world2d {
    /**
     * 线段相交信息
     */
    export interface ICrossInfo2D {
        /**
         * 相交点
         */
        p: IVector2D;

        /**
         * 相交近点
         */
        // p1: IVector2D;

        /**
         * 相交远点（存在于线段重叠时）
         */
        // p2: IVector2D;

        /**
         * 相交结果
         */
        type: CrossTypeEnum;
    }
}