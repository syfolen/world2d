
module world2d {

    /**
     * 对撞机
     */
    export abstract class Collider2D implements ICollider2D {
        /**
         * 形状
         */
        protected $shap: ColliderShapEnum2D;

        /**
         * 坐标
         */
        x: number;
        y: number;

        constructor(x: number, y: number, shap: ColliderShapEnum2D) {
            this.x = x;
            this.y = y;
            this.$shap = shap;
        }

        /**
         * 变形
         */
        abstract scale(value: number): void;

        /**
         * 旋转
         */
        abstract rotate(value: number): void;

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