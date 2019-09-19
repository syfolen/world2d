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

    export interface ICollisionContact2D<T extends IEntity<any>> {

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
        readonly a: ITransform2D<T>;

        /**
         * 碰撞对象
         */
        readonly b: ITransform2D<T>;

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
    export interface IEntity<T> {

        /**
         * 碰撞产生
         */
        onCollisionEnter(other: IEntity<any>): void;

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        onCollisionStay(other: IEntity<any>): void;

        /**
         * 碰撞结束
         */
        onCollisionExit(other: IEntity<any>): void;

        /**
         * 物理数据转换器
         */
        readonly transform: ITransform2D<IEntity<T>>;
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
    export interface IRigidbody2D<T extends IEntity<any>> {
        /**
         * 物理对象
         */
        transform: ITransform2D<T>;

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
     * 转换器接口，用来保存对撞机数据模型在世界空间中旋转和缩放值，并提供变换的接口
     */
    export interface ITransform2D<T extends IEntity<any>> {
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
         * 实体对象
         */
        readonly entity: T;

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
        readonly rigidbody: IRigidbody2D<T>;
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
    export interface IWorld2D<T extends IEntity<any>> {

        /**
         * 更新物理
         */
        update(delta: number): void;

        /**
         * 添加对象
         * @layer: 默认为 CollisionLayerEnum.DEFAULT
         */
        addTransform(transform: ITransform2D<T>, layer?: CollisionLayerEnum): void;

        /**
         * 移除对象
         */
        removeTransform(transform: ITransform2D<T>): void;

        /**
         * 指定碰撞层级
         */
        addDetector(a: CollisionLayerEnum, b: CollisionLayerEnum): void;

        /**
         * 对象集合
         */
        readonly transforms: Array<ITransform2D<T>>;
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
        updateBounds(left: number, right: number, top: number, bottom: number): void;
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

        constructor(shap: ColliderShapEnum2D);

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

        constructor(radius: number);

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
        constructor(vertexs: Array<IVector2D>);

        /**
         * 克隆
         */
        clone(): IColliderPolygon2D;
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
        bounds: IBounds;

        constructor(shap: CollisionShapEnum2D);

        /**
         * 更新矩形区域
         */
        abstract updateBounds(): void;

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
         * 半径
         */
        radius: number;

        constructor(radius: number);

        /**
         * 更新矩形区域
         */
        updateBounds(): void;
    }

    export class CollisionContact2D<T extends IEntity<any>> implements ICollisionContact2D<T> {

        constructor(a: ITransform2D<T>, b: ITransform2D<T>);

        /**
         * 检测是否相撞
         */
        test(): void;

        doCollide(type: CollisionType): void;

        readonly a: ITransform2D<T>;

        readonly b: ITransform2D<T>;

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

        constructor(collider: IColliderPolygon2D);

        /**
         * 更新矩形区域
         */
        updateBounds(): void;

        /**
         * 更新顶点数据
         */
        updateVertexs(vertexs: Array<IVector2D>): void;

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
     * 矩型碰撞区域（效率中等）
     */
    export class CollisionRectangle2D extends Collision2D implements ICollisionRectangle2D {
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
        updateBounds(): void;

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
        static circle2Polygin(c: ICircle2D, d: IPolygon2D): boolean;

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

        static draw<T extends IEntity<any>>(transforms: Array<ITransform2D<T>>): void;

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
        static d2r(d: number): number;

        /**
         * 弧度换算为角度
         */
        static r2d(a: number): number;

        /**
         * 获取绝对值
         */
        static abs(a: number): number;

        /**
         * 获取较小值
         */
        static min(a: number, b: number): number;

        /**
         * 获取较大值
         */
        static max(a: number, b: number): number;

        /**
         * 为一组顶点计算边界值
         */
        static calculateBoundsForVertexs(vertexs: Array<IVector2D>, bounds: IBounds): void;
    }

    /**
     * 物理类
     */
    export class Physics {

        /**
         * 返回所有与指定点碰撞的图形
         */
        static testPoint<T extends IEntity<any>>(p: IVector2D): ITransform2D<T>;

        /**
         * 射线检测
         */
        static raycast(origin: IVector2D, direction: IVector2D, maxDistance: number, layers: CollisionLayerEnum): void;
    }

    /**
     * 刚体
     */
    export class Rigidbody2D<T extends IEntity<any>> implements IRigidbody2D<T> {
        /**
         * 物理对象
         */
        transform: ITransform2D<T>;

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
     * 转换器，用来保存对撞机数据模型在世界空间中的坐标、旋转和缩放值，并提供变换的接口
     */
    export class Transform2D<T extends IEntity<any>> implements ITransform2D<T> {

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
        constructor(entity: T, collider: ICollider2D, rigidbody: IRigidbody2D<T>, collision: ICollision2D);

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
         * 获取实体对象
         */
        readonly entity: T;

        /**
         * 对撞机
         */
        readonly collider: ICollider2D;

        /**
         * 碰撞体
         */
        readonly collision: ICollision2D;

        /**
         * 获取刚体
         */
        readonly rigidbody: IRigidbody2D<T>;
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
    export class World2D<T extends IEntity<any>> implements IWorld2D<T> {

        /**
         * 调试模式
         */
        static DEBUG: boolean;

        /**
         * 单例对象
         */
        static inst: IWorld2D<any>;

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
         * @layer: 默认为 CollisionLayerEnum.DEFAULT
         */
        addTransform(transform: ITransform2D<T>, layer: CollisionLayerEnum): void;

        /**
         * 移除对象
         */
        removeTransform(transform: ITransform2D<T>): void;

        /**
         * 添加探测器
         */
        addDetector(a: CollisionLayerEnum, b: CollisionLayerEnum): void;

        /**
         * 获取对象集合
         */
        readonly transforms: Array<ITransform2D<T>>;
    }

}
