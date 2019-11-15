export module world2d {

    /**
     * 碰撞体形状枚举
     */
    export enum ColliderShapEnum2D {
        /**
         * 圆型
         */
        CIRCLE = 0,

        /**
         * 多边型
         */
        POLYGON
    }

    /**
     * 碰撞层级
     */
    export enum CollisionLayerEnum {
        /**
         * 默认
         */
        DEFAULT = 0x1,

        /**
         * 鱼
         */
        FISH = 0x2,

        /**
         * 子弹
         */
        BULLET = 0x4,

        POLYGON = 0x8,

        CIRCLE = 0x10,

        RECTANLE = 0x20,

        /**
         * 鱼的子集
         */
        FISH_2 = 0x40,

        /**
         * 锁定的子弹
         */
        BULLET_2 = 0x80,

        ALL = 0x1000
    }

    /**
     * 碰撞区域形状枚举
     */
    export enum CollisionShapEnum2D {
        /**
         * 圆型
         */
        CIRCLE = 0,

        /**
         * 多边型
         */
        POLYGON,

        /**
         * 矩形
         */
        RECTANGLE
    }

    /**
     * 碰撞类型
     */
    export enum CollisionType {
        /**
         * 发生碰撞
         */
        COLLISION_ENTER = 0,

        /**
         * 保持碰撞
         */
        COLLISION_STAY,

        /**
         * 结束碰撞
         */
        COLLISION_EXIT
    }

    /**
     * 图形边界对象接口
     */
    export interface IBounds {

        left: number;
        right: number;

        top: number;
        bottom: number;

        /**
         * 更新边界值
         */
        updateBounds(left: number, right: number, top: number, bottom: number): void;
    }

    /**
     * 对撞机接口，仅用来保存对撞机的模型数据，如圆形对撞机的半径、多边形对撞机的顶点等，坐标、缩放、旋转等数据不在此模型中
     */
    export interface ICollider2D {
        
        /**
         * 克隆
         */
        clone(): ICollider2D;

        /**
         * 形状
         */
        readonly shap: ColliderShapEnum2D;
    }

    /**
     * 圆形对撞机接口
     */
    export interface IColliderCircle2D extends ICollider2D {

        /**
         * 半径
         */
        radius: number;
    }

    /**
     * 多边形对撞机接口
     */
    export interface IColliderPolygon2D extends ICollider2D {

        /**
         * 顶点数据
         */
        vertexs: Array<IVector2D>;
    }

    export interface ICollisionContact2D {

        /**
         * 检测是否相撞
         */
        test(): void;

        /**
         * 执行碰撞回调
         */
        doCollide(type: CollisionType): void;

        /**
         * 碰撞对象
         */
        readonly a: ITransform2D;

        /**
         * 碰撞对象
         */
        readonly b: ITransform2D;

        /**
         * 相撞标记
         */
        readonly touching: boolean;
    }

    export interface ICollisionDetector {
        /**
         * 层级a
         */
        a: CollisionLayerEnum;

        /**
         * 层级b
         */
        b: CollisionLayerEnum;
    }

    /**
     * 实体对象接口
     */
    export interface IEntity {

        /**
         * 碰撞产生
         */
        onCollisionEnter(other: IEntity): void;

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        onCollisionStay(other: IEntity): void;

        /**
         * 碰撞结束
         */
        onCollisionExit(other: IEntity): void;

        /**
         * 物理数据转换器
         */
        readonly transform: ITransform2D<IEntity>;
    }

    /**
     * 点接口
     */
    export interface IPoint2D {
        /**
         * 坐标
         */
        x: number;
        y: number;
    }

    /**
     * 多边形数据对象接口
     */
    export interface IPolygon2D {
        /**
         * 项点数据
         */
        vertexs: Array<IVector2D>;

        /**
         * 线段数据
         */
        segments?: Array<IVector2D>;
    }

    /**
     * 刚体接口
     */
    export interface IRigidbody2D {
        /**
         * 物理对象
         */
        transform: ITransform2D;

        /**
         * 追踪的目标
         */
        target: ITransform2D;

        /**
         * 移动速度
         */
        moveSpeed: number;

        /**
         * 扭矩（最大转向角度）
         */
        torque: number;

        /**
         * 更新数据
         */
        update(delta: number): void;
    }

    /**
     * 线段接口
     */
    export interface ISegment2D {
        /**
         * 线段起点
         */
        a: IVector2D;

        /**
         * 线段终点
         */
        b: IVector2D;

        /**
         * 线段方向
         */
        ab: IVector2D;
    }

    /**
     * 转换器接口，用来保存对撞机数据模型在世界空间中旋转和缩放值，并提供变换的接口
     */
    export interface ITransform2D extends suncom.IEventSystem {
        /**
         * 层级
         */
        layer: CollisionLayerEnum;

        /**
         * 碰撞次数，大于0说明对象发生了碰撞
         */
        hitNum: number;

        /**
         * 2D世界通过调用此方法完成对象的数据转换与碰撞
         */
        transform(delta: number): void;

        /**
         * 移动
         */
        moveBy(x: number, y: number): void;

        /**
         * 移动至
         */
        moveTo(x: number, y: number): void;

        /**
         * 变形
         */
        scaleBy(value: number): void;

        /**
         * 变形至
         */
        scaleTo(value: number): void;

        /**
         * 旋转（弧度）
         */
        rotateBy(rotation: number): void;

        /**
         * 旋转至（弧度）
         */
        rotateTo(rotation: number): void;

        /**
         * 获取旋转角度
         */
        getRotation(): number;

        /**
         * 设置旋转角度
         */
        setRotation(rotation: number): void;

        /**
         * 设置为无效
         */
        disabled(): void;

        /**
         * 坐标
         */
        readonly x: number;
        readonly y: number;

        /**
         * 变形
         */
        readonly scale: number;

        /**
         * 旋转（弧度）
         */
        readonly rotation: number;

        /**
         * 是否有效（一次性值，默认为true，当其被置成false时，将永远不会被重置）
         */
        readonly enabled: boolean;

        /**
         * 实体对象
         */
        readonly entity: IEntity;

        /**
         * 对撞机
         */
        readonly collider: ICollider2D;

        /**
         * 碰撞区域
         */
        readonly collision: ICollision2D;

        /**
         * 刚体
         */
        readonly rigidbody: IRigidbody2D;
    }

    /**
     * 向量接口
     */
    export interface IVector2D extends IPoint2D {
        /**
         * 赋值
         */
        assign(x: number, y: number): IVector2D;

        /**
         * 相加
         */
        add(a: IPoint2D): IVector2D;

        /**
         * 相减
         */
        sub(a: IVector2D): IVector2D;

        /**
         * 相乘
         */
        mul(value: number): IVector2D;

        /**
         * 点积
         */
        dot(a: IVector2D): number;

        /**
         * 叉积
         */
        cross(a: IVector2D): number;

        /**
         * 归零
         */
        zero(): IVector2D;

        /**
         * 取反
         */
        negate(): IVector2D;

        /**
         * 旋转（弘度）
         */
        rotate(radian: number): IVector2D;

        /**
         * 向量与x轴之间的弧度
         */
        angle(): number;

        /**
         * 返回新的向量作为当前向量的法向量
         * NOTE：法向量与向量相交，且相互垂直，向量的法向量为(-y,x)或(y,-x)
         */
        normal(): IVector2D;

        /**
         * 归一
         */
        normalize(): IVector2D;

        /**
         * 长量
         */
        length(): number;

        /**
         * 计算到指定位置的距离
         */
        distanceTo(p: IPoint2D): number;

        /**
         * 计算到指定位置的距离平方
         */
        distanceToSquared(p: IPoint2D): number;

        /**
         * 拷贝
         */
        copy(): IVector2D;

        /**
         * 输出字符串
         */
        toString(): string;
    }

    /**
     * 简单2D物理
     * 特性：
     * 1. 碰撞实现，包括旋转和缩放
     * 2. 移动实现，包括速度和扭矩
     * 需求来自：
     * 1. 捕鱼达人
     */
    export interface IWorld2D {

        /**
         * 更新物理
         */
        update(delta: number): void;

        /**
         * 添加对象
         * @layer: 默认为 CollisionLayerEnum.DEFAULT
         */
        addTransform(transform: ITransform2D, layer?: CollisionLayerEnum): void;

        /**
         * 移除对象
         */
        removeTransform(transform: ITransform2D): void;

        /**
         * 指定碰撞层级
         */
        addDetector(a: CollisionLayerEnum, b: CollisionLayerEnum): void;

        /**
         * 对象集合
         */
        readonly transforms: Array<ITransform2D>;
    }

    /**
     * 圆形数据对象接口
     */
    export interface ICircle2D extends IPoint2D {
        /**
         * 半径
         */
        radius: number;
    }

    /**
     * 碰撞体接口，用来保存对撞机数据模型在世界空间中的映射数据，包括矩形绝对区域、圆绝对半径和多边形的顶点绝对坐标
     */
    export interface ICollision2D extends IPoint2D {

        /**
         * 矩形区域
         */
        bounds: IBounds;

        /**
         * 更新矩形区域
         */
        updateBounds(): void;

        /**
         * 形状
         */
        readonly shap: CollisionShapEnum2D;
    }

    /**
     * 圆形碰撞区域接口（效率最高）
     */
    export interface ICollisionCircle2D extends ICollision2D {
        /**
         * 半径
         */
        radius: number;
    }

    /**
     * 多边型碰撞区域接口（效率最低）
     */
    export interface ICollisionPolygon2D extends ICollision2D, IPolygon2D {

        /**
         * 更新顶点数据
         */
        updateVertexs(vertexs: Array<IPoint2D>): void;

        /**
         * 准备顶点数据
         */
        prepareVertexs(): void;

        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        prepareSegments(): void;

        /**
         * 顶点数据是否被修改过
         */
        readonly modified: boolean;
    }

    /**
     * 矩型碰撞区域接口（效率中等）
     */
    export interface ICollisionRectangle2D extends ICollision2D, IPolygon2D {
        
        /**
         * 准备顶点数据（为矩型计算顶点信息）
         */
        prepareVertexs(): void;

        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        prepareSegments(): void;
    }

    /**
     * 图形边界对象
     */
    export class Bounds implements IBounds {

        left: number;
        right: number;

        top: number;
        bottom: number;

        /**
         * 更新边界数据
         */
        updateBounds(left: number, right: number, top: number, bottom: number): void {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
    }

    /**
     * 对撞机接口，仅用来保存对撞机的模型数据，如圆形对撞机的半径、多边形对撞机的顶点坐标等，坐标、缩放、旋转等数据不在此模型中
     * 此对象仅仅是数据结构，不具有任何行为方法
     */
    export abstract class Collider2D implements ICollider2D {
        /**
         * 形状
         */
        protected $shap: ColliderShapEnum2D;

        constructor(shap: ColliderShapEnum2D) {
            this.$shap = shap;
        }

        /**
         * 克隆
         */
        abstract clone(): ICollider2D;

        /**
         * 形状
         */
        get shap(): ColliderShapEnum2D {
            return this.$shap;
        }
    }

    /**
     * 圆形对撞机
     */
    export class ColliderCircle2D extends Collider2D implements IColliderCircle2D {
        /**
         * 半径
         */
        radius: number;

        constructor(radius: number) {
            super(ColliderShapEnum2D.CIRCLE);
            this.radius = radius;
        }

        /**
         * 克隆
         */
        clone(): IColliderCircle2D {
            return new ColliderCircle2D(this.radius);
        }
    }

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
            for (let i = 0; i < this.vertexs.length; i++) {
                vertexs.push(this.vertexs[i].copy());
            }
            return new ColliderPolygon2D(vertexs);
        }
    }

    /**
     * 碰撞体，用来保存对撞机数据模型在世界空间中的映射数据，包括绝对坐标，绝对矩形区域、圆绝对半径、多边形顶点的绝对坐标
     * 此对象仅仅是数据结构，不具有任何行为方法
     */
    export abstract class Collision2D implements ICollision2D {
        /**
         * 形状
         */
        protected $shap: CollisionShapEnum2D;

        /**
         * 坐标
         */
        x: number;
        y: number;

        /**
         * 矩形区域
         */
        bounds: IBounds = new Bounds();

        constructor(shap: CollisionShapEnum2D) {
            this.$shap = shap;
        }

        /**
         * 更新矩形区域
         */
        abstract updateBounds(): void;

        /**
         * 形状
         */
        get shap(): CollisionShapEnum2D {
            return this.$shap;
        }
    }

    /**
     * 圆形碰撞区域（效率最高）
     */
    export class CollisionCircle2D extends Collision2D implements ICollisionCircle2D {
        /**
         * 半径
         */
        radius: number;

        constructor(radius: number) {
            super(CollisionShapEnum2D.CIRCLE);
            // 默认半径
            this.radius = radius;
        }

        /**
         * 更新矩形区域
         */
        updateBounds(): void {
            this.bounds.updateBounds(this.x - this.radius, this.x + this.radius, this.y - this.radius, this.y + this.radius);
        }
    }

    export class CollisionContact2D implements ICollisionContact2D {
        /**
         * 是否使用box2d的碰撞算法
         * NOTE: box2d中的碰撞算法效率很高，但并不精确
         */
        useBox2d: boolean = false;

        /**
         * 是否检测包围盒
         */
        private $testAABB: boolean = true;

        /**
         * 碰撞检测函数
         */
        private $testFunc: Function;

        /**
         * 对象 a
         */
        private $a: ITransform2D;

        /**
         * 对象 b
         */
        private $b: ITransform2D;

        /**
         * 相撞标记
         */
        private $touching: boolean = false;

        constructor(a: ITransform2D, b: ITransform2D) {
            if (a.collision.shap === CollisionShapEnum2D.CIRCLE) {
                this.$a = a;
                this.$b = b;
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2c;
                    // 圆对圆不需要检测包围盒
                    this.$testAABB = false;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    this.$testFunc = this.$c2r;
                }
                else {
                    this.$testFunc = this.$c2p;
                }
            }
            else if (a.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$a = b;
                    this.$b = a;
                    this.$testFunc = this.$c2r;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    this.$a = a;
                    this.$b = b;
                    this.$testFunc = this.$r2r;
                    // 矩型对矩型不需要检测包围盒
                    this.$testAABB = false;
                }
                else {
                    this.$a = a;
                    this.$b = b;
                    this.$testFunc = this.$r2p;
                }
            }
            else {
                this.$a = b;
                this.$b = a;
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2p;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    this.$testFunc = this.$r2p;
                }
                else {
                    this.$testFunc = this.$p2p;
                }
            }
        }

        /**
         * 检测是否相撞
         */
        test(): void {
            const a: ITransform2D = this.$a;
            const b: ITransform2D = this.$b;

            /**
             * 捕鱼专属开始
             */

            // 找出子弹和鱼
            let x: ITransform2D, y: ITransform2D;
            if (a.rigidbody !== null) {
                x = a;
                y = b;
            }
            else {
                x = b;
                y = a;
            }

            // 若x己锁定了目标，且目标有效，且目标不为y，则不检测碰撞
            if (x.rigidbody.target !== null && x.rigidbody.target !== y) {
                return;
            }

            /**
             * 捕鱼专属结束
             */

            let collide: boolean = this.$testAABB == false ? true : CollisionResolution2D.bounds2Bounds(a.collision.bounds, b.collision.bounds);

            // 若包围盒发生碰撞，则继续检测
            if (collide === true) {
                collide = this.$testFunc.call(this, a.collision, b.collision);
            }

            if (collide === true) {
                if (this.$touching === false) {
                    this.$touching = true;
                    this.doCollide(CollisionType.COLLISION_ENTER);
                }
                else {
                    this.doCollide(CollisionType.COLLISION_STAY);
                }
            }
            else if (this.$touching === true) {
                this.$touching = false;
                this.doCollide(CollisionType.COLLISION_EXIT);
            }
        }

        doCollide(type: CollisionType): void {
            const a: ITransform2D = this.$a;
            const b: ITransform2D = this.$b;

            if (type === CollisionType.COLLISION_ENTER) {
                a.hitNum++;
                b.hitNum++;
                a.entity.onCollisionEnter(b.entity);
                b.entity.onCollisionEnter(a.entity);
            }
            else if (type === CollisionType.COLLISION_EXIT) {
                a.hitNum--;
                b.hitNum--;
                a.entity.onCollisionExit(b.entity);
                b.entity.onCollisionExit(a.entity);
            }
            else {
                a.entity.onCollisionStay(b.entity);
                b.entity.onCollisionStay(a.entity);
            }
        }

        /**
         * 圆与圆
         */
        private $c2c(a: ICircle2D, b: ICircle2D): boolean {
            return CollisionResolution2D.circle2Circle(a, b);
        }

        /**
         * 矩型与圆
         */
        private $c2r(c: ICollisionCircle2D, r: ICollisionRectangle2D): boolean {
            return CollisionResolution2D.circle2Polygin(c, r);
        }

        /**
         * 多边型与圆
         */
        private $c2p(a: ICollisionCircle2D, b: ICollisionPolygon2D): boolean {
            let collide: boolean;
            if (this.useBox2d === true) {
                collide = CollisionResolutionBox2D.circle2Polygon(a, a.radius, b.vertexs);
            }
            else {
                collide = CollisionResolution2D.circle2Polygin(a, b);
            }
            return collide;
        }

        /**
         * 矩型与矩型
         */
        private $r2r(): boolean {
            // 直接返回边框的碰撞结果
            return CollisionResolution2D.bounds2Bounds(this.$a.collision.bounds, this.$b.collision.bounds);
        }

        /**
         * 矩型与多边型
         */
        private $r2p(r: ICollisionRectangle2D, p: ICollisionPolygon2D): boolean {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.polygon2Polygon(r.vertexs, p.vertexs);
            }
            return CollisionResolution2D.polygon2Vertexs(p, r.vertexs);
        }

        /**
         * 多边形与多边形
         */
        private $p2p(p1: ICollisionPolygon2D, p2: ICollisionPolygon2D): boolean {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.polygon2Polygon(p1.vertexs, p2.vertexs);
            }
            return CollisionResolution2D.polygon2Vertexs(p1, p2.vertexs) && CollisionResolution2D.polygon2Vertexs(p2, p1.vertexs);
        }

        get a(): ITransform2D {
            return this.$a;
        }

        get b(): ITransform2D {
            return this.$b;
        }

        /**
         * 相撞标记
         */
        get touching(): boolean {
            return this.$touching;
        }
    }

    /**
     * 多边型碰撞区域（效率最低）
     */
    export class CollisionPolygon2D extends Collision2D implements ICollisionPolygon2D {
        /**
         * 临时顶点数据
         */
        private $tempVertexs: Array<IPoint2D> = null;

        /**
         * 顶点数据
         */
        vertexs: Array<IVector2D> = [];

        /**
         * 线段数据
         */
        segments: Array<IVector2D> = [];

        constructor(collider: IColliderPolygon2D) {
            super(CollisionShapEnum2D.POLYGON);
            for (let i: number = 0; i < collider.vertexs.length; i++) {
                const vertex: IVector2D = collider.vertexs[i];
                // 复制所有顶点信息作为碰撞数据
                this.vertexs.push(vertex.copy());
                // 初始化线段数据
                this.segments.push(new Vector2D(0, 0));
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
        updateVertexs(vertexs: Array<IPoint2D>): void {
            this.$tempVertexs = vertexs;
        }

        /**
         * 准备顶点数据
         */
        prepareVertexs(): void {
            for (let i: number = 0; i < this.$tempVertexs.length; i++) {
                const a = this.vertexs[i];
                const b = this.$tempVertexs[i];
                a.assign(b.x, b.y);
            }
            this.$tempVertexs = null;
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

        /**
         * 顶点数据是否被修改过
         */
        get modified(): boolean {
            return this.$tempVertexs !== null;
        }
    }

    /**
     * 矩型碰撞区域（效率中等）
     */
    export class CollisionRectangle2D extends Collision2D implements ICollisionRectangle2D {
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
            for (let i = 0; i < 4; i++) {
                this.vertexs.push(new Vector2D(0, 0));
                this.segments.push(new Vector2D(0, 0));
            }
        }

        /**
         * 更新矩型区域
         */
        updateBounds(): void {
            Helper2D.calculateBoundsForVertexs(this.vertexs, this.bounds);
        }

        /**
         * 准备顶点数据（为矩型计算顶点信息）
         */
        prepareVertexs(): void {
            this.vertexs[0].assign(this.bounds.left, this.bounds.bottom);
            this.vertexs[1].assign(this.bounds.right, this.bounds.bottom);
            this.vertexs[2].assign(this.bounds.right, this.bounds.top);
            this.vertexs[3].assign(this.bounds.left, this.bounds.top);
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

    /**
     * 2D碰撞检测
     */
    export abstract class CollisionResolution2D {

        /**
         * 包围盒与包围盒
         */
        static bounds2Bounds(a: Bounds, b: Bounds): boolean {
            if (a.left > b.right || b.left > a.right || a.top > b.bottom || b.top > a.bottom) {
                return false;
            }
            return true;
        }

        /**
         * 圆与圆
         */
        static circle2Circle(a: ICircle2D, b: ICircle2D): boolean {
            // 坐标差
            const dx: number = b.x - a.x;
            const dy: number = b.y - a.y;
            // 两圆半径和
            const dr: number = a.radius + b.radius;
            // 若两圆距离大于半径和，则未碰撞
            if (dx * dx + dy * dy > dr * dr) {
                return false;
            }
            return true;
        }

        /**
         * 检测圆与多边形是否相交
         */
        static circle2Polygin(c: ICircle2D, d: IPolygon2D): boolean {
            // 多边形顶点数据
            const vertexs: Array<IVector2D> = d.vertexs;
            // 半径平方
            const radiusSquared: number = c.radius * c.radius;

            // 与圆最近的顶点
            let nearestVertex: IVector2D = null;
            // 最小距离
            let nearestDistanceSquared: number = Number.MAX_VALUE;
            // 最小距离是否小于或等于半径
            let distanceLessOrEqualThanRadius: boolean = false;

            // 计算与圆最近的顶点
            for (let i: number = 0; i < vertexs.length; i++) {
                const vertex: IVector2D = vertexs[i];
                const distance: number = vertex.distanceToSquared(c);
                // 若最小距离的平方小于或等于半径平方，则返回
                if (distance <= radiusSquared) {
                    distanceLessOrEqualThanRadius = true;
                    break;
                }
                if (distance < nearestDistanceSquared) {
                    nearestVertex = vertex;
                    nearestDistanceSquared = distance;
                }
            }

            // 若顶点与圆心的距离小于半径，则碰撞
            if (distanceLessOrEqualThanRadius === true) {
                return true;
            }

            // 以圆心到距离最近的顶点组成的线段的法向量为投影线，计算投影是否重合
            const a: IVector2D = new Vector2D(c.x, c.y);
            const b: IVector2D = nearestVertex.copy();
            const ab: IVector2D = new Vector2D(b.x - a.x, b.y - a.y);
            const normal: IVector2D = ab.normal();
            // DrawAPI2D.drawNormal(normal, "#FFFFFF");

            // 获取参与判断的圆上的点
            const p: IVector2D = ab.copy().normalize().mul(c.radius).add(a);
            // DrawAPI2D.drawLine(a, p, "#FF0000");
            // 若p与多边形顶点的顶影不重合，则不相交
            if (CollisionResolution2D.$vertex2VertexInDirection([p], vertexs, normal) === false) {
                return false;
            }

            const array: Array<IVector2D> = [a, b];
            const segments: Array<IVector2D> = d.segments;

            // 检测圆与多边形顶点在多边形每条边的方向上的投影是否重合
            for (let i: number = 0; i < segments.length; i++) {
                const segment: IVector2D = segments[i];
                if (segment.length() === 0) {
                    continue;
                }
                // 获取这条边的法向量，并且以半径的倍数放大
                normal.assign(segment.y, -segment.x).normalize().mul(c.radius);
                // 根据法向量获取圆上的两个点
                a.assign(c.x, c.y).add(normal);
                b.assign(c.x, c.y).sub(normal);
                // DrawAPI2D.drawLine(c, a, "#FF0000");
                // DrawAPI2D.drawLine(c, b, "#FF0000");
                // 判断多边型顶点与圆顶点的投影是否相交
                if (CollisionResolution2D.$vertex2VertexInDirection(array, vertexs, segment) === false) {
                    return false;
                }
            }

            return true;
        }

        /**
         * 判断两组顶点在指定方向上产生的投影是否重叠
         */
        private static $vertex2VertexInDirection(array: Array<IVector2D>, array2: Array<IVector2D>, direction: IVector2D): boolean {
            /**
             * y=kx+b => k=y/x; b=y-kx;
             * x=my+n => m=x/y; n=x-my;
             * 若k大于-1且小于1，则取b值作比较
             * 否则取n值作比较
             */
            const k: number = direction.y / direction.x;
            const m: number = direction.x / direction.y;

            let min1: number = Number.MAX_VALUE;
            let max1: number = -Number.MAX_VALUE;
            let min2: number = Number.MAX_VALUE;
            let max2: number = -Number.MAX_VALUE;

            let x: number = 0, y: number = 0;
            let collide: boolean = false;

            if (k < -1 || k > 1) {
                while (x < array.length || y < array2.length) {
                    if (x < array.length) {
                        const p: IVector2D = array[x];
                        const b: number = p.x - m * p.y;
                        // DrawAPI2D.drawLine(p, new Vector2D(b, 0), "#FF0000");
                        if (min1 > b) {
                            min1 = b;
                        }
                        if (max1 < b) {
                            max1 = b;
                        }
                        x++;
                    }
                    if (y < array2.length) {
                        const p: IVector2D = array2[y];
                        const b: number = p.x - m * p.y;
                        // DrawAPI2D.drawLine(p, new Vector2D(b, 0), "#FF0000");
                        if (min2 > b) {
                            min2 = b;
                        }
                        if (max2 < b) {
                            max2 = b;
                        }
                        y++;
                    }
                    // 若（max1 < min2 || min1 > max2）成立，则投影未相交，若己相交，则产生碰撞
                    if ((max1 < min2 || min1 > max2) === false) {
                        collide = true;
                        break;
                    }
                }
            }
            else {
                while (x < array.length || y < array2.length) {
                    if (x < array.length) {
                        const p: IVector2D = array[x];
                        const b: number = p.y - k * p.x;
                        // DrawAPI2D.drawLine(p, new Vector2D(0, b), "#FF0000");
                        if (min1 > b) {
                            min1 = b;
                        }
                        if (max1 < b) {
                            max1 = b;
                        }
                        x++;
                    }
                    if (y < array2.length) {
                        const p: IVector2D = array2[y];
                        const b: number = p.y - k * p.x;
                        // DrawAPI2D.drawLine(p, new Vector2D(0, b), "#FF0000");
                        if (min2 > b) {
                            min2 = b;
                        }
                        if (max2 < b) {
                            max2 = b;
                        }
                        y++;
                    }
                    // 若（max1 < min2 || min1 > max2）成立，则投影未相交，若己相交，则产生碰撞
                    if ((max1 < min2 || min1 > max2) === false) {
                        collide = true;
                        break;
                    }
                }
            }
            return collide;
        }

        /**
         * 判断一组顶点与多边型顶点在多边型每条边的法线上的投影是否全部重合
         * @polygon: 多边形
         * @vertexs: 顶点数据
         */
        static polygon2Vertexs(polygon: IPolygon2D, vertexs: Array<IVector2D>): boolean {
            const array: Array<IVector2D> = polygon.vertexs;
            const segments: Array<IVector2D> = polygon.segments;

            for (let i: number = 0; i < segments.length; i++) {
                const segment: IVector2D = segments[i];
                if (segment.length() === 0) {
                    continue;
                }
                // 若未碰撞，则直接返回
                if (CollisionResolution2D.$vertex2VertexInDirection(array, vertexs, segments[i]) === false) {
                    return false;
                }
            }
            // 默认返回己碰撞
            return true;
        }

        /**
         * 判断两直线是否相交
         * @a,b: 需要参与判断的两条线段
         * @a1,a2: 线段a的两个点
         * @b1,b2: 线段b的两个点
         */
        static line2Line(a: IVector2D, a1: IVector2D, a2: IVector2D, b: IVector2D, b1: IVector2D, b2: IVector2D): boolean {
            return CollisionResolution2D.isLineBetweenPoints(a1, a, b1, b2) && CollisionResolution2D.isLineBetweenPoints(b1, b, a1, a2);
        }

        /**
         * 判断点p1和p2是否在线段ab两侧
         * @a: 线段ab上的一个点
         * @ab: 线段的方向向量
         * @p1,p2: 需要判断的两个点
         * 思路：将点a,p1,p2沿ab方线投射到x或y轴，若点a的投影在ab中间，则返回true，否则返回false
         */
        static isLineBetweenPoints(a: IVector2D, ab: IVector2D, p1: IVector2D, p2: IVector2D): boolean {
            // 若向量ab的x为0，则说明ab垂直于x轴，此时点的投影线必定与y轴平行，故可直接比较三个点的x值
            if (ab.x === 0) {
                // DrawAPI2D.drawLine(new Vector2D(a.x, 0), a, cc.Color.YELLOW);
                // DrawAPI2D.drawLine(new Vector2D(p1.x, 0), p1, cc.Color.YELLOW);
                // DrawAPI2D.drawLine(new Vector2D(p2.x, 0), p2, cc.Color.YELLOW);
                return CollisionResolution2D.isXbetweenAandB(a.x, p1.x, p2.x);
            }
            // 若向量ab的y为0，则说明ab垂直于y轴，此时点的投影线必定与x轴平行，故可直接比较三个点的y值
            else if (ab.y === 0) {
                // DrawAPI2D.drawLine(new Vector2D(0, a.y), a, cc.Color.YELLOW);
                // DrawAPI2D.drawLine(new Vector2D(0, p1.y), p1, cc.Color.YELLOW);
                // DrawAPI2D.drawLine(new Vector2D(0, p2.y), p2, cc.Color.YELLOW);
                return CollisionResolution2D.isXbetweenAandB(a.y, p1.y, p2.y);
            }
            else {
                const k: number = ab.y / ab.x;
                // 若k>-1且小于1，则应当将点投影到y轴上，此时可直接比较投影线在y轴上的截距, y=kx+b=>b=y-kx;
                if (k > -1 && k < 1) {
                    const b: number = a.y - k * a.x;
                    const p1b: number = p1.y - k * p1.x;
                    const p2b: number = p2.y - k * p2.x;
                    // DrawAPI2D.drawLine(new Vector2D(0, b), a, cc.Color.YELLOW);
                    // DrawAPI2D.drawLine(new Vector2D(0, p1b), p1, cc.Color.YELLOW);
                    // DrawAPI2D.drawLine(new Vector2D(0, p2b), p2, cc.Color.YELLOW);
                    return CollisionResolution2D.isXbetweenAandB(b, p1b, p2b);
                }
                // 否则应当将点投影到x轴上，此时可直接比较投影线在x轴上的截距, x=my+n=>n=x-my;
                else {
                    const m: number = ab.x / ab.y;
                    const n: number = a.x - m * a.y;
                    const p1n: number = p1.x - m * p1.y;
                    const p2n: number = p2.x - m * p2.y;
                    // DrawAPI2D.drawLine(new Vector2D(n, 0), a, cc.Color.YELLOW);
                    // DrawAPI2D.drawLine(new Vector2D(p1n, 0), p1, cc.Color.YELLOW);
                    // DrawAPI2D.drawLine(new Vector2D(p2n, 0), p2, cc.Color.YELLOW);
                    return CollisionResolution2D.isXbetweenAandB(n, p1n, p2n);
                }
            }
        }

        /**
         * 判断a与b是否在x两侧
         */
        static isXbetweenAandB(x: number, a: number, b: number): boolean {
            if (a > b) {
                const t: number = a;
                a = b;
                b = t;
            }
            if (a <= x && x <= b) {
                return true;
            }
            return false;
        }
    }

    /**
     * Box2D的碰撞检测算法
     */
    export abstract class CollisionResolutionBox2D {

        static testBounds(a: IBounds, b: IBounds): boolean {
            if (a.left > b.right || a.right < b.left || a.top < b.bottom || a.bottom > b.top) {
                return false;
            }
            return true;
        }

        static circle2Polygon(p: IPoint2D, radius: number, polygon: Array<IVector2D>): boolean {
            var position = p;
            if (CollisionResolutionBox2D.pointInPolygon(position, polygon)) {
                return true;
            }

            for (var i = 0, l = polygon.length; i < l; i++) {
                var start = i === 0 ? polygon[polygon.length - 1] : polygon[i - 1];
                var end = polygon[i];

                if (CollisionResolutionBox2D.pointLineDistance(position, start, end, true) < radius) {
                    return true;
                }
            }

            return false;
        }

        static polygon2Polygon(a: Array<IVector2D>, b: Array<IVector2D>): boolean {
            var i, l;

            // check if a intersects b
            for (i = 0, l = a.length; i < l; ++i) {
                var a1 = a[i];
                var a2 = a[(i + 1) % l];

                if (CollisionResolutionBox2D.line2Polygon(a1, a2, b))
                    return true;
            }

            // check if a contains b
            for (i = 0, l = b.length; i < l; ++i) {
                if (CollisionResolutionBox2D.pointInPolygon(b[i], a))
                    return true;
            }

            // check if b contains a
            for (i = 0, l = a.length; i < l; ++i) {
                if (CollisionResolutionBox2D.pointInPolygon(a[i], b))
                    return true;
            }

            return false;
        }

        static pointInPolygon(point: IPoint2D, polygon: Array<IVector2D>): boolean {
            var inside = false;
            var x = point.x;
            var y = point.y;

            // use some raycasting to test hits
            // https://github.com/substack/point-in-polygon/blob/master/index.js
            var length = polygon.length;

            for (var i = 0, j = length - 1; i < length; j = i++) {
                var xi = polygon[i].x, yi = polygon[i].y,
                    xj = polygon[j].x, yj = polygon[j].y,
                    intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

                if (intersect) inside = !inside;
            }

            return inside;
        }

        static pointLineDistance(point: IPoint2D, start: IVector2D, end: IVector2D, isSegment: boolean): number {
            var dx = end.x - start.x;
            var dy = end.y - start.y;
            var d = dx * dx + dy * dy;
            var t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / d;
            var p;

            if (!isSegment) {
                p = new Vector2D(start.x + t * dx, start.y + t * dy);
            }
            else {
                if (d) {
                    if (t < 0) p = start;
                    else if (t > 1) p = end;
                    else p = new Vector2D(start.x + t * dx, start.y + t * dy);
                }
                else {
                    p = start;
                }
            }

            dx = point.x - p.x;
            dy = point.y - p.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        static line2Polygon(a1: IVector2D, a2: IVector2D, b: Array<IVector2D>): boolean {
            var length = b.length;

            for (var i = 0; i < length; ++i) {
                var b1 = b[i];
                var b2 = b[(i + 1) % length];

                if (CollisionResolutionBox2D.line2Line(a1, a2, b1, b2))
                    return true;
            }

            return false;
        }

        static line2Line(a1: IVector2D, a2: IVector2D, b1: IVector2D, b2: IVector2D): boolean {
            var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

            if (u_b !== 0) {
                var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
                var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);

                var ua = ua_t / u_b;
                var ub = ub_t / u_b;

                if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
                    return true;
                }
            }

            return false;
        }
    }

    export abstract class DrawAPI2D {

        static graphics: Laya.Graphics;

        static clear(): void {
            DrawAPI2D.graphics.clear();
        }

        static draw(transforms: Array<ITransform2D>): void {
            // 绘制坐标系
            // DrawAPI2D.graphics.drawLine(Global.WIDTH * 0.5, 0, Global.WIDTH * 0.5, Global.WIDTH, "#FF0000");
            // DrawAPI2D.graphics.drawLine(0, Global.HEIGHT * 0.5, Global.WIDTH, Global.HEIGHT * 0.5, "#FF0000");

            // 绘制所有包围盒
            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                const bounds: IBounds = transform.collision.bounds;
                DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, "#FF0000");
            }

            // 绘制所有对撞机
            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    const collision = transform.collision as ICollisionCircle2D;
                    DrawAPI2D.drawCircle(transform.x, transform.y, collision.radius, "#FF0000");
                }
                else if (transform.collision.shap === CollisionShapEnum2D.POLYGON) {
                    const collision = transform.collision as ICollisionPolygon2D;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, "#FF0000");
                }
                else {
                    const collision = transform.collision as ICollisionRectangle2D;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, "#FF0000");
                }
            }

            // 绘制所有碰撞体
            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                const lineColor: string = transform.hitNum === 0 ? "#0000FF" : "#00FF00";
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    const collision: ICollisionCircle2D = transform.collision as ICollisionCircle2D;
                    DrawAPI2D.drawCircle(transform.x, transform.y, collision.radius, lineColor);
                }
                else if (transform.collision.shap === CollisionShapEnum2D.POLYGON) {
                    const collision: ICollisionPolygon2D = transform.collision as ICollisionPolygon2D;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, lineColor);
                }
                else {
                    const bounds = transform.collision.bounds;
                    DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, lineColor);
                }
            }
        }

        static drawLine(a: IPoint2D, b: IVector2D, lineColor: string): void {
            DrawAPI2D.graphics.drawLine(a.x, a.y, b.x, b.y, lineColor);
        }

        static drawNormal(a: IVector2D, lineColor: string): void {
            const normal: IVector2D = a.copy().normalize().mul(1000);
            DrawAPI2D.graphics.drawLine(a.x, a.y, -a.x, -a.y, lineColor);
        }

        static drawRect(x: number, y: number, width: number, height: number, lineColor: string): void {
            DrawAPI2D.graphics.drawRect(x, y, width, height, void 0, lineColor);
        }

        static drawCircle(x: number, y: number, radius: number, lineColor: string): void {
            DrawAPI2D.graphics.drawCircle(x, y, radius, void 0, lineColor);
        }

        static drawPolygon(x: number, y: number, vertexs: Array<IVector2D>, lineColor: string): void {
            for (let i: number = 0; i < vertexs.length; i++) {
                const a: IVector2D = vertexs[i];
                const b: IVector2D = i === 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                DrawAPI2D.graphics.drawLine(a.x + x, a.y + y, b.x + x, b.y + y, lineColor);
            }
        }
    }

    export abstract class Helper2D {
        /**
         * PI
         */
        static PI: number = Math.PI;

        /**
         * 2PI
         */
        static PI2: number = Math.PI * 2;

        /**
         * 角度换算为弧度
         */
        static d2r(d: number): number {
            return d * Math.PI / 180;
        }

        /**
         * 弧度换算为角度
         */
        static r2d(a: number): number {
            return a * 180 / Math.PI;
        }

        /**
         * 获取绝对值
         */
        static abs(a: number): number {
            if (a < 0) {
                return -a;
            }
            return a;
        }

        /**
         * 获取较小值
         */
        static min(a: number, b: number): number {
            return a < b ? a : b;
        }

        /**
         * 获取较大值
         */
        static max(a: number, b: number): number {
            return a > b ? a : b;
        }

        /**
         * 为一组顶点计算边界值
         */
        static calculateBoundsForVertexs(vertexs: Array<IVector2D>, bounds: IBounds): void {
            const p = vertexs[0];

            let left = p.x;
            let right = p.x;
            let top = p.y;
            let bottom = p.y;

            for (let i = 1; i < vertexs.length; i++) {
                const p = vertexs[i];
                if (left > p.x) {
                    left = p.x;
                }
                else if (right < p.x) {
                    right = p.x;
                }
                if (top > p.y) {
                    top = p.y;
                }
                else if (bottom < p.y) {
                    bottom = p.y;
                }
            }

            bounds.updateBounds(left, right, top, bottom);
        }
    }

    /**
     * 物理类
     */
    export class Physics {

        /**
         * 返回所有与指定点碰撞的图形
         */
        static testPoint(p: IVector2D, layer: CollisionLayerEnum = CollisionLayerEnum.ALL): ITransform2D {
            const transforms = World2D.inst.transforms.slice(0);
            for (let i = 0; i < transforms.length; i++) {
                const transform = transforms[i];
                const collision = transform.collision as ICollisionCircle2D;
                if (layer !== CollisionLayerEnum.ALL && layer !== transform.layer) {
                    continue;
                }
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    if (p.distanceTo(transform) <= collision.radius) {
                        return transform;
                    }
                }
                else if (transform.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    const bounds = transform.collision.bounds;
                    if (p.x >= bounds.left && p.x <= bounds.right && p.y >= bounds.top && p.y <= bounds.bottom) {
                        return transform;
                    }
                }
                else {
                    const collision: ICollisionPolygon2D = transform.collision as ICollisionPolygon2D;
                    const vertexs = collision.vertexs;

                    let radian: number = 0;
                    for (let i = 0; i < vertexs.length; i++) {
                        const a = vertexs[i];
                        const b = i === 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                        if (a.x === b.x && a.y === b.y) {
                            continue;
                        }
                        radian += Vector2D.angle(Vector2D.sub(a, p), Vector2D.sub(b, p));
                    }

                    if (Helper2D.abs(Helper2D.r2d(radian) - 360) < 0.1) {
                        return transform;
                    }
                }
            }
            return null;
        }

        /**
         * 射线检测
         */
        static raycast(origin: IVector2D, direction: IVector2D, maxDistance: number, layers: CollisionLayerEnum): void {
            // 射线目标位置
            const destination: IVector2D = direction.copy().normalize().mul(maxDistance).add(origin);
            DrawAPI2D.drawLine(origin, destination, "#FF0000");

            // 线射碰撞盒
            const bounds: IBounds = new Bounds();
            bounds.updateBounds(
                Helper2D.min(origin.x, destination.x),
                Helper2D.max(origin.x, destination.x),
                Helper2D.max(origin.y, destination.y),
                Helper2D.max(origin.y, destination.y)
            );

            const transforms: Array<ITransform2D> = World2D.inst.transforms;

            // 参与检测的对象列表
            let array: Array<ITransform2D> = (layers & CollisionLayerEnum.ALL) ? null : [];

            // 默认检测所有对象
            if (array === null) {
                array = transforms.concat();
            }
            // 获取与射线包围盒发生碰撞的对象
            else {
                for (let i: number = 0; i < transforms.length; i++) {
                    const transform: ITransform2D = transforms[i];
                    // 不在指定的层级之中
                    if ((transform.layer & layers) === 0) {
                        continue;
                    }
                    // 未与射线的包围盒发生碰撞
                    if (CollisionResolution2D.bounds2Bounds(bounds, transform.collision.bounds) === false) {
                        continue;
                    }
                    array.push(transform);
                }
            }
        }
    }

    /**
     * 刚体
     */
    export class Rigidbody2D implements IRigidbody2D {
        /**
         * 扭矩（最大转向弧度）
         */
        private $torque: number = 180;

        /**
         * 物理对象
         */
        transform: ITransform2D;

        /**
         * 追踪的目标
         */
        target: ITransform2D = null;

        /**
         * 移动速度
         */
        moveSpeed: number = 0;

        /**
         * 更新数据
         */
        update(delta: number): void {
            // 若移动速度为0，则直接返回
            if (this.moveSpeed === 0) {
                return;
            }

            // 若目标无效，则放弃追踪
            if (this.target !== null && this.target.enabled === false) {
                this.target = null;
            }

            const p: IVector2D = suncom.Pool.getItemByClass<IVector2D>("world2d.Vector2D", Vector2D, [0, 0]);

            // 若存在目标，则调整速率角度
            if (this.target !== null) {
                p.assign(this.target.x - this.transform.x, this.target.y - this.transform.y);

                // 目标方向
                let rotate2: number = p.angle();

                // 若扭矩为180，则直接旋转至目标方向
                if (this.$torque === 180) {
                    this.transform.rotateTo(rotate2);
                }
                // 否则需要考虑旋转极限
                else {
                    // 转向极限
                    let min: number = this.transform.rotation - Helper2D.PI;
                    let max: number = this.transform.rotation + Helper2D.PI;

                    if (rotate2 < min) {
                        rotate2 += Helper2D.PI2;
                    }
                    else if (rotate2 > max) {
                        rotate2 -= Helper2D.PI2;
                    }

                    // 需要旋转的弧度值
                    const rotation: number = rotate2 - this.transform.rotation;
                    // 扭矩限制转向能力
                    const torque: number = suncom.Common.clamp(this.$torque * delta * 10, 0, Helper2D.PI);

                    // 转向
                    if (rotation < -torque) {
                        this.transform.rotateBy(-torque);
                    }
                    else if (rotation > torque) {
                        this.transform.rotateBy(torque);
                    }
                    else {
                        this.transform.rotateBy(rotation);
                    }
                }
            }

            // 计算实时速率
            p.assign(this.moveSpeed, 0).rotate(this.transform.rotation);
            // 移动
            this.transform.moveBy(p.x * delta, p.y * delta);

            suncom.Pool.recover("world2d.Vector2D", p);
        }

        /**
         * 扭矩（最大转向角度）
         */
        get torque(): number {
            return Helper2D.r2d(this.$torque);
        }
        set torque(value: number) {
            this.$torque = Helper2D.d2r(value);
        }
    }

    /**
     * 线段
     */
    export class Segment2D implements ISegment2D {
        /**
         * 线段起点
         */
        a: IVector2D = new Vector2D(0, 0);

        /**
         * 线段终点
         */
        b: IVector2D = new Vector2D(0, 0);

        /**
         * 线段方向
         */
        ab: IVector2D = new Vector2D(0, 0);
    }

    /**
     * 转换器，用来保存对撞机数据模型在世界空间中的坐标、旋转和缩放值，并提供变换的接口
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
         * 设置为无效
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
         * 是否有效（一次性值，默认为true，当其被置成false时，将永远不会被重置）
         */
        get enabled(): boolean {
            return this.$enabled;
        }

        /**
         * 获取实体对象
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

    /**
     * 向量
     */
    export class Vector2D implements IVector2D {
        /**
         * 坐标
         */
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        /**
         * 赋值
         */
        assign(x: number, y: number): IVector2D {
            this.x = x;
            this.y = y;
            return this;
        }

        /**
         * 相加
         */
        add(vec2: IPoint2D): IVector2D {
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        }

        /**
         * 相减
         */
        sub(vec2: IPoint2D): IVector2D {
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        }

        /**
         * 相乘
         */
        mul(value: number): IVector2D {
            this.x *= value;
            this.y *= value;
            return this;
        }

        /**
         * 点积
         */
        dot(a: IPoint2D): number {
            return this.x * a.x + this.y * a.y;
        }

        /**
         * 叉积
         */
        cross(a: IPoint2D): number {
            return this.x * a.y - this.y * a.x;
        }

        /**
         * 相反
         */
        negate(): IVector2D {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }

        /**
         * 旋转（弘度）
         */
        rotate(radian: number): IVector2D {
            const x: number = this.x;
            const y: number = this.y;
            const cos: number = Math.cos(radian);
            const sin: number = Math.sin(radian);
            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
            return this;
        }

        /**
         * 向量与x轴之间的弧度
         */
        angle(): number {
            const radian: number = Math.atan2(this.y, this.x);
            if (radian < 0) {
                return radian + 2 * Math.PI;
            }
            else {
                return radian;
            }
        }

        /**
         * 归零
         */
        zero(): IVector2D {
            this.x = this.y = 0;
            return this;
        }

        /**
         * 返回新的向量作为当前向量的法向量
         * NOTE：法向量与向量相交，且相互垂直，向量的法向量为(-y,x)或(y,-x)
         */
        normal(): IVector2D {
            return new Vector2D(this.y, -this.x);
        }

        /**
         * 归一
         */
        normalize(): IVector2D {
            const length: number = this.length();
            if (length < 1e-9) {
                return this;
            }
            this.x /= length;
            this.y /= length;
            return this;
        }

        /**
         * 长度
         */
        length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * 长度平方
         */
        lengthSquared(): number {
            return this.x * this.x + this.y * this.y;
        }

        /**
         * 计算到指定位置的距离
         */
        distanceTo(p: IPoint2D): number {
            const dx: number = this.x - p.x;
            const dy: number = this.y - p.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        /**
         * 计算到指定位置的距离平方
         */
        distanceToSquared(p: IPoint2D): number {
            const dx: number = this.x - p.x;
            const dy: number = this.y - p.y;
            return dx * dx + dy * dy;
        }

        /**
         * 拷贝
         */
        copy(): IVector2D {
            return new Vector2D(this.x, this.y);
        }

        /**
         * 输出向量值
         */
        toString(): string {
            return `{${this.x},${this.y}}`;
        }

        /**
         * 两向量相加
         */
        static add(a: IPoint2D, b: IPoint2D): IVector2D {
            return new Vector2D(a.x + b.x, a.y + b.y);
        }

        /**
         * 两向量相减
         */
        static sub(a: IPoint2D, b: IPoint2D): IVector2D {
            return new Vector2D(b.x - a.x, b.y - a.y);
        }

        /**
         * 法向量
         */
        static normal(a: IPoint2D, b: IPoint2D): IVector2D {
            return new Vector2D(b.y - a.y, a.x - b.x);
        }

        /**
         * 计算两个向量之间的夹角
         */
        static angle(a: IVector2D, b: IVector2D): number {
            const m: number = a.length();
            const n: number = b.length();

            if (m <= 1e-9 || n < 1e-9) {
                return 0;
            }

            return Math.acos(a.dot(b) / (m * n));
        }
    }

    /**
     * 2D世界
     * 此类主要实现2D世界的碰撞
     */
    export class World2D implements IWorld2D {

        /**
         * 调试模式
         */
        static DEBUG: boolean = false;

        /**
         * 对象的碰撞层级发生了变化
         */
        static TRANSFORM_LAYER_CHANGED: string = "world2d.TRANSFORM_LAYER_CHANGED";

        /**
         * 单例对象
         */
        static inst: IWorld2D;

        /**
         * 层级关系
         */
        private $detectors: Array<Array<boolean>> = [];

        /**
         * 碰撞关系
         */
        private $contacts: Array<ICollisionContact2D> = [];

        /**
         * 世界中的对象
         */
        private $transforms: Array<ITransform2D> = [];

        /**
         * 碰撞分组，一经设置不可更改
         */
        constructor(graphics: Laya.Graphics) {
            // 保存世界对象为单例
            World2D.inst = this;
            // 世界绘制接口
            DrawAPI2D.graphics = graphics;
            // 默认层级中的所有元素都会相互碰撞
            this.addDetector(CollisionLayerEnum.DEFAULT, CollisionLayerEnum.DEFAULT);
        }

        /**
         * 实时物理计算
         */
        update(delta: number): void {
            // 世界数据转换
            for (let i: number = 0; i < this.$transforms.length; i++) {
                this.$transforms[i].transform(delta);
            }
            for (let i: number = 0; i < this.$contacts.length; i++) {
                this.$contacts[i].test();
            }
            // 绘制世界
            World2D.DEBUG === true && DrawAPI2D.draw(this.$transforms);
        }

        /**
         * 添加对象
         * @layer: 默认为 CollisionLayerEnum.DEFAULT
         */
        addTransform(transform: ITransform2D, layer: CollisionLayerEnum = CollisionLayerEnum.DEFAULT): void {
            transform.layer = layer;
            transform.addEventListener(World2D.TRANSFORM_LAYER_CHANGED, this.$onTransformLayerChanged, this);
            for (let i: number = 0; i < this.$transforms.length; i++) {
                const transform2: ITransform2D = this.$transforms[i];
                if (this.$shouldCollide(transform.layer, transform2.layer) === true) {
                    const contact: ICollisionContact2D = new CollisionContact2D(transform, transform2);
                    this.$contacts.push(contact);
                }
            }
            this.$transforms.push(transform);
        }

        /**
         * 移除对象
         */
        removeTransform(transform: ITransform2D): void {
            const index: number = this.$transforms.indexOf(transform);
            if (index < 0) {
                return;
            }
            this.$transforms.splice(index, 1);
            transform.removeEventListener(World2D.TRANSFORM_LAYER_CHANGED, this.$onTransformLayerChanged, this);
            for (let i: number = this.$contacts.length - 1; i > -1; i--) {
                const contact: ICollisionContact2D = this.$contacts[i];
                if (contact.a === transform || contact.b === transform) {
                    if (contact.touching === true) {
                        contact.doCollide(CollisionType.COLLISION_EXIT);
                    }
                    this.$contacts.splice(i, 1);
                }
            }
        }

        /**
         * 对象的碰撞层级发生了变化
         */
        private $onTransformLayerChanged(transform: ITransform2D): void {
            this.removeTransform(transform);
            this.addTransform(transform, transform.layer);
        }

        /**
         * 添加探测器
         */
        addDetector(a: CollisionLayerEnum, b: CollisionLayerEnum): void {
            if (a > b) {
                const t: CollisionLayerEnum = a;
                a = b;
                b = t;
            }
            if (this.$detectors[a] === void 0) {
                this.$detectors[a] = [];
            }
            this.$detectors[a][b] = true;
        }

        /**
         * 判断两个对象是否需要发生碰撞
         */
        private $shouldCollide(a: CollisionLayerEnum, b: CollisionLayerEnum): boolean {
            if (a > b) {
                const t: CollisionLayerEnum = a;
                a = b;
                b = t;
            }
            if (this.$detectors[a] !== void 0 && this.$detectors[a][b] === true) {
                return true;
            }
            return false;
        }

        /**
         * 获取对象集合
         */
        get transforms(): Array<ITransform2D> {
            return this.$transforms;
        }
    }

}
