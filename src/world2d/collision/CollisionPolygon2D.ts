
module world2d {
    /**
     * 多边型碰撞区域（效率最低）
     */
    export class CollisionPolygon2D extends Collision2D implements ICollisionPolygon2D {
        /**
         * 临时顶点数据
         */
        private $tempVertexs: IPoint2D[] = null;

        /**
         * 顶点数据
         */
        vertexs: IVector2D[] = [];

        /**
         * 线段数据
         */
        segments: ISegment2D[] = [];

        constructor(collider: IColliderPolygon2D) {
            super(CollisionShapEnum2D.POLYGON);
            for (let i: number = 0; i < collider.vertexs.length; i++) {
                const vertex: IVector2D = collider.vertexs[i];
                // 复制所有顶点信息作为碰撞数据
                this.vertexs.push(vertex.copy());
                // 初始化线段数据
                this.segments.push(new Segment2D());
            }
        }

        /**
         * 更新矩形区域
         */
        updateBounds(): void {
            Helper2D.calculateBoundsForVertexs(this.vertexs, this.bounds);
        }

        /**
         * 更新顶点数据
         */
        updateVertexs(vertexs: IPoint2D[]): void {
            this.$tempVertexs = vertexs;
        }

        /**
         * 准备顶点数据
         */
        prepareVertexs(): void {
            for (let i: number = 0; i < this.$tempVertexs.length; i++) {
                const a: IVector2D = this.vertexs[i];
                const b: IPoint2D = this.$tempVertexs[i];
                a.assign(b.x, b.y);
            }
            this.$tempVertexs = null;
        }

        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        prepareSegments(): void {
            for (let i: number = 0; i < this.vertexs.length; i++) {
                const segment: ISegment2D = this.segments[i];
                segment.a = this.vertexs[i];
                segment.b = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                const a: IVector2D = this.vertexs[i];
                const b: IVector2D = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                this.segments[i].assign(a, b);
            }
        }

        /**
         * 顶点数据是否被修改过
         */
        get modified(): boolean {
            return this.$tempVertexs !== null;
        }
    }
}