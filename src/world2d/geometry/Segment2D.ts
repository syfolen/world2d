
module world2d {
    /**
     * 线段
     */
    export class Segment2D implements ISegment2D {
        /**
         * 线段起点
         */
        a: IVector2D = new Vector2D(0, 0);

        /**
         * 线段终点
         */
        b: IVector2D = new Vector2D(0, 0);

        /**
         * 线段方向
         */
        ab: IVector2D = new Vector2D(0, 0);
    }
}