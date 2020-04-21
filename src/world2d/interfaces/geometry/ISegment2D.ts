
module world2d {
    /**
     * 线段接口
     */
    export interface ISegment2D {
        /**
         * 线段起点
         */
        a: IVector2D;

        /**
         * 线段终点
         */
        b: IVector2D;

        /**
         * 线段方向
         */
        ab: IVector2D;

        /**
         * 设置线段数据
         */
        assign(a: IVector2D, b: IVector2D): void;
    }
}