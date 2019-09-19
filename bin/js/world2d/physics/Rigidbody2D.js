var world2d;
(function (world2d) {
    /**
     * 刚体
     */
    var Rigidbody2D = /** @class */ (function () {
        function Rigidbody2D() {
            /**
             * 当前速率，此为临时变量
             */
            this.$velocity = new world2d.Vector2D(0, 0);
            /**
             * 扭矩（最大转向弧度）
             */
            this.$torque = 180;
            /**
             * 速率
             */
            this.velocity = null;
        }
        /**
         * 更新数据
         */
        Rigidbody2D.prototype.update = function (delta) {
            // 若速率为0，则直接返回
            if (this.velocity === null || this.velocity.length() === 0) {
                return;
            }
            // 若扭矩为180，则进行简单的移动
            if (this.$torque === 180) {
                this.transform.moveBy(this.velocity.x * delta, this.velocity.y * delta);
            }
            else {
                // 刚体的旋转弧度
                var rotation = this.transform.rotation;
                // 扭矩换算
                var torque = this.$torque * delta * 10;
                // 计算转向极限能力
                var min = rotation - world2d.Helper2D.PI;
                var max = rotation + world2d.Helper2D.PI;
                // 当前速率角度（弧度）
                var radian = this.velocity.angle();
                // 修正速率方向
                if (radian < min) {
                    radian += world2d.Helper2D.PI2;
                }
                else if (radian > max) {
                    radian -= world2d.Helper2D.PI2;
                }
                // 若面向差大于扭矩，则进行偏移
                var abs = world2d.Helper2D.abs(radian - rotation);
                if (abs !== 0) {
                    if (abs > torque) {
                        if (radian > rotation) {
                            this.transform.rotateBy(torque);
                        }
                        else {
                            this.transform.rotateBy(-torque);
                        }
                    }
                    else {
                        this.transform.rotateTo(radian);
                    }
                }
                // 计算实时速率
                this.$velocity.assign(this.velocity.x, this.velocity.y);
                // 修正当前速率的角度
                if (abs !== 0) {
                    this.$velocity.rotate(rotation - radian);
                }
                // 移动
                this.transform.moveBy(this.$velocity.x * delta, this.$velocity.y * delta);
            }
        };
        Object.defineProperty(Rigidbody2D.prototype, "torque", {
            /**
             * 扭矩（最大转向角度）
             */
            get: function () {
                return world2d.Helper2D.r2d(this.$torque);
            },
            set: function (value) {
                this.$torque = world2d.Helper2D.d2r(value);
            },
            enumerable: true,
            configurable: true
        });
        return Rigidbody2D;
    }());
    world2d.Rigidbody2D = Rigidbody2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=Rigidbody2D.js.map