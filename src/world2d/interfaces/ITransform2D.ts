
module world2d {

    /**
     * 转换器接口，用来保存对撞机数据模型在世界空间中旋转和缩放值，并提供变换的接口
     */
    export interface ITransform2D<T extends IEntity<any>> extends suncom.IEventSystem {
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
}