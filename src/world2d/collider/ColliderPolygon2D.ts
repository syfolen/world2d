
module world2d {

    /**
     * 多边形对撞机
     */
    export class ColliderPolygon2D extends Collider2D implements IColliderPolygon2D {
        /**
         * 顶点数据
         */
        vertexs: Array<IVector2D>;

        constructor(vertexs: Array<IVector2D>) {
            super(ColliderShapEnum2D.POLYGON);
            this.vertexs = vertexs;
        }

        /**
         * 克隆
         */
        clone(): IColliderPolygon2D {
            const vertexs: Array<IVector2D> = [];
            for (let i: number = 0; i < this.vertexs.length; i++) {
                vertexs.push(this.vertexs[i].copy());
            }
            return new ColliderPolygon2D(vertexs);
        }
    }
}