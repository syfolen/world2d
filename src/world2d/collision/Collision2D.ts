
module world2d {
    /**
     * 对撞机世界数据模型
     * export
     */
    export abstract class Collision2D implements ICollision2D {
        /**
         * 形状
         */
        protected $shap: CollisionShapEnum2D;

        /**
         * 坐标
         * export
         */
        x: number;

        /**
         * export
         */
        y: number;

        /**
         * 矩形区域
         */
        bounds: IBounds = new Bounds();

        constructor(shap: CollisionShapEnum2D) {
            this.$shap = shap;
        }

        /**
         * 更新矩形区域
         */
        abstract updateBounds(): void;

        /**
         * 形状
         */
        get shap(): CollisionShapEnum2D {
            return this.$shap;
        }
    }
}