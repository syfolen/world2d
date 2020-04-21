
module world2d {
    /**
     * 线段
     */
    export class Segment2D implements ISegment2D {
        /**
         * 线段起点
         */
        a: IVector2D = null;

        /**
         * 线段终点
         */
        b: IVector2D = null;

        /**
         * 线段方向
         */
        ab: IVector2D = new Vector2D(0, 0);

        /**
         * 设置线段数据
         */
        assign(a: IVector2D, b: IVector2D): void {
            this.a = a;
            this.b = b;
            this.ab.assign(b.x - a.x, b.y - a.y);
        }
    }
}