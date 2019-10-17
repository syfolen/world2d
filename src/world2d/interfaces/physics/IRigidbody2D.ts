
module world2d {

    /**
     * 刚体接口
     */
    export interface IRigidbody2D<T extends IEntity<any>> {
        /**
         * 物理对象
         */
        transform: ITransform2D<T>;

        /**
         * 追踪的目标
         */
        target: ITransform2D<any>;

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
}