
module world2d {
    /**
     * 对撞机原始数据模型
     * export
     */
    export abstract class Collider2D implements ICollider2D {
        /**
         * 形状
         */
        protected $shap: ColliderShapEnum2D;

        constructor(shap: ColliderShapEnum2D) {
            this.$shap = shap;
        }

        /**
         * 克隆
         */
        abstract clone(): ICollider2D;

        /**
         * 形状
         */
        get shap(): ColliderShapEnum2D {
            return this.$shap;
        }
    }
}