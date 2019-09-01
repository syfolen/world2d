
module world2d {

    /**
     * 圆形对撞机
     */
    export class ColliderCircle2D extends Collider2D implements IColliderCircle2D {
        /**
         * 半径
         */
        radius: number;

        constructor(x: number, y: number, radius: number) {
            super(x, y, ColliderShapEnum2D.CIRCLE);
            this.radius = radius;
        }

        /**
         * 变形
         */
        scale(value: number): void {
            this.radius *= value;
        }

        /**
         * 旋转
         */
        rotate(angle: number): void {
            // 圆形不需要实现旋转操作
        }

        /**
         * 克隆
         */
        clone(): IColliderCircle2D {
            return new ColliderCircle2D(this.x, this.y, this.radius);
        }
    }
}