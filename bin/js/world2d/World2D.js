var world2d;
(function (world2d) {
    /**
     * 2D世界
     * 此类主要实现2D世界的碰撞
     */
    var World2D = /** @class */ (function () {
        /**
         * 碰撞分组，一经设置不可更改
         */
        function World2D(graphics) {
            /**
             * 层级关系
             */
            this.$detectors = [];
            /**
             * 碰撞关系
             */
            this.$contacts = [];
            /**
             * 世界中的对象
             */
            this.$transforms = [];
            // 保存世界对象为单例
            World2D.inst = this;
            // 世界绘制接口
            world2d.DrawAPI2D.graphics = graphics;
            // 默认层级中的所有元素都会相互碰撞
            this.addDetector(world2d.CollisionLayerEnum.DEFAULT, world2d.CollisionLayerEnum.DEFAULT);
        }
        /**
         * 实时物理计算
         */
        World2D.prototype.update = function (delta) {
            // 世界数据转换
            for (var i = 0; i < this.$transforms.length; i++) {
                this.$transforms[i].transform(delta);
            }
            for (var i = 0; i < this.$contacts.length; i++) {
                this.$contacts[i].test();
            }
            // 绘制世界
            World2D.DEBUG === true && world2d.DrawAPI2D.draw(this.$transforms);
        };
        /**
         * 添加对象
         * @layer: 默认为 CollisionLayerEnum.DEFAULT
         */
        World2D.prototype.addTransform = function (transform, layer) {
            if (layer === void 0) { layer = world2d.CollisionLayerEnum.DEFAULT; }
            transform.layer = layer;
            for (var i = 0; i < this.$transforms.length; i++) {
                var transform2 = this.$transforms[i];
                if (this.$shouldCollide(transform.layer, transform2.layer) === true) {
                    var contact = new world2d.CollisionContact2D(transform, transform2);
                    this.$contacts.push(contact);
                }
            }
            this.$transforms.push(transform);
        };
        /**
         * 移除对象
         */
        World2D.prototype.removeTransform = function (transform) {
            var index = this.$transforms.indexOf(transform);
            if (index < 0) {
                return;
            }
            this.$transforms.splice(index, 1);
            for (var i = this.$contacts.length - 1; i > -1; i--) {
                var contact = this.$contacts[i];
                if (contact.a === transform || contact.b === transform) {
                    if (contact.touching === true) {
                        contact.doCollide(world2d.CollisionType.COLLISION_EXIT);
                    }
                    this.$contacts.splice(i, 1);
                }
            }
        };
        /**
         * 添加探测器
         */
        World2D.prototype.addDetector = function (a, b) {
            if (a > b) {
                var t = a;
                a = b;
                b = t;
            }
            if (this.$detectors[a] === void 0) {
                this.$detectors[a] = [];
            }
            this.$detectors[a][b] = true;
        };
        /**
         * 判断两个对象是否需要发生碰撞
         */
        World2D.prototype.$shouldCollide = function (a, b) {
            if (a > b) {
                var t = a;
                a = b;
                b = t;
            }
            if (this.$detectors[a] !== void 0 && this.$detectors[a][b] === true) {
                return true;
            }
            return false;
        };
        Object.defineProperty(World2D.prototype, "transforms", {
            /**
             * 获取对象集合
             */
            get: function () {
                return this.$transforms;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 调试模式
         */
        World2D.DEBUG = false;
        return World2D;
    }());
    world2d.World2D = World2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=World2D.js.map