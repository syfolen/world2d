
module world2d {
    /**
     * 射线碰撞结果
     */
    export interface IRaycastResult {
        /**
         * 射线与目标对象的交叉类型
         */
        type: CrossTypeEnum;

        /**
         * 射线碰到的对象
         */
        transform: ITransform2D;

        /**
         * 射线与对象发生碰撞的近点坐标
         */
        p1: IVector2D;

        /**
         * 射线离开对象的理论远点坐标（不一定在射线的长度范围内）
         */
        p2: IVector2D;

        /**
         * 近点法线（似乎没卵用，故暂未实现）
         */
        normal: IVector2D;

        /**
         * 射线起点到近点碰撞点的距离
         */
        distance: number;
    }
}