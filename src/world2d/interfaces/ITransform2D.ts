
module world2d {

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
}