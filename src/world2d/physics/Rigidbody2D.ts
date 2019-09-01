
module world2d {

    /**
     * 刚体
     */
    export class Rigidbody2D implements IRigidbody2D {
        /**
         * 当前速率，此为临时变量
         */
        private $velocity: IVector2D = new Vector2D(0, 0);

        /**
         * 扭矩（最大转向弧度）
         */
        private $torque: number = 180;

        /**
         * 物理对象
         */
        transform: ITransform2D;

        /**
         * 速率
         */
        velocity: IVector2D;

        /**
         * 更新数据
         */
        update(delta: number): void {
            // 若速率为0，则直接返回
            if (this.velocity == null || this.velocity.length() == 0) {
                return;
            }

            // 若扭矩为180，则进行简单的移动
            if (this.$torque == 180) {
                this.transform.moveBy(this.velocity.x * delta, this.velocity.y * delta);
            }
            else {
                // 刚体的旋转弧度
                const rotation: number = this.transform.rotation;
                // 扭矩换算
                const torque: number = this.$torque * delta * 10;

                // 计算转向极限能力
                const min: number = rotation - Helper2D.PI;
                const max: number = rotation + Helper2D.PI;

                // 当前速率角度（弧度）
                let angle: number = this.velocity.angle();
                // 修正速率方向
                if (angle < min) {
                    angle += Helper2D.PI2;
                }
                else if (angle > max) {
                    angle -= Helper2D.PI2;
                }

                // 若面向差大于扭矩，则进行偏移
                const abs: number = Helper2D.abs(angle - rotation);
                if (abs != 0) {
                    if (abs > torque) {
                        if (angle > rotation) {
                            this.transform.rotateBy(torque);
                        }
                        else {
                            this.transform.rotateBy(-torque);
                        }
                    }
                    else {
                        this.transform.rotateTo(angle);
                    }
                }

                // 计算实时速率
                this.$velocity.assign(this.velocity.x, this.velocity.y);
                // 修正当前速率的角度
                if (abs != 0) {
                    this.$velocity.rotate(rotation - angle);
                }
                // 移动
                this.transform.moveBy(this.$velocity.x * delta, this.$velocity.y * delta);
            }
        }

        /**
         * 扭矩（最大转向角度）
         */
        get torque(): number {
            return Helper2D.a2d(this.$torque);
        }
        set torque(value: number) {
            this.$torque = Helper2D.d2a(value);
        }
    }
}