var world2d;
(function (world2d) {
    /**
     * 物理数据转化对象
     */
    var Transform2D = /** @class */ (function () {
        /**
         * @vertexs: 原始顶点数据
         */
        function Transform2D(collider, rigidbody, collision) {
            /**
             * 缩放值
             */
            this.$scale = 1;
            /**
             * 旋转（弧度）
             */
            this.$angle = 0;
            /**
             * 旋转度
             */
            this.$rotation = 0;
            /**
             * 属性是否发生改变
             */
            this.$modified = false;
            /**
             * 碰撞次数，大于0说明对象发生了碰撞
             */
            this.hitNum = 0;
            // 碰撞体
            this.$collider = collider;
            // 刚体对象
            this.$rigidbody = rigidbody;
            // 碰撞区域
            this.$collision = collision;
            // 为刚体指定实体对象
            if (rigidbody) {
                rigidbody.transform = this;
            }
            // 创建包围盒
            this.$bounds = new world2d.Bounds();
            // 更新包围盒数据
            this.$updateBounds();
            // 更新碰撞区域
            if (collision) {
                this.$updateCollision();
            }
        }
        /**
         * 2D世界通过调用此方法完成对象的数据转换与碰撞
         */
        Transform2D.prototype.transform = function (delta) {
            // 物理模拟计算
            if (this.$rigidbody) {
                this.$rigidbody.update(delta);
            }
            // 若数据未发生变化，则直接返回
            if (this.$modified == false) {
                return;
            }
            // 标记数据未变化
            this.$modified = false;
            // 更新包围盒数据
            this.$updateBounds();
            // 更新碰撞区域
            this.$updateCollision();
        };
        /**
         * 注册碰撞回调
         */
        Transform2D.prototype.registerCollideHandler = function (type, method, caller) {
        };
        /**
         * 碰撞产生
         */
        Transform2D.prototype.onCollisionEnter = function (other) {
        };
        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        Transform2D.prototype.onCollisionStay = function (other) {
        };
        /**
         * 碰撞结束
         */
        Transform2D.prototype.onCollisionExit = function (other) {
        };
        /**
         * 移动
         */
        Transform2D.prototype.moveBy = function (x, y) {
            this.$collider.x += x;
            this.$collider.y += y;
            this.$modified = true;
        };
        /**
         * 移动至
         */
        Transform2D.prototype.moveTo = function (x, y) {
            this.$collider.x = x;
            this.$collider.y = y;
            this.$modified = true;
        };
        /**
         * 变形
         */
        Transform2D.prototype.scaleBy = function (value) {
            this.$scale += value;
            this.$collider.scale(1 / this.$scale + value);
            this.$modified = true;
        };
        /**
         * 变形至
         */
        Transform2D.prototype.scaleTo = function (value) {
            this.$collider.scale(value / this.$scale);
            this.$scale = value;
            this.$modified = true;
        };
        /**
         * 旋转（弧度）
         */
        Transform2D.prototype.rotateBy = function (angle) {
            this.$collider.rotate(angle);
            this.$updateAngle(this.$angle + angle);
            // 多边型在旋转之后需要更新矩形显示区域
            if (this.$collider.shap == world2d.ColliderShapEnum2D.POLYGON) {
                this.$modified = true;
            }
        };
        /**
         * 旋转至（弧度）
         */
        Transform2D.prototype.rotateTo = function (angle) {
            this.$collider.rotate(angle - this.$angle);
            this.$updateAngle(angle);
            // 多边型在旋转之后需要更新矩形显示区域
            if (this.$collider.shap == world2d.ColliderShapEnum2D.POLYGON) {
                this.$modified = true;
            }
        };
        /**
         * 更新旋转角度（此方法将旋转角度限定在0到360之间）
         */
        Transform2D.prototype.$updateAngle = function (angle) {
            if (angle < 0) {
                angle %= world2d.Helper2D.PI2;
                angle += world2d.Helper2D.PI2;
            }
            else if (angle >= world2d.Helper2D.PI2) {
                angle %= world2d.Helper2D.PI2;
            }
            this.$angle = angle;
            this.$rotation = world2d.Helper2D.a2d(angle);
        };
        /**
         * 获取旋转角度
         */
        Transform2D.prototype.getRotation = function () {
            return this.$rotation;
        };
        /**
         * 设置旋转角度
         */
        Transform2D.prototype.setRotation = function (rotation) {
            this.rotateTo(world2d.Helper2D.d2a(rotation));
        };
        /**
         * 更新包围盒数据
         */
        Transform2D.prototype.$updateBounds = function () {
            var x = this.$collider.x;
            var y = this.$collider.y;
            // 更新碰撞边界
            if (this.$collider.shap == world2d.ColliderShapEnum2D.CIRCLE) {
                var collider = this.$collider;
                var x_1 = collider.x;
                var y_1 = collider.y;
                var radius = collider.radius;
                this.$bounds.updateBounds(x_1 - radius, x_1 + radius, y_1 - radius, y_1 + radius);
            }
            else {
                var collider = this.$collider;
                var x_2 = collider.x;
                var y_2 = collider.y;
                var vertexs = collider.vertexs;
                var vertex = vertexs[0];
                var left = vertex.x;
                var right = vertex.x;
                var top_1 = vertex.y;
                var bottom = vertex.y;
                for (var i = 1; i < vertexs.length; i++) {
                    var vertex_1 = vertexs[i];
                    if (vertex_1.x < left) {
                        left = vertex_1.x;
                    }
                    else if (vertex_1.x > right) {
                        right = vertex_1.x;
                    }
                    if (vertex_1.y < top_1) {
                        top_1 = vertex_1.y;
                    }
                    else if (vertex_1.y > bottom) {
                        bottom = vertex_1.y;
                    }
                }
                this.$bounds.updateBounds(x_2 + left, x_2 + right, y_2 + top_1, y_2 + bottom);
            }
        };
        /**
         * 更新碰撞区域
         */
        Transform2D.prototype.$updateCollision = function () {
            // 圆形需要更新坐标和半径
            if (this.$collision.shap == world2d.CollisionShapEnum2D.CIRCLE) {
                var collider = this.$collider;
                var collision = this.$collision;
                collision.updateBounds(collider.x, collider.y, collider.radius);
            }
            // 矩形直接以包围盒数据作为更新
            else if (this.$collision.shap == world2d.CollisionShapEnum2D.RECTANGLE) {
                var collision = this.$collision;
                collision.updateBounds(this.$bounds.left, this.$bounds.right, this.$bounds.top, this.$bounds.bottom);
                // 矩形还需要准备顶点数据
                collision.prepareVertexs();
                // 准备边数据
                collision.prepareSegments();
            }
            // 多边形需要更新顶点数据
            else {
                var collider = this.$collider;
                var collision = this.$collision;
                // 更新坐标和顶点数据
                collision.updateVertexs(collider.x, collider.y, collider.vertexs);
                // 多边形还需要准备边数据
                collision.prepareSegments();
            }
        };
        Object.defineProperty(Transform2D.prototype, "x", {
            /**
             * 获取坐标
             */
            get: function () {
                return this.$collider.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "y", {
            get: function () {
                return this.$collider.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "scale", {
            /**
             * 变形
             */
            get: function () {
                return this.$scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "rotation", {
            /**
             * 旋转（弧度）
             */
            get: function () {
                return this.$angle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "bounds", {
            /**
             * 包围盒
             */
            get: function () {
                return this.$bounds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "collider", {
            /**
             * 获取碰撞体
             */
            get: function () {
                return this.$collider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "collision", {
            /**
             * 碰撞区域
             */
            get: function () {
                return this.$collision;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "rigidbody", {
            /**
             * 获取刚体
             */
            get: function () {
                return this.$rigidbody;
            },
            enumerable: true,
            configurable: true
        });
        return Transform2D;
    }());
    world2d.Transform2D = Transform2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=Transform2D.js.map