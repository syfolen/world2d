
module world2d {

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
}