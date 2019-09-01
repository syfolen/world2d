
module world2d {

    /**
     * 碰撞区域
     */
    export abstract class Collision2D implements ICollision2D {
        /**
         * 形状
         */
        protected $shap: CollisionShapEnum2D;

        constructor(shap: CollisionShapEnum2D) {
            this.$shap = shap;
        }

        /**
         * 形状
         */
        get shap(): CollisionShapEnum2D {
            return this.$shap;
        }
    }
}