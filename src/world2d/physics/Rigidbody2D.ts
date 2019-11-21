
module world2d {

    /**
     * 刚体
     * export
     */
    export class Rigidbody2D implements IRigidbody2D {
        /**
         * 扭矩（最大转向弧度）
         */
        private $torque: number = 180;

        /**
         * 物理对象
         */
        transform: ITransform2D;

        /**
         * 追踪的目标
         * export
         */
        target: ITransform2D = null;

        /**
         * 移动速度
         * export
         */
        moveSpeed: number = 0;

        /**
         * 更新数据
         */
        update(delta: number): void {
            // 若移动速度为0，则直接返回
            if (this.moveSpeed === 0) {
                return;
            }

            // 若目标无效，则放弃追踪
            if (this.target !== null && this.target.enabled === false) {
                this.target = null;
            }

            const p: IVector2D = suncom.Pool.getItemByClass<IVector2D>("world2d.Vector2D", Vector2D, [0, 0]);

            // 若存在目标，则调整速率角度
            if (this.target !== null) {
                p.assign(this.target.x - this.transform.x, this.target.y - this.transform.y);

                // 目标方向
                let rotate2: number = p.angle();

                // 若扭矩为180，则直接旋转至目标方向
                if (this.$torque === 180) {
                    this.transform.rotateTo(rotate2);
                }
                // 否则需要考虑旋转极限
                else {
                    // 转向极限
                    let min: number = this.transform.rotation - Helper2D.PI;
                    let max: number = this.transform.rotation + Helper2D.PI;

                    if (rotate2 < min) {
                        rotate2 += Helper2D.PI2;
                    }
                    else if (rotate2 > max) {
                        rotate2 -= Helper2D.PI2;
                    }

                    // 需要旋转的弧度值
                    const rotation: number = rotate2 - this.transform.rotation;
                    // 扭矩限制转向能力
                    const torque: number = suncom.Common.clamp(this.$torque * delta * 10, 0, Helper2D.PI);

                    // 转向
                    if (rotation < -torque) {
                        this.transform.rotateBy(-torque);
                    }
                    else if (rotation > torque) {
                        this.transform.rotateBy(torque);
                    }
                    else {
                        this.transform.rotateBy(rotation);
                    }
                }
            }

            // 计算实时速率
            p.assign(this.moveSpeed, 0).rotate(this.transform.rotation);
            // 移动
            this.transform.moveBy(p.x * delta, p.y * delta);

            suncom.Pool.recover("world2d.Vector2D", p);
        }

        /**
         * 扭矩（最大转向角度）
         */
        get torque(): number {
            return Helper2D.r2d(this.$torque);
        }
        set torque(value: number) {
            this.$torque = Helper2D.d2r(value);
        }
    }
}
