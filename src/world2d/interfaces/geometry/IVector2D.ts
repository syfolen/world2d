
module world2d {

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
}