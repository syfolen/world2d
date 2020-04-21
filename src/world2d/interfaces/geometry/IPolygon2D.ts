
module world2d {
    /**
     * 多边形数据对象接口
     */
    export interface IPolygon2D {
        /**
         * 项点数据
         */
        vertexs: IVector2D[];

        /**
         * 线段数据
         */
        segments?: ISegment2D[];
    }
}