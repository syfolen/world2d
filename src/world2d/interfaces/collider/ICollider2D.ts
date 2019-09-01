
module world2d {

    /**
     * 对撞机接口
     */
    export interface ICollider2D extends IPoint2D {

        /**
         * 变形
         */
        scale(value: number): void;

        /**
         * 旋转
         */
        rotate(angle: number): void;

        /**
         * 克隆
         */
        clone(): ICollider2D;

        /**
         * 形状
         */
        readonly shap: ColliderShapEnum2D;
    }
}