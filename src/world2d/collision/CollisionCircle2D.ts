
module world2d {
    /**
     * 圆形碰撞区域（效率最高）
     * export
     */
    export class CollisionCircle2D extends Collision2D implements ICollisionCircle2D {
        /**
         * 半径
         * export
         */
        radius: number;

        /**
         * export
         */
        constructor(radius: number) {
            super(CollisionShapEnum2D.CIRCLE);
            // 默认半径
            this.radius = radius;
        }

        /**
         * 更新矩形区域
         */
        updateBounds(): void {
            this.bounds.updateBounds(this.x - this.radius, this.x + this.radius, this.y - this.radius, this.y + this.radius);
        }
    }
}