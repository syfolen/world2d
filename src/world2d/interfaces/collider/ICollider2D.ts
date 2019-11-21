
module world2d {

    /**
     * 对撞机接口，仅用来保存对撞机的模型数据，如圆形对撞机的半径、多边形对撞机的顶点等，坐标、缩放、旋转等数据不在此模型中
     * export
     */
    export interface ICollider2D {
        
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