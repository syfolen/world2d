/**
 * @license world2d (c) 2013 Binfeng Sun <christon.sun@qq.com>
 * Released under the MIT License
 * https://blog.csdn.net/syfolen
 * https://github.com/syfolen/world2d
 */
declare module world2d {
    /**
     * 碰撞层级
     */
    enum CollisionLayerEnum {
        /**
         * 默认
         */
        DEFAULT = 0x01,

        /**
         * 鱼
         */
        FISH = 0x02,

        /**
         * 子弹
         */
        BULLET = 0x04
    }

    /**
     * 对撞机接口，仅用来保存对撞机的模型数据，如圆形对撞机的半径、多边形对撞机的顶点等，坐标、缩放、旋转等数据不在此模型中
     */
    interface ICollider2D {
    }

    /**
     * 圆形对撞机接口
     */
    interface IColliderCircle2D extends ICollider2D {
        /**
         * 半径
         */
        radius: number;
    }

    /**
     * 实体对象接口
     */
    interface IEntity {
        /**
         * 物理数据转换器
         */
        readonly transform: ITransform2D;

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
    }

    /**
     * 点接口
     */
    interface IPoint2D {
        /**
         * 坐标
         */
        x: number;

        /**
         * 坐标
         */
        y: number;
    }

    /**
     * 刚体接口
     */
    interface IRigidbody2D {
        /**
         * 追踪的目标
         */
        target: ITransform2D;

        /**
         * 移动速度
         */
        moveSpeed: number;
    }

    /**
     * 转换器接口，用来保存对撞机数据模型在世界空间中旋转和缩放值，并提供变换的接口
     */
    interface ITransform2D extends suncom.IEventSystem {
        /**
         * 坐标
         */
        readonly x: number;

        readonly y: number;

        /**
         * 是否有效（一次性值，默认为true，当其被置成false时，将永远不会被重置）
         */
        readonly enabled: boolean;

        /**
         * 实体对象
         */
        readonly entity: IEntity;

        /**
         * 碰撞区域
         */
        readonly collision: ICollision2D;

        /**
         * 刚体
         */
        readonly rigidbody: IRigidbody2D;

        /**
         * 移动至
         */
        moveTo(x: number, y: number): void;

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
    }

    /**
     * 向量接口
     */
    interface IVector2D extends IPoint2D {

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
        sub(a: IPoint2D): IVector2D;

        /**
         * 相乘
         */
        mul(value: number): IVector2D;

        /**
         * 点积
         */
        dot(a: IPoint2D): number;

        /**
         * 叉积
         */
        cross(a: IPoint2D): number;

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
         * 长量的平方
         */
        lengthSquared(): number;

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
    interface IWorld2D {

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
    }

    /**
     * 碰撞体接口，用来保存对撞机数据模型在世界空间中的映射数据，包括矩形绝对区域、圆绝对半径和多边形的顶点绝对坐标
     */
    interface ICollision2D extends IPoint2D {
    }

    /**
     * 圆形碰撞区域接口（效率最高）
     */
    interface ICollisionCircle2D extends ICollision2D {
        /**
         * 半径
         */
        radius: number;
    }

    /**
     * 对撞机原始数据模型
     */
    abstract class Collider2D implements ICollider2D {
    }

    /**
     * 圆形对撞机
     */
    class ColliderCircle2D extends Collider2D implements IColliderCircle2D {
        /**
         * 半径
         */
        radius: number;

        constructor(radius: number);
    }

    /**
     * 对撞机世界数据模型
     */
    abstract class Collision2D implements ICollision2D {
        /**
         * 坐标
         */
        x: number;

        y: number;
    }

    /**
     * 圆形碰撞区域（效率最高）
     */
    class CollisionCircle2D extends Collision2D implements ICollisionCircle2D {
        /**
         * 半径
         */
        radius: number;

        constructor(radius: number);
    }

    /**
     * 物理类
     */
    class Physics2D {

        /**
         * 返回所有与指定点碰撞的图形
         */
        static testPoint(p: IVector2D, layers?: CollisionLayerEnum): ITransform2D;
    }

    /**
     * 刚体
     */
    class Rigidbody2D implements IRigidbody2D {
        /**
         * 追踪的目标
         */
        target: ITransform2D;

        /**
         * 移动速度
         */
        moveSpeed: number;
    }

    /**
     * 转换器，用来保存对撞机数据模型在世界空间中的坐标、旋转和缩放值，并提供变换的接口
     */
    class Transform2D extends suncom.EventSystem implements ITransform2D {

        /**
         * @vertexs: 原始顶点数据
         */
        constructor(entity: IEntity, collider: ICollider2D, rigidbody: IRigidbody2D, collision: ICollision2D);

        /**
         * 移动至
         */
        moveTo(x: number, y: number): void;

        /**
         * 旋转至（弧度）
         */
        rotateTo(value: number): void;

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
         * 获取坐标
         */
        readonly x: number;

        readonly y: number;

        /**
         * 是否有效（一次性值，默认为true，当其被置成false时，将永远不会被重置）
         */
        readonly enabled: boolean;

        /**
         * 获取实体对象
         */
        readonly entity: IEntity;

        /**
         * 碰撞体
         */
        readonly collision: ICollision2D;

        /**
         * 获取刚体
         */
        readonly rigidbody: IRigidbody2D;
    }

    /**
     * 向量
     */
    class Vector2D implements IVector2D {
        /**
         * 坐标
         */
        x: number;

        /**
         * 坐标
         */
        y: number;

        constructor(x: number, y: number);

        /**
         * 赋值
         */
        assign(x: number, y: number): IVector2D;

        /**
         * 相加
         */
        add(vec2: IPoint2D): IVector2D;

        /**
         * 相减
         */
        sub(vec2: IPoint2D): IVector2D;

        /**
         * 相乘
         */
        mul(value: number): IVector2D;

        /**
         * 点积
         */
        dot(a: IPoint2D): number;

        /**
         * 叉积
         */
        cross(a: IPoint2D): number;

        /**
         * 相反
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
         * 归零
         */
        zero(): IVector2D;

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
         * 长度
         */
        length(): number;

        /**
         * 长度平方
         */
        lengthSquared(): number;

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
         * 输出向量值
         */
        toString(): string;

        /**
         * 两向量相加
         */
        static add(a: IPoint2D, b: IPoint2D): IVector2D;

        /**
         * 两向量相减
         */
        static sub(a: IPoint2D, b: IPoint2D): IVector2D;

        /**
         * 法向量
         */
        static normal(a: IPoint2D, b: IPoint2D): IVector2D;

        /**
         * 计算两个向量之间的夹角
         */
        static angle(a: IVector2D, b: IVector2D): number;
    }

    /**
     * 2D世界
     * 此类主要实现2D世界的碰撞
     */
    class World2D implements IWorld2D {
        /**
         * 调试模式
         */
        static DEBUG: boolean;

        /**
         * 单例对象
         */
        static inst: IWorld2D;

        constructor(graphics: Laya.Graphics);

        /**
         * 实时物理计算
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
         * 添加探测器
         */
        addDetector(a: CollisionLayerEnum, b: CollisionLayerEnum): void;
    }

    namespace Helper2D {
    }
}