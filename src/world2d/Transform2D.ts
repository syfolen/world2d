
module world2d {
    /**
     * 转换器，用来保存对撞机数据模型在世界空间中的坐标、旋转和缩放值，并提供变换的接口
     * export
     */
    export class Transform2D extends suncom.EventSystem implements ITransform2D {
        /**
         * 碰撞层级
         */
        private $layer: CollisionLayerEnum;

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
         * 是否有效（一次性值，默认为true，当其被置成false时，将永远不会被重置）
         */
        private $enabled: boolean = true;

        /**
         * 实体对象
         */
        private $entity: IEntity = null;

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
         * 碰撞次数，大于0说明对象发生了碰撞
         */
        hitNum: number = 0;

        /**
         * @vertexs: 原始顶点数据
         * export
         */
        constructor(entity: IEntity, collider: ICollider2D, rigidbody: IRigidbody2D, collision: ICollision2D) {
            super();
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

            const needUpdate: boolean = this.$needUpdate();
            const isModifiedByExtern: boolean = this.$isModifiedByExtern();

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
         * export
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
         * export
         */
        rotateTo(value: number): void {
            this.$updateRadian(value);
        }

        /**
         * 更新弧度（此方法将旋转角度限定在0到2PI之间）
         */
        private $updateRadian(radian: number): void {
            if (radian < 0) {
                radian %= suncom.Common.PI2;
                radian += suncom.Common.PI2;
            }
            else if (radian >= suncom.Common.PI2) {
                radian %= suncom.Common.PI2;
            }
            if (this.$rotateTo !== radian) {
                this.$rotateTo = radian;
                this.$rotation = suncom.Common.r2d(radian);
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
                const collision: ICollisionRectangle2D = this.$collision as ICollisionRectangle2D;
                collision.prepareVertexs();
                collision.prepareSegments();
            }
        }

        private $applyPosition(): void {
            // 多边形需要更新重组所有顶点的位置
            if (this.$collider.shap !== ColliderShapEnum2D.CIRCLE) {
                const collision: ICollisionPolygon2D = this.$collision as ICollisionPolygon2D;
                for (let i: number = 0; i < collision.vertexs.length; i++) {
                    const p: IVector2D = collision.vertexs[i];
                    p.x += this.$x;
                    p.y += this.$y;
                }
            }
        }

        private $applyRotate(): void {
            // 只有多边形对撞机才支持旋转
            if (this.$collider.shap === ColliderShapEnum2D.POLYGON) {
                const collision: ICollisionPolygon2D = this.$collision as ICollisionPolygon2D;
                for (let i: number = 0; i < collision.vertexs.length; i++) {
                    const p: IVector2D = collision.vertexs[i];
                    p.rotate(this.$radian);
                }
            }
        }

        private $applyScale(): void {
            if (this.$collision.shap === CollisionShapEnum2D.CIRCLE) {
                const collider: IColliderCircle2D = this.$collider as IColliderCircle2D;
                const collision: ICollisionCircle2D = this.$collision as ICollisionCircle2D;
                // 对半径进行缩放
                collision.radius = collider.radius * this.$scale;
            }
            else {
                const collider: IColliderPolygon2D = this.$collider as IColliderPolygon2D;
                const collision: IPolygon2D = this.$collision as any;
                // 对顶点向量进行缩放
                for (let i: number = 0; i < collider.vertexs.length; i++) {
                    const a: IVector2D = collider.vertexs[i];
                    const b: IVector2D = collision.vertexs[i];
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
                const collision: ICollisionPolygon2D = this.$collision as ICollisionPolygon2D;
                return collision.modified;
            }
            return false;
        }

        /**
         * 获取旋转角度
         * export
         */
        getRotation(): number {
            return this.$rotation;
        }

        /**
         * 设置旋转角度
         * export
         */
        setRotation(rotation: number): void {
            this.rotateTo(suncom.Common.d2r(rotation));
        }

        /**
         * 设置为无效
         * export
         */
        disabled(): void {
            this.$enabled = false;
        }

        /**
         * 碰撞层级
         */
        get layer(): CollisionLayerEnum {
            return this.$layer;
        }
        set layer(value: CollisionLayerEnum) {
            this.$layer = value;
            this.dispatchEvent(World2D.TRANSFORM_LAYER_CHANGED, this);
        }

        /**
         * 获取坐标
         * export
         */
        get x(): number {
            return this.$x;
        }
        /**
         * export
         */
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
         * 是否有效（一次性值，默认为true，当其被置成false时，将永远不会被重置）
         * export
         */
        get enabled(): boolean {
            return this.$enabled;
        }

        /**
         * 获取实体对象
         * export
         */
        get entity(): IEntity {
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
         * export
         */
        get collision(): ICollision2D {
            return this.$collision;
        }

        /**
         * 获取刚体
         * export
         */
        get rigidbody(): IRigidbody2D {
            return this.$rigidbody;
        }
    }
}