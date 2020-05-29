
module world2d {
    /**
     * 向量接口
     * export
     */
    export interface IVector2D extends IPoint2D {
        /**
         * 赋值
         * export
         */
        assign(x: number, y: number): IVector2D;

        /**
         * 相加
         * export
         */
        add(a: IPoint2D): IVector2D;

        /**
         * 相减
         * export
         */
        sub(a: IPoint2D): IVector2D;

        /**
         * 相乘
         * export
         */
        mul(value: number): IVector2D;

        /**
         * 点积
         * export
         */
        dot(a: IPoint2D): number;

        /**
         * 叉积
         * export
         */
        cross(a: IPoint2D): number;

        /**
         * 归零
         * export
         */
        zero(): IVector2D;

        /**
         * 取反
         * export
         */
        negate(): IVector2D;

        /**
         * 旋转（弘度）
         * export
         */
        rotate(radian: number): IVector2D;

        /**
         * 向量与x轴之间的弧度
         * export
         */
        angle(): number;

        /**
         * 返回新的向量作为当前向量的法向量
         * NOTE：法向量与向量相交，且相互垂直，向量的法向量为(-y,x)或(y,-x)
         * export
         */
        normal(): IVector2D;

        /**
         * 归一
         * export
         */
        normalize(): IVector2D;

        /**
         * 长量
         * export
         */
        length(): number;

        /**
         * 长量的平方
         * export
         */
        lengthSquared(): number;

        /**
         * 计算到指定位置的距离
         * export
         */
        distanceTo(p: IPoint2D): number;

        /**
         * 计算到指定位置的距离平方
         * export
         */
        distanceToSquared(p: IPoint2D): number;

        /**
         * 拷贝
         * export
         */
        copy(): IVector2D;

        /**
         * 输出字符串
         * export
         */
        toString(): string;
    }
}