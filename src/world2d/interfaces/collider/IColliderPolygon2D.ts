
module world2d {
    /**
     * 多边形对撞机接口
     */
    export interface IColliderPolygon2D extends ICollider2D {

        /**
         * 顶点数据
         */
        vertexs: IVector2D[];
    }
}