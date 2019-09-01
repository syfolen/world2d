
module world2d {

    /**
     * 矩型碰撞区域接口（效率中等）
     */
    export interface ICollisionRectangle2D extends ICollision2D, IBounds, IPolygon2D {

        /**
         * 准备顶点数据（为矩型计算顶点信息）
         */
        prepareVertexs(): void;

        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        prepareSegments(): void;
    }
}