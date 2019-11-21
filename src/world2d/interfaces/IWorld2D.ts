
module world2d {

    /**
     * 简单2D物理
     * 特性：
     * 1. 碰撞实现，包括旋转和缩放
     * 2. 移动实现，包括速度和扭矩
     * 需求来自：
     * 1. 捕鱼达人
     * export
     */
    export interface IWorld2D {

        /**
         * 更新物理
         * export
         */
        update(delta: number): void;

        /**
         * 添加对象
         * @layer: 默认为 CollisionLayerEnum.DEFAULT
         * export
         */
        addTransform(transform: ITransform2D, layer?: CollisionLayerEnum): void;

        /**
         * 移除对象
         * export
         */
        removeTransform(transform: ITransform2D): void;

        /**
         * 指定碰撞层级
         * export
         */
        addDetector(a: CollisionLayerEnum, b: CollisionLayerEnum): void;

        /**
         * 对象集合
         */
        readonly transforms: Array<ITransform2D>;
    }
}