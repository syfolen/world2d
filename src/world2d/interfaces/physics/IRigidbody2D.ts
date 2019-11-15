
module world2d {

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
}