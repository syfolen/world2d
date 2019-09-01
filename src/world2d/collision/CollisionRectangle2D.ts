
module world2d {

    /**
     * 矩型碰撞区域（效率中等）
     */
    export class CollisionRectangle2D extends Collision2D implements ICollisionRectangle2D {
        /**
         * 矩形区域
         */
        left: number;
        right: number;
        top: number;
        bottom: number;

        /**
         * 项点数据，当矩型与圆和多边型发生碰撞时，需要使用顶点数据
         */
        vertexs: Array<IVector2D> = [];

        /**
         * 线段数据
         */
        segments: Array<IVector2D> = [];

        constructor() {
            super(CollisionShapEnum2D.RECTANGLE);
            // 初始化顶点数据
            for (let i: number = 0; i < 4; i++) {
                this.vertexs.push(new Vector2D(0, 0));
                this.segments.push(new Vector2D(0, 0));
            }
        }

        /**
         * 更新矩型区域
         */
        updateBounds(left: number, right: number, top: number, bottom: number): void {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }

        /**
         * 准备顶点数据（为矩型计算顶点信息）
         */
        prepareVertexs(): void {
            this.vertexs[0].assign(this.left, this.bottom);
            this.vertexs[1].assign(this.right, this.bottom);
            this.vertexs[2].assign(this.right, this.top);
            this.vertexs[3].assign(this.left, this.top);
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