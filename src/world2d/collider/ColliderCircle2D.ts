
module world2d {

    /**
     * 圆形对撞机
     */
    export class ColliderCircle2D extends Collider2D implements IColliderCircle2D {
        /**
         * 半径
         */
        radius: number;

        constructor(radius: number) {
            super(ColliderShapEnum2D.CIRCLE);
            this.radius = radius;
        }

        /**
         * 克隆
         */
        clone(): IColliderCircle2D {
            return new ColliderCircle2D(this.radius);
        }
    }
}