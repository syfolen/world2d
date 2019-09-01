
module world2d {

    /**
     * 向量
     */
    export class Vector2D implements IVector2D {
        /**
         * 坐标
         */
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        /**
         * 赋值
         */
        assign(x: number, y: number): IVector2D {
            this.x = x;
            this.y = y;
            return this;
        }

        /**
         * 相加
         */
        add(vec2: IVector2D): IVector2D {
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        }

        /**
         * 相减
         */
        sub(vec2: IVector2D): IVector2D {
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        }

        /**
         * 相乘
         */
        mul(value: number): IVector2D {
            this.x *= value;
            this.y *= value;
            return this;
        }

        /**
         * 相反
         */
        negate(): IVector2D {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }

        /**
         * 旋转（弘度）
         */
        rotate(angle: number): IVector2D {
            const x: number = this.x;
            const y: number = this.y;
            const cos: number = Math.cos(angle);
            const sin: number = Math.sin(angle);
            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
            return this;
        }

        /**
         * 向量与x轴之间的弧度
         */
        angle(): number {
            const angle: number = Math.atan2(this.y, this.x);
            if (angle < 0) {
                return angle + 2 * Math.PI;
            }
            else {
                return angle;
            }
        }

        /**
         * 归零
         */
        zero(): IVector2D {
            this.x = this.y = 0;
            return this;
        }

        /**
         * 返回新的向量作为当前向量的法向量
         * NOTE：法向量与向量相交，且相互垂直，向量的法向量为(-y,x)或(y,-x)
         */
        normal(): IVector2D {
            return new Vector2D(this.y, -this.x);
        }

        /**
         * 归一
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
         */
        length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * 长度平方
         */
        lengthSquared(): number {
            return this.x * this.x + this.y * this.y;
        }

        /**
         * 计算到指定位置的距离
         */
        distanceTo(p: IPoint2D): number {
            const dx: number = this.x - p.x;
            const dy: number = this.y - p.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        /**
         * 计算到指定位置的距离平方
         */
        distanceToSquared(p: IPoint2D): number {
            const dx: number = this.x - p.x;
            const dy: number = this.y - p.y;
            return dx * dx + dy * dy;
        }

        /**
         * 拷贝
         */
        copy(): IVector2D {
            return new Vector2D(this.x, this.y);
        }

        /**
         * 输出向量值
         */
        toString(): string {
            return `{${this.x},${this.y}}`;
        }

        /**
         * 两向量相加
         */
        static add(a: IVector2D, b: IVector2D): IVector2D {
            return new Vector2D(a.x + b.x, a.y + b.y);
        }

        /**
         * 两向量相减
         */
        static sub(a: IVector2D, b: IVector2D): IVector2D {
            return new Vector2D(b.x - a.x, b.y - a.y);
        }

        /**
         * 法向量
         */
        static normal(a: IVector2D, b: IVector2D): IVector2D {
            return new Vector2D(b.y - a.y, a.x - b.x);
        }
    }
}