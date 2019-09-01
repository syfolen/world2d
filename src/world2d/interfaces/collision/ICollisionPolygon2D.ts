
module world2d {

    /**
     * 多边型碰撞区域接口（效率最低）
     */
    export interface ICollisionPolygon2D extends ICollision2D, IPolygon2D {

        /**
         * 更新顶点数据
         */
        updateVertexs(x: number, y: number, vertexs: Array<IVector2D>): void;

        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        prepareSegments(): void;
    }
}