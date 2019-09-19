
module world2d {

    /**
     * 碰撞体，用来保存对撞机数据模型在世界空间中的映射数据，包括绝对坐标，绝对矩形区域、圆绝对半径、多边形顶点的绝对坐标
     * 此对象仅仅是数据结构，不具有任何行为方法
     */
    export abstract class Collision2D implements ICollision2D {
        /**
         * 形状
         */
        protected $shap: CollisionShapEnum2D;

        /**
         * 坐标
         */
        x: number;
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