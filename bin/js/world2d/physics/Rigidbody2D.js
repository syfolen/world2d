var world2d;
(function (world2d) {
    /**
     * 刚体
     * export
     */
    var Rigidbody2D = /** @class */ (function () {
        function Rigidbody2D() {
            /**
             * 扭矩（最大转向弧度）
             */
            this.$torque = 180;
            /**
             * 追踪的目标
             * export
             */
            this.target = null;
            /**
             * 移动速度
             * export
             */
            this.moveSpeed = 0;
        }
        /**
         * 更新数据
         */
        Rigidbody2D.prototype.update = function (delta) {
            // 若移动速度为0，则直接返回
            if (this.moveSpeed === 0) {
                return;
            }
            // 若目标无效，则放弃追踪
            if (this.target !== null && this.target.enabled === false) {
                this.target = null;
            }
            var p = suncom.Pool.getItemByClass("world2d.Vector2D", world2d.Vector2D, [0, 0]);
            // 若存在目标，则调整速率角度
            if (this.target !== null) {
                p.assign(this.target.x - this.transform.x, this.target.y - this.transform.y);
                // 目标方向
                var rotate2 = p.angle();
                // 若扭矩为180，则直接旋转至目标方向
                if (this.$torque === 180) {
                    this.transform.rotateTo(rotate2);
                }
                // 否则需要考虑旋转极限
                else {
                    // 转向极限
                    var min = this.transform.rotation - world2d.Helper2D.PI;
                    var max = this.transform.rotation + world2d.Helper2D.PI;
                    if (rotate2 < min) {
                        rotate2 += world2d.Helper2D.PI2;
                    }
                    else if (rotate2 > max) {
                        rotate2 -= world2d.Helper2D.PI2;
                    }
                    // 需要旋转的弧度值
                    var rotation = rotate2 - this.transform.rotation;
                    // 扭矩限制转向能力
                    var torque = suncom.Common.clamp(this.$torque * delta * 10, 0, world2d.Helper2D.PI);
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