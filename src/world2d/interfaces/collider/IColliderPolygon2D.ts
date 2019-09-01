
module world2d {

    /**
     * 多边形对撞机接口
     */
    export interface IColliderPolygon2D extends ICollider2D, IPolygon2D {

        /**
         * 更新顶点数据
         * NOTE: 此更新并不会触发collision的刷新
         */
        updateVertexs(vertexs: Array<IVector2D>): void;
    }
}