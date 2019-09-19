
module world2d {

    /**
     * 圆形对撞机接口
     */
    export interface IColliderCircle2D extends ICollider2D {

        /**
         * 半径
         */
        radius: number;
    }
}