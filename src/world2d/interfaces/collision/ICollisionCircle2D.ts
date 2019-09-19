
module world2d {

    /**
     * 圆形碰撞区域接口（效率最高）
     */
    export interface ICollisionCircle2D extends ICollision2D {
        /**
         * 半径
         */
        radius: number;
    }
}