
module world2d {

    /**
     * 多边型碰撞区域（效率最低）
     */
    export class CollisionPolygon2D extends Collision2D implements ICollisionPolygon2D {
        /**
         * 顶点数据
         */
        vertexs: Array<IVector2D> = [];

        /**
         * 线段数据
         */
        segments: Array<IVector2D> = [];

        /**
         * 仅适用于多边型碰撞体
         */
        constructor(collider: IColliderPolygon2D) {
            super(CollisionShapEnum2D.POLYGON);
            for (let i: number = 0; i < collider.vertexs.length; i++) {
                const vertex: IVector2D = collider.vertexs[i];
                // 复制所有顶点信息作为碰撞数据
                this.vertexs.push(new Vector2D(collider.x + vertex.x, collider.y + vertex.y));
                // 初始化线段数据
                this.segments.push(new Vector2D(0, 0));
            }
        }

        /**
         * 更新顶点数据
         */
        updateVertexs(x: number, y: number, vertexs: Array<IVector2D>): void {
            for (let i: number = 0; i < vertexs.length; i++) {
                this.vertexs[i].x = x + vertexs[i].x;
                this.vertexs[i].y = y + vertexs[i].y;
            }
        }

        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        prepareSegments(): void {
            for (let i: number = 0; i < this.vertexs.length; i++) {
                const a: IVector2D = this.vertexs[i];
                const b: IVector2D = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                this.segments[i].assign(a.x - b.x, a.y - b.y);
            }
        }
    }
}