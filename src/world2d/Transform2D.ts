
module world2d {

    /**
     * 转换器，用来保存对撞机数据模型在世界空间中的坐标、旋转和缩放值，并提供变换的接口
     */
    export class Transform2D<T extends IEntity<any>> implements ITransform2D<T> {
        /**
         * 坐标
         */
        private $x: number = 0;
        private $y: number = 0;

        /**
         * 缩放
         */
        private $scale: number;
        private $scaleTo: number = 1;

        /**
         * 旋转（弧度）
         */
        private $radian: number;
        private $rotateTo: number = 0;

        /**
         * 旋转（角度）
         */
        private $rotation: number = 0;

        /**
         * 实体对象
         */
        private $entity: T = null;

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
        private $rigidbody: IRigidbody2D<T> = null;

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
        constructor(entity: T, collider: ICollider2D, rigidbody: IRigidbody2D<T>, collision: ICollision2D) {
            // 实体对象
            this.$entity = entity;
            // 碰撞体
            this.$collider = collider;
            // 刚体对象
            this.$rigidbody = rigidbody;
            // 碰撞区域
            this.$collision = collision;
            // 为刚体指定实体对象
            if (rigidbody !== null) { rigidbody.transform = this; }
        }

        /**
         * 2D世界通过调用此方法完成对象的数据转换与碰撞
         */
        transform(delta: number): void {
            // 物理模拟计算
            if (this.$rigidbody !== null) {
                this.$rigidbody.update(delta);
            }

            const needUpdate = this.$needUpdate();
            const isModifiedByExtern = this.$isModifiedByExtern();

            // 不需要更新数据
            if (needUpdate === false && isModifiedByExtern === false) {
                return;
            }

            // 无论是否从外部更新的数据，变形、旋转和位移的操作始终是有效的

            this.$scale = this.$scaleTo;
            this.$radian = this.$rotateTo;

            this.$collision.x = this.$x;
            this.$collision.y = this.$y;

            if (isModifiedByExtern === false) {
                // 注意这三个函数的调用顺序不可互换
                this.$applyScale();
                this.$applyRotate();
                this.$applyPosition();
            }
            // 必为多边形
            else {
                const collision: ICollisionPolygon2D = this.$collision as ICollisionPolygon2D;
                collision.prepareVertexs();
            }

            // 更新碰撞体数据
            this.$updateCollision();
        }

        /**
         * 移动
         */
        moveBy(x: number, y: number): void {
            this.$x += x;
            this.$y += y;
        }

        /**
         * 移动至
         */
        moveTo(x: number, y: number): void {
            this.$x = x;
            this.$y = y;
        }

        /**
         * 变形
         */
        scaleBy(value: number): void {
            this.$scaleTo *= value;
        }

        /**
         * 变形至
         */
        scaleTo(value: number): void {
            this.$scaleTo = value;
        }

        /**
         * 旋转（弧度）
         */
        rotateBy(value: number): void {
            this.$updateRadian(this.$rotateTo + value);
        }

        /**
         * 旋转至（弧度）
         */
        rotateTo(value: number): void {
            this.$updateRadian(value);
        }

        /**
         * 更新弧度（此方法将旋转角度限定在0到2PI之间）
         */
        private $updateRadian(radian: number): void {
            if (radian < 0) {
                radian %= Helper2D.PI2;
                radian += Helper2D.PI2;
            }
            else if (radian >= Helper2D.PI2) {
                radian %= Helper2D.PI2;
            }
            if (this.$rotateTo !== radian) {
                this.$rotateTo = radian;
                this.$rotation = Helper2D.r2d(radian);
            }
        }

        /**
         * 更新碰撞区域
         */
        private $updateCollision(): void {
            // 更新包围盒数据
            this.$collision.updateBounds();

            // 多边形还需要准备边数据
            if (this.$collision.shap === CollisionShapEnum2D.POLYGON) {
                const collision: ICollisionPolygon2D = this.$collision as ICollisionPolygon2D;
                collision.prepareSegments();
            }
            // 矩形还需要准备顶点数据和边数据
            else if (this.$collision.shap === CollisionShapEnum2D.RECTANGLE) {
                const collision = this.$collision as ICollisionRectangle2D;
                collision.prepareVertexs();
                collision.prepareSegments();
            }
        }

        private $applyPosition(): void {
            // 多边形需要更新重组所有顶点的位置
            if (this.$collider.shap !== ColliderShapEnum2D.CIRCLE) {
                const collision = this.$collision as CollisionPolygon2D;
                for (let i = 0; i < collision.vertexs.length; i++) {
                    const p = collision.vertexs[i];
                    p.x += this.$x;
                    p.y += this.$y;
                }
            }
        }

        private $applyRotate(): void {
            // 只有多边形对撞机才支持旋转
            if (this.$collider.shap === ColliderShapEnum2D.POLYGON) {
                const collision = this.$collision as ICollisionPolygon2D;
                for (let i = 0; i < collision.vertexs.length; i++) {
                    const p = collision.vertexs[i];
                    p.rotate(this.$radian);
                }
            }
        }

        private $applyScale(): void {
            if (this.$collision.shap === CollisionShapEnum2D.CIRCLE) {
                const collider = this.$collider as IColliderCircle2D;
                const collision = this.$collision as ICollisionCircle2D;
                // 对半径进行缩放
                collision.radius = collider.radius * this.$scale;
            }
            else {
                const collider = this.$collider as IColliderPolygon2D;
                const collision: IPolygon2D = this.$collision as any;
                // 对顶点向量进行缩放
                for (let i = 0; i < collider.vertexs.length; i++) {
                    const a = collider.vertexs[i];
                    const b = collision.vertexs[i];
                    b.assign(a.x, a.y).mul(this.$scale);
                }
            }
        }

        private $needUpdate(): boolean {
            if (this.$scale !== this.$scaleTo) {
                return true;
            }
            else if (this.$radian !== this.$rotateTo) {
                return true;
            }
            else if (this.$x !== this.$collision.x || this.$y !== this.$collision.y) {
                return true;
            }
            else {
                return false;
            }
        }

        private $isModifiedByExtern(): boolean {
            if (this.$collision.shap === CollisionShapEnum2D.POLYGON) {
                const collision = this.$collision as ICollisionPolygon2D;
                return collision.modified;
            }
            return false;
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
            this.rotateTo(Helper2D.d2r(rotation));
        }

        /**
         * 获取坐标
         */
        get x(): number {
            return this.$x;
        }
        get y(): number {
            return this.$y;
        }

        /**
         * 变形
         */
        get scale(): number {
            return this.$scaleTo;
        }

        /**
         * 旋转（弧度）
         */
        get rotation(): number {
            return this.$rotateTo;
        }

        /**
         * 获取实体对象
         */
        get entity(): T {
            return this.$entity;
        }

        /**
         * 对撞机
         */
        get collider(): ICollider2D {
            return this.$collider;
        }

        /**
         * 碰撞体
         */
        get collision(): ICollision2D {
            return this.$collision;
        }

        /**
         * 获取刚体
         */
        get rigidbody(): IRigidbody2D<T> {
            return this.$rigidbody;
        }
    }
}