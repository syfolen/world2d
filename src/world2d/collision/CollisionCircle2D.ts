
module world2d {

    /**
     * 圆形碰撞区域（效率最高）
     */
    export class CollisionCircle2D extends Collision2D implements ICollisionCircle2D {
        /**
         * 坐标
         */
        x: number;
        y: number;

        /**
         * 半径
         */
        radius: number;

        constructor(radius: number) {
            super(CollisionShapEnum2D.CIRCLE);
            // 默认半径
            this.radius = radius;
        }

        /**
         * 更新碰撞区域
         */
        updateBounds(x: number, y: number, radius: number): void {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
    }
}