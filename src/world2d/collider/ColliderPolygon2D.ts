
module world2d {

    /**
     * 多边形对撞机
     */
    export class ColliderPolygon2D extends Collider2D implements IColliderPolygon2D {
        /**
         * 顶点数据
         */
        vertexs: Array<IVector2D>;

        /**
         * @vertexs: 原始顶点数据
         */
        constructor(x: number, y: number, vertexs: Array<IVector2D>) {
            super(x, y, ColliderShapEnum2D.POLYGON);
            this.vertexs = vertexs;
        }

        /**
         * 变形
         */
        scale(value: number): void {
            for (let i: number = 0; i < this.vertexs.length; i++) {
                this.vertexs[i].mul(value);
            }
        }

        /**
         * 旋转
         */
        rotate(angle: number): void {
            for (let i: number = 0; i < this.vertexs.length; i++) {
                this.vertexs[i].rotate(angle);
            }
        }

        /**
         * 更新顶点数据
         * NOTE: 此更新并不会触发collision的刷新
         */
        updateVertexs(vertexs: Array<IVector2D>): void {
            for (let i: number = 0; i < vertexs.length; i++) {
                const vertex: IVector2D = vertexs[i];
                this.vertexs[i].assign(vertex.x, vertex.y);
            }
        }

        /**
         * 克隆
         */
        clone(): IColliderPolygon2D {
            const vertexs: Array<IVector2D> = [];
            for (let i: number = 0; i < this.vertexs.length; i++) {
                vertexs.push(this.vertexs[i].copy());
            }
            return new ColliderPolygon2D(this.x, this.y, vertexs);
        }
    }
}