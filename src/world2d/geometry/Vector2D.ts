
module world2d {
    /**
     * 向量
     * export
     */
    export class Vector2D implements IVector2D {
        /**
         * 坐标
         * export
         */
        x: number;
        /**
         * 坐标
         * export
         */
        y: number;

        /**
         * export
         */
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        /**
         * 赋值
         * export
         */
        assign(x: number, y: number): IVector2D {
            this.x = x;
            this.y = y;
            return this;
        }

        /**
         * 相加
         * export
         */
        add(vec2: IPoint2D): IVector2D {
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        }

        /**
         * 相减
         * export
         */
        sub(vec2: IPoint2D): IVector2D {
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        }

        /**
         * 相乘
         * export
         */
        mul(value: number): IVector2D {
            this.x *= value;
            this.y *= value;
            return this;
        }

        /**
         * 点积
         * export
         */
        dot(a: IPoint2D): number {
            return this.x * a.x + this.y * a.y;
        }

        /**
         * 叉积
         * export
         */
        cross(a: IPoint2D): number {
            return this.x * a.y - this.y * a.x;
        }

        /**
         * 相反
         * export
         */
        negate(): IVector2D {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }

        /**
         * 旋转（弘度）
         * export
         */
        rotate(radian: number): IVector2D {
            const x: number = this.x;
            const y: number = this.y;
            const cos: number = Math.cos(radian);
            const sin: number = Math.sin(radian);
            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
            return this;
        }

        /**
         * 向量与x轴之间的弧度
         * export
         */
        angle(): number {
            const radian: number = Math.atan2(this.y, this.x);
            if (radian < 0) {
                return radian + 2 * Math.PI;
            }
            else {
                return radian;
            }
        }

        /**
         * 归零
         * export
         */
        zero(): IVector2D {
            this.x = this.y = 0;
            return this;
        }

        /**
         * 返回新的向量作为当前向量的法向量
         * NOTE：法向量与向量相交，且相互垂直，向量的法向量为(-y,x)或(y,-x)
         * export
         */
        normal(): IVector2D {
            return new Vector2D(this.y, -this.x);
        }

        /**
         * 归一
         * export
         */
        normalize(): IVector2D {
            const length: number = this.length();
            if (length < 1e-9) {
                return this;
            }
            this.x /= length;
            this.y /= length;
            return this;
        }

        /**
         * 长度
         * export
         */
        length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * 长度平方
         * export
         */
        lengthSquared(): number {
            return this.x * this.x + this.y * this.y;
        }

        /**
         * 计算到指定位置的距离
         * export
         */
        distanceTo(p: IPoint2D): number {
            const dx: number = this.x - p.x;
            const dy: number = this.y - p.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        /**
         * 计算到指定位置的距离平方
         * export
         */
        distanceToSquared(p: IPoint2D): number {
            const dx: number = this.x - p.x;
            const dy: number = this.y - p.y;
            return dx * dx + dy * dy;
        }

        /**
         * 拷贝
         * export
         */
        copy(): IVector2D {
            return new Vector2D(this.x, this.y);
        }

        /**
         * 输出向量值
         * export
         */
        toString(): string {
            return `{${this.x},${this.y}}`;
        }

        /**
         * 两向量相加
         * export
         */
        static add(a: IPoint2D, b: IPoint2D): IVector2D {
            return new Vector2D(a.x + b.x, a.y + b.y);
        }

        /**
         * 两向量相减
         * export
         */
        static sub(a: IPoint2D, b: IPoint2D): IVector2D {
            return new Vector2D(b.x - a.x, b.y - a.y);
        }

        /**
         * 法向量
         * export
         */
        static normal(a: IPoint2D, b: IPoint2D): IVector2D {
            return new Vector2D(b.y - a.y, a.x - b.x);
        }

        /**
         * 计算两个向量之间的夹角
         * export
         */
        static angle(a: IVector2D, b: IVector2D): number {
            const m: number = a.length();
            const n: number = b.length();

            if (m <= 1e-9 || n < 1e-9) {
                return 0;
            }

            return Math.acos(a.dot(b) / (m * n));
        }
    }
}