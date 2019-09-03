var world2d;
(function (world2d) {
    var CollisionContact2D = /** @class */ (function () {
        function CollisionContact2D(a, b) {
            /**
             * 是否使用box2d的碰撞算法
             * NOTE: box2d中的碰撞算法效率很高，但并不精确
             */
            this.useBox2d = true;
            /**
             * 是否检测包围盒
             */
            this.$testAABB = true;
            /**
             * 相撞标记
             */
            this.$touching = false;
            if (a.collision.shap === world2d.CollisionShapEnum2D.CIRCLE) {
                this.$a = a;
                this.$b = b;
                if (b.collision.shap === world2d.CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2c;
                    // 圆对圆不需要检测包围盒
                    this.$testAABB = false;
                }
                else if (b.collision.shap === world2d.CollisionShapEnum2D.RECTANGLE) {
                    this.$testFunc = this.$c2r;
                }
                else {
                    this.$testFunc = this.$c2p;
                }
            }
            else if (a.collision.shap === world2d.CollisionShapEnum2D.RECTANGLE) {
                if (b.collision.shap === world2d.CollisionShapEnum2D.CIRCLE) {
                    this.$a = b;
                    this.$b = a;
                    this.$testFunc = this.$c2r;
                }
                else if (b.collision.shap === world2d.CollisionShapEnum2D.RECTANGLE) {
                    this.$a = a;
                    this.$b = b;
                    this.$testFunc = this.$r2r;
                    // 矩型对矩型不需要检测包围盒
                    this.$testAABB = false;
                }
                else {
                    this.$a = a;
                    this.$b = b;
                    this.$testFunc = this.$r2p;
                }
            }
            else {
                this.$a = b;
                this.$b = a;
                if (b.collision.shap === world2d.CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2p;
                }
                else if (b.collision.shap === world2d.CollisionShapEnum2D.RECTANGLE) {
                    this.$testFunc = this.$r2p;
                }
                else {
                    this.$testFunc = this.$p2p;
                }
            }
        }
        /**
         * 检测是否相撞
         */
        CollisionContact2D.prototype.test = function () {
            var a = this.$a;
            var b = this.$b;
            var collide = this.$testAABB == false ? true : world2d.CollisionResolution2D.bounds2Bounds(a.bounds, b.bounds);
            // 若包围盒发生碰撞，则继续检测
            if (collide === true) {
                collide = this.$testFunc.call(this, a.collision, b.collision);
            }
            if (collide === true) {
                if (this.$touching === false) {
                    this.$touching = true;
                    a.hitNum++;
                    b.hitNum++;
                    this.doCollide(world2d.CollisionType.COLLISION_ENTER);
                }
                else {
                    this.doCollide(world2d.CollisionType.COLLISION_STAY);
                }
            }
            else if (this.$touching === true) {
                this.$touching = false;
                a.hitNum--;
                b.hitNum--;
                this.doCollide(world2d.CollisionType.COLLISION_EXIT);
            }
        };
        CollisionContact2D.prototype.doCollide = function (type) {
            var a = this.$a;
            var b = this.$b;
            if (type === world2d.CollisionType.COLLISION_ENTER) {
                a.onCollisionEnter(b);
                b.onCollisionEnter(a);
            }
            else if (type === world2d.CollisionType.COLLISION_EXIT) {
                a.onCollisionExit(b);
                b.onCollisionExit(a);
            }
            else {
                a.onCollisionStay(b);
                b.onCollisionStay(a);
            }
        };
        /**
         * 圆与圆
         */
        CollisionContact2D.prototype.$c2c = function (a, b) {
            return world2d.CollisionResolution2D.circle2Circle(a, b);
        };
        /**
         * 矩型与圆
         */
        CollisionContact2D.prototype.$c2r = function (c, r) {
            if (this.useBox2d === true) {
                return world2d.CollisionResolutionBox2D.circle2Polygon(new world2d.Vector2D(c.x, c.y), c.radius, r.vertexs);
            }
            return world2d.CollisionResolution2D.circle2Polygin(c, r);
        };
        /**
         * 多边型与圆
         */
        CollisionContact2D.prototype.$c2p = function (c, p) {
            if (this.useBox2d === true) {
                return world2d.CollisionResolutionBox2D.circle2Polygon(new world2d.Vector2D(c.x, c.y), c.radius, p.vertexs);
            }
            return world2d.CollisionResolution2D.circle2Polygin(c, p);
        };
        /**
         * 矩型与矩型
         */
        CollisionContact2D.prototype.$r2r = function () {
            // 直接返回边框的碰撞结果
            return world2d.CollisionResolution2D.bounds2Bounds(this.$a.bounds, this.$b.bounds);
        };
        /**
         * 矩型与多边型
         */
        CollisionContact2D.prototype.$r2p = function (r, p) {
            if (this.useBox2d === true) {
                return world2d.CollisionResolutionBox2D.polygon2Polygon(r.vertexs, p.vertexs);
            }
            return world2d.CollisionResolution2D.polygon2Vertexs(p, r.vertexs);
        };
        /**
         * 多边形与多边形
         */
        CollisionContact2D.prototype.$p2p = function (p1, p2) {
            if (this.useBox2d === true) {
                return world2d.CollisionResolutionBox2D.polygon2Polygon(p1.vertexs, p2.vertexs);
            }
            return world2d.CollisionResolution2D.polygon2Vertexs(p1, p2.vertexs) && world2d.CollisionResolution2D.polygon2Vertexs(p2, p1.vertexs);
        };
        Object.defineProperty(CollisionContact2D.prototype, "a", {
            get: function () {
                return this.$a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CollisionContact2D.prototype, "b", {
            get: function () {
                return this.$b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CollisionContact2D.prototype, "touching", {
            /**
             * 相撞标记
             */
            get: function () {
                return this.$touching;
            },
            enumerable: true,
            configurable: true
        });
        return CollisionContact2D;
    }());
    world2d.CollisionContact2D = CollisionContact2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=CollisionContact2D.js.map