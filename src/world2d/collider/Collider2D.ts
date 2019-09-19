
module world2d {

    /**
     * 对撞机接口，仅用来保存对撞机的模型数据，如圆形对撞机的半径、多边形对撞机的顶点坐标等，坐标、缩放、旋转等数据不在此模型中
     * 此对象仅仅是数据结构，不具有任何行为方法
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