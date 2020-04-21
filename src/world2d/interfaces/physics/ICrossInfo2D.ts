
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
         * 是否相交
         */
        ok: boolean;
    }
}