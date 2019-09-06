var world2d;
(function (world2d) {
    var TestWorld2dShap = /** @class */ (function () {
        function TestWorld2dShap(layer) {
            this.$posX = Math.random() * Global.WIDTH;
            this.$posY = Math.random() * Global.HEIGHT;
            this.$speedX = Math.random() * 40 - 20;
            this.$speedY = Math.random() * 40 - 20;
            this.$radius = Math.random() * 50 + 50;
            this.$width = Math.random() * 50 + 50;
            this.$height = Math.random() * 50 + 50;
            this.$rotation = Math.random() * 2 - 1;
            this.$scale = 0.01;
            this.$collider = this.$createCollider();
            this.$collision = this.$createCollision();
            var rigidbody = new world2d.Rigidbody2D();
            rigidbody.velocity = new world2d.Vector2D(this.$speedX, this.$speedY);
            this.$transform = new world2d.Transform2D(this, this.$collider, rigidbody, this.$collision);
            var world = Global.world2d;
            world.addTransform(this.$transform, world2d.CollisionLayerEnum.DEFAULT);
            Laya.timer.frameLoop(1, this, this.$onEnterFrame);
        }
        TestWorld2dShap.prototype.$onEnterFrame = function () {
            if (this.$transform.x < 0) {
                this.$transform.rigidbody.velocity.x = Math.abs(this.$transform.rigidbody.velocity.x);
            }
            else if (this.$transform.x > Global.WIDTH) {
                this.$transform.rigidbody.velocity.x = -Math.abs(this.$transform.rigidbody.velocity.x);
            }
            if (this.$transform.y < 0) {
                this.$transform.rigidbody.velocity.y = Math.abs(this.$transform.rigidbody.velocity.y);
            }
            else if (this.$transform.y > Global.HEIGHT) {
                this.$transform.rigidbody.velocity.y = -Math.abs(this.$transform.rigidbody.velocity.y);
            }
            // this.$transform.scaleBy(this.$scale);
            // if (this.$transform.scale > 1.5 && this.$scale > 0) {
            //     this.$scale = -0.01;
            // }
            // else if (this.$transform.scale < 1 && this.$scale < 0) {
            //     this.$scale = 0.01;
            // }
        };
        /**
         * 碰撞产生
         */
        TestWorld2dShap.prototype.onCollisionEnter = function (other) {
        };
        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        TestWorld2dShap.prototype.onCollisionStay = function (other) {
        };
        /**
         * 碰撞结束
         */
        TestWorld2dShap.prototype.onCollisionExit = function (other) {
        };
        Object.defineProperty(TestWorld2dShap.prototype, "transform", {
            /**
             * 物理数据转换器
             */
            get: function () {
                return this.$transform;
            },
            enumerable: true,
            configurable: true
        });
        return TestWorld2dShap;
    }());
    world2d.TestWorld2dShap = TestWorld2dShap;
})(world2d || (world2d = {}));
//# sourceMappingURL=TestWorld2dShap.js.map