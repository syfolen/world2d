
module world2d {

    /**
     * 碰撞体接口，用来保存对撞机数据模型在世界空间中的映射数据，包括矩形绝对区域、圆绝对半径和多边形的顶点绝对坐标
     */
    export interface ICollision2D extends IPoint2D {

        /**
         * 矩形区域
         */
        bounds: IBounds;

        /**
         * 更新矩形区域
         */
        updateBounds(): void;

        /**
         * 形状
         */
        readonly shap: CollisionShapEnum2D;
    }
}