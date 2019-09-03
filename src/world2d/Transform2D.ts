
module world2d {

    /**
     * 物理数据转化对象
     */
    export class Transform2D implements ITransform2D {
        /**
         * 对撞机
         */
        private $collider: ICollider2D;

        /**
         * 碰撞区域
         */
        private $collision: ICollision2D;

        /**
         * 刚体
         */
        private $rigidbody: IRigidbody2D = null;

        /**
         * 矩型包围盒
         */
        private $bounds: IBounds;

        /**
         * 缩放值
         */
        private $scale: number = 1;

        /**
         * 旋转（弧度）
         */
        private $angle: number = 0;

        /**
         * 旋转度
         */
        private $rotation: number = 0;

        /**
         * 属性是否发生改变
         */
        private $modified: boolean = false;

        /**
         * 层级
         */
        layer: CollisionLayerEnum;

        /**
         * 碰撞次数，大于0说明对象发生了碰撞
         */
        hitNum: number = 0;

        /**
         * @vertexs: 原始顶点数据
         */
        constructor(collider: ICollider2D, rigidbody: IRigidbody2D, collision: ICollision2D) {
            // 碰撞体
            this.$collider = collider;
            // 刚体对象
            this.$rigidbody = rigidbody;
            // 碰撞区域
            this.$collision = collision;
            // 为刚体指定实体对象
            if (rigidbody !== null) {
                rigidbody.transform = this;
            }
            // 创建包围盒
            this.$bounds = new Bounds();
            // 更新包围盒数据
            this.$updateBounds();
            // 更新碰撞区域
            if (collision !== null) {
                this.$updateCollision();
            }
        }

        /**
         * 2D世界通过调用此方法完成对象的数据转换与碰撞
         */
        transform(delta: number): void {
            // 物理模拟计算
            if (this.$rigidbody !== null) {
                this.$rigidbody.update(delta);
            }
            // 若数据未发生变化，则直接返回
            if (this.$modified === false) {
                return;
            }
            // 标记数据未变化
            this.$modified = false;
            // 更新包围盒数据
            this.$updateBounds();
            // 更新碰撞区域
            this.$updateCollision();
        }

        /**
         * 注册碰撞回调
         */
        registerCollideHandler(type: CollisionType, method: Function, caller: Object): void {

        }

        /**
         * 碰撞产生
         */
        onCollisionEnter(other: ITransform2D): void {

        }

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        onCollisionStay(other: ITransform2D): void {

        }

        /**
         * 碰撞结束
         */
        onCollisionExit(other: ITransform2D): void {

        }

        /**
         * 移动
         */
        moveBy(x: number, y: number): void {
            this.$collider.x += x;
            this.$collider.y += y;
            this.$modified = true;
        }

        /**
         * 移动至
         */
        moveTo(x: number, y: number): void {
            this.$collider.x = x;
            this.$collider.y = y;
            this.$modified = true;
        }

        /**
         * 变形
         */
        scaleBy(value: number): void {
            this.$scale += value;
            this.$collider.scale(1 / this.$scale + value);
            this.$modified = true;
        }

        /**
         * 变形至
         */
        scaleTo(value: number): void {
            this.$collider.scale(value / this.$scale);
            this.$scale = value;
            this.$modified = true;
        }

        /**
         * 旋转（弧度）
         */
        rotateBy(angle: number): void {
            this.$collider.rotate(angle);
            this.$updateAngle(this.$angle + angle);
            // 多边型在旋转之后需要更新矩形显示区域
            if (this.$collider.shap == ColliderShapEnum2D.POLYGON) {
                this.$modified = true;
            }
        }

        /**
         * 旋转至（弧度）
         */
        rotateTo(angle: number): void {
            this.$collider.rotate(angle - this.$angle);
            this.$updateAngle(angle);
            // 多边型在旋转之后需要更新矩形显示区域
            if (this.$collider.shap == ColliderShapEnum2D.POLYGON) {
                this.$modified = true;
            }
        }

        /**
         * 更新旋转角度（此方法将旋转角度限定在0到360之间）
         */
        private $updateAngle(angle: number): void {
            if (angle < 0) {
                angle %= Helper2D.PI2;
                angle += Helper2D.PI2;
            }
            else if (angle >= Helper2D.PI2) {
                angle %= Helper2D.PI2;
            }
            this.$angle = angle;
            this.$rotation = Helper2D.a2d(angle);
        }

        /**
         * 获取旋转角度
         */
        getRotation(): number {
            return this.$rotation;
        }

        /**
         * 设置旋转角度
         */
        setRotation(rotation: number): void {
            this.rotateTo(Helper2D.d2a(rotation));
        }

        /**
         * 更新包围盒数据
         */
        private $updateBounds(): void {
            const x: number = this.$collider.x;
            const y: number = this.$collider.y;

            // 更新碰撞边界
            if (this.$collider.shap === ColliderShapEnum2D.CIRCLE) {
                const collider: IColliderCircle2D = this.$collider as IColliderCircle2D;

                const x: number = collider.x;
                const y: number = collider.y;
                const radius: number = collider.radius;

                this.$bounds.updateBounds(x - radius, x + radius, y - radius, y + radius);
            }
            else {
                const collider: IColliderPolygon2D = this.$collider as IColliderPolygon2D;

                const x: number = collider.x;
                const y: number = collider.y;
                const vertexs: Array<IVector2D> = collider.vertexs;

                const vertex: IVector2D = vertexs[0];

                let left: number = vertex.x;
                let right: number = vertex.x;
                let top: number = vertex.y;
                let bottom: number = vertex.y;

                for (let i: number = 1; i < vertexs.length; i++) {
                    const vertex: IVector2D = vertexs[i];
                    if (vertex.x < left) {
                        left = vertex.x;
                    }
                    else if (vertex.x > right) {
                        right = vertex.x;
                    }
                    if (vertex.y < top) {
                        top = vertex.y;
                    }
                    else if (vertex.y > bottom) {
                        bottom = vertex.y;
                    }
                }

                this.$bounds.updateBounds(x + left, x + right, y + top, y + bottom);
            }
        }

        /**
         * 更新碰撞区域
         */
        private $updateCollision(): void {
            // 圆形需要更新坐标和半径
            if (this.$collision.shap === CollisionShapEnum2D.CIRCLE) {
                const collider: IColliderCircle2D = this.$collider as IColliderCircle2D;
                const collision: ICollisionCircle2D = this.$collision as ICollisionCircle2D;
                collision.updateBounds(collider.x, collider.y, collider.radius);
            }
            // 矩形直接以包围盒数据作为更新
            else if (this.$collision.shap === CollisionShapEnum2D.RECTANGLE) {
                const collision: ICollisionRectangle2D = this.$collision as ICollisionRectangle2D;
                collision.updateBounds(this.$bounds.left, this.$bounds.right, this.$bounds.top, this.$bounds.bottom);
                // 矩形还需要准备顶点数据
                collision.prepareVertexs();
                // 准备边数据
                collision.prepareSegments();
            }
            // 多边形需要更新顶点数据
            else {
                const collider: IColliderPolygon2D = this.$collider as IColliderPolygon2D;
                const collision: ICollisionPolygon2D = this.$collision as ICollisionPolygon2D;
                // 更新坐标和顶点数据
                collision.updateVertexs(collider.x, collider.y, collider.vertexs);
                // 多边形还需要准备边数据
                collision.prepareSegments();
            }
        }

        /**
         * 获取坐标
         */
        get x(): number {
            return this.$collider.x;
        }
        get y(): number {
            return this.$collider.y;
        }

        /**
         * 变形
         */
        get scale(): number {
            return this.$scale;
        }

        /**
         * 旋转（弧度）
         */
        get rotation(): number {
            return this.$angle;
        }

        /**
         * 包围盒
         */
        get bounds(): IBounds {
            return this.$bounds;
        }

        /**
         * 获取碰撞体
         */
        get collider(): ICollider2D {
            return this.$collider;
        }

        /**
         * 碰撞区域
         */
        get collision(): ICollision2D {
            return this.$collision;
        }

        /**
         * 获取刚体
         */
        get rigidbody(): IRigidbody2D {
            return this.$rigidbody;
        }
    }
}