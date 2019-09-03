/**
 * MIT License
 * 
 * Copyright (c) 2019 Binfeng Sun<christon.sun@qq.com>
 * https://blog.csdn.net/syfolen
 * https://github.com/syfolen/world2d
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
declare module world2d {

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
     * 碰撞区域接口
     */
    export interface ICollision2D {
        /**
         * 形状
         */
        readonly shap: CollisionShapEnum2D;
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
         * 速率
         */
        velocity: IVector2D;

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
     * 物理数据转化对象接口
     */
    export interface ITransform2D {
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
         * 碰撞产生
         */
        onCollisionEnter(other: ITransform2D): void;

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        onCollisionStay(other: ITransform2D): void;

        /**
         * 碰撞结束
         */
        onCollisionExit(other: ITransform2D): void;

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
         * 包围盒
         */
        readonly bounds: IBounds;

        /**
         * 碰撞体
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
        add(vec2: IVector2D): IVector2D;

        /**
         * 相减
         */
        sub(vec2: IVector2D): IVector2D;

        /**
         * 相乘
         */
        mul(value: number): IVector2D;

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
        rotate(angle: number): IVector2D;

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
     * 对撞机接口
     */
    export interface ICollider2D extends IPoint2D {

        /**
         * 变形
         */
        scale(value: number): void;

        /**
         * 旋转
         */
        rotate(angle: number): void;

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
    export interface IColliderCircle2D extends ICollider2D, ICircle2D {

    }

    /**
     * 多边形对撞机接口
     */
    export interface IColliderPolygon2D extends ICollider2D, IPolygon2D {

        /**
         * 更新顶点数据
         * NOTE: 此更新并不会触发collision的刷新
         */
        updateVertexs(vertexs: Array<IVector2D>): void;
    }

    /**
     * 圆形碰撞区域接口（效率最高）
     */
    export interface ICollisionCircle2D extends ICollision2D, ICircle2D {

        /**
         * 更新数据
         */
        updateBounds(x: number, y: number, radius: number): void;
    }

    /**
     * 多边型碰撞区域接口（效率最低）
     */
    export interface ICollisionPolygon2D extends ICollision2D, IPolygon2D {

        /**
         * 更新顶点数据
         */
        updateVertexs(x: number, y: number, vertexs: Array<IVector2D>): void;

        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        prepareSegments(): void;
    }

    /**
     * 矩型碰撞区域接口（效率中等）
     */
    export interface ICollisionRectangle2D extends ICollision2D, IBounds, IPolygon2D {

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
        updateBounds(left: number, right: number, top: number, bottom: number): void;
    }

    /**
     * 对撞机
     */
    export abstract class Collider2D implements ICollider2D {
        /**
         * 坐标
         */
        x: number;
        y: number;

        constructor(x: number, y: number, shap: ColliderShapEnum2D);

        /**
         * 变形
         */
        abstract scale(value: number): void;

        /**
         * 旋转
         */
        abstract rotate(value: number): void;

        /**
         * 克隆
         */
        abstract clone(): ICollider2D;

        /**
         * 形状
         */
        readonly shap: ColliderShapEnum2D;
    }

    /**
     * 圆形对撞机
     */
    export class ColliderCircle2D extends Collider2D implements IColliderCircle2D {
        /**
         * 半径
         */
        radius: number;

        constructor(x: number, y: number, radius: number);

        /**
         * 变形
         */
        scale(value: number): void;

        /**
         * 旋转
         */
        rotate(angle: number): void;

        /**
         * 克隆
         */
        clone(): IColliderCircle2D;
    }

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
        constructor(x: number, y: number, vertexs: Array<IVector2D>);

        /**
         * 变形
         */
        scale(value: number): void;

        /**
         * 旋转
         */
        rotate(angle: number): void;

        /**
         * 更新顶点数据
         * NOTE: 此更新并不会触发collision的刷新
         */
        updateVertexs(vertexs: Array<IVector2D>): void;

        /**
         * 克隆
         */
        clone(): IColliderPolygon2D;
    }

    /**
     * 碰撞区域
     */
    export abstract class Collision2D implements ICollision2D {

        constructor(shap: CollisionShapEnum2D);

        /**
         * 形状
         */
        readonly shap: CollisionShapEnum2D;
    }

    /**
     * 圆形碰撞区域（效率最高）
     */
    export class CollisionCircle2D extends Collision2D implements ICollisionCircle2D {
        /**
         * 坐标
         */
        x: number;
        y: number;

        /**
         * 半径
         */
        radius: number;

        constructor(radius: number);

        /**
         * 更新碰撞区域
         */
        updateBounds(x: number, y: number, radius: number): void;
    }

    export class CollisionContact2D implements ICollisionContact2D {

        constructor(a: ITransform2D, b: ITransform2D);

        /**
         * 检测是否相撞
         */
        test(): void;

        doCollide(type: CollisionType): void;

        readonly a: ITransform2D;

        readonly b: ITransform2D;

        /**
         * 相撞标记
         */
        readonly touching: boolean;
    }

    /**
     * 多边型碰撞区域（效率最低）
     */
    export class CollisionPolygon2D extends Collision2D implements ICollisionPolygon2D {
        /**
         * 顶点数据
         */
        vertexs: Array<IVector2D>;

        /**
         * 线段数据
         */
        segments: Array<IVector2D>;

        /**
         * 仅适用于多边型碰撞体
         */
        constructor(collider: IColliderPolygon2D);

        /**
         * 更新顶点数据
         */
        updateVertexs(x: number, y: number, vertexs: Array<IVector2D>): void;

        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        prepareSegments(): void;
    }

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
        vertexs: Array<IVector2D>;

        /**
         * 线段数据
         */
        segments: Array<IVector2D>;

        constructor();

        /**
         * 更新矩型区域
         */
        updateBounds(left: number, right: number, top: number, bottom: number): void;

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
     * 2D碰撞检测
     */
    export abstract class CollisionResolution2D {

        /**
         * 包围盒与包围盒
         */
        static bounds2Bounds(a: Bounds, b: Bounds): boolean;

        /**
         * 圆与圆
         */
        static circle2Circle(a: ICircle2D, b: ICircle2D): boolean;

        /**
         * 检测圆与多边形是否相交
         */
        static circle2Polygin(c: ICircle2D, polygon: IPolygon2D): boolean;

        /**
         * 判断一组顶点与多边型顶点在多边型每条边的法线上的投影是否全部重合
         * @polygon: 多边形
         * @vertexs: 顶点数据
         */
        static polygon2Vertexs(polygon: IPolygon2D, vertexs: Array<IVector2D>): boolean;

        /**
         * 判断两直线是否相交
         * @a,b: 需要参与判断的两条线段
         * @a1,a2: 线段a的两个点
         * @b1,b2: 线段b的两个点
         */
        static line2Line(a: IVector2D, a1: IVector2D, a2: IVector2D, b: IVector2D, b1: IVector2D, b2: IVector2D): boolean;

        /**
         * 判断点p1和p2是否在线段ab两侧
         * @a: 线段ab上的一个点
         * @ab: 线段的方向向量
         * @p1,p2: 需要判断的两个点
         * 思路：将点a,p1,p2沿ab方线投射到x或y轴，若点a的投影在ab中间，则返回true，否则返回false
         */
        static isLineBetweenPoints(a: IVector2D, ab: IVector2D, p1: IVector2D, p2: IVector2D): boolean;

        /**
         * 判断a与b是否在x两侧
         */
        static isXbetweenAandB(x: number, a: number, b: number): boolean;
    }

    export abstract class DrawAPI2D {

        static graphics: Laya.Graphics;

        static clear(): void;

        static draw(transforms: Array<ITransform2D>): void;

        static drawLine(a: IPoint2D, b: IVector2D, lineColor: string): void;

        static drawNormal(a: IVector2D, lineColor: string): void;

        static drawRect(x: number, y: number, width: number, height: number, lineColor: string): void;

        static drawCircle(x: number, y: number, radius: number, lineColor: string): void;

        static drawPolygon(x: number, y: number, vertexs: Array<IVector2D>, lineColor: string): void;
    }

    export abstract class Helper2D {
        /**
         * PI
         */
        static PI: number;

        /**
         * 2PI
         */
        static PI2: number;

        /**
         * 角度换算为弧度
         */
        static d2a(d: number): number;

        /**
         * 弧度换算为角度
         */
        static a2d(a: number): number;

        /**
         * 获取较小值
         */
        static min(a: number, b: number): number;

        /**
         * 获取较大值
         */
        static max(a: number, b: number): number;

        /**
         * 获取绝对值
         */
        static abs(a: number): number;
    }

    /**
     * 物理类
     */
    export class Physics {

        /**
         * 射线检测
         */
        static raycast(origin: IVector2D, direction: IVector2D, maxDistance: number, layers: CollisionLayerEnum): void;
    }

    /**
     * 刚体
     */
    export class Rigidbody2D implements IRigidbody2D {
        /**
         * 物理对象
         */
        transform: ITransform2D;

        /**
         * 速率
         */
        velocity: IVector2D;

        /**
         * 更新数据
         */
        update(delta: number): void;

        /**
         * 扭矩（最大转向角度）
         */
        torque: number
    }

    /**
     * 线段
     */
    export class Segment2D implements ISegment2D {
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
     * 物理数据转化对象
     */
    export class Transform2D implements ITransform2D {

        /**
         * 层级
         */
        layer: CollisionLayerEnum;

        /**
         * 碰撞次数，大于0说明对象发生了碰撞
         */
        hitNum: number;

        /**
         * @vertexs: 原始顶点数据
         */
        constructor(collider: ICollider2D, rigidbody: IRigidbody2D, collision: ICollision2D);

        /**
         * 2D世界通过调用此方法完成对象的数据转换与碰撞
         */
        transform(delta: number): void;

        /**
         * 碰撞产生
         */
        onCollisionEnter(other: ITransform2D): void;

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        onCollisionStay(other: ITransform2D): void;

        /**
         * 碰撞结束
         */
        onCollisionExit(other: ITransform2D): void;

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
        rotateBy(angle: number): void;

        /**
         * 旋转至（弧度）
         */
        rotateTo(angle: number): void;

        /**
         * 获取旋转角度
         */
        getRotation(): number;

        /**
         * 设置旋转角度
         */
        setRotation(rotation: number): void;

        /**
         * 获取坐标
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
         * 包围盒
         */
        readonly bounds: IBounds;

        /**
         * 获取碰撞体
         */
        readonly collider: ICollider2D;

        /**
         * 碰撞区域
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
    export class Vector2D implements IVector2D {
        /**
         * 坐标
         */
        x: number;
        y: number;

        constructor(x: number, y: number);

        /**
         * 赋值
         */
        assign(x: number, y: number): IVector2D;

        /**
         * 相加
         */
        add(vec2: IVector2D): IVector2D;

        /**
         * 相减
         */
        sub(vec2: IVector2D): IVector2D;

        /**
         * 相乘
         */
        mul(value: number): IVector2D;

        /**
         * 相反
         */
        negate(): IVector2D;

        /**
         * 旋转（弘度）
         */
        rotate(angle: number): IVector2D;

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
        static add(a: IVector2D, b: IVector2D): IVector2D;

        /**
         * 两向量相减
         */
        static sub(a: IVector2D, b: IVector2D): IVector2D;

        /**
         * 法向量
         */
        static normal(a: IVector2D, b: IVector2D): IVector2D;
    }

    /**
     * 2D世界
     * 此类主要实现2D世界的碰撞
     */
    export class World2D implements IWorld2D {

        /**
         * 单例对象
         */
        static inst: IWorld2D;

        /**
         * 碰撞分组，一经设置不可更改
         */
        constructor(graphics: Laya.Graphics);

        /**
         * 实时物理计算
         */
        update(delta: number): void;

        /**
         * 添加对象
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

        /**
         * 获取对象集合
         */
        readonly transforms: Array<ITransform2D>;
    }

}
