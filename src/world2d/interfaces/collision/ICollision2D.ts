
module world2d {

    /**
     * 碰撞区域接口
     */
    export interface ICollision2D {
        /**
         * 形状
         */
        readonly shap: CollisionShapEnum2D;
    }
}