var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var world2d;
(function (world2d) {
    /**
     * 转换器，用来保存对撞机数据模型在世界空间中的坐标、旋转和缩放值，并提供变换的接口
     * export
     */
    var Transform2D = /** @class */ (function (_super) {
        __extends(Transform2D, _super);
        /**
         * @vertexs: 原始顶点数据
         * export
         */
        function Transform2D(entity, collider, rigidbody, collision) {
            var _this = _super.call(this) || this;
            /**
             * 坐标
             */
            _this.$x = 0;
            _this.$y = 0;
            _this.$scaleTo = 1;
            _this.$rotateTo = 0;
            /**
             * 旋转（角度）
             */
            _this.$rotation = 0;
            /**
             * 是否有效（一次性值，默认为true，当其被置成false时，将永远不会被重置）
             */
            _this.$enabled = true;
            /**
             * 实体对象
             */
            _this.$entity = null;
            /**
             * 刚体
             */
            _this.$rigidbody = null;
            /**
             * 碰撞次数，大于0说明对象发生了碰撞
             */
            _this.hitNum = 0;
            // 实体对象
            _this.$entity = entity;
            // 碰撞体
            _this.$collider = collider;
            // 刚体对象
            _this.$rigidbody = rigidbody;
            // 碰撞区域
            _this.$collision = collision;
            // 为刚体指定实体对象
            if (rigidbody !== null) {
                rigidbody.transform = _this;
            }
            return _this;
        }
        /**
         * 2D世界通过调用此方法完成对象的数据转换与碰撞
         */
        Transform2D.prototype.transform = function (delta) {
            // 物理模拟计算
            if (this.$rigidbody !== null) {
                this.$rigidbody.update(delta);
            }
            var needUpdate = this.$needUpdate();
            var isModifiedByExtern = this.$isModifiedByExtern();
            // 不需要更新数据
            if (needUpdate === false && isModifiedByExtern === false) {
                return;
            }
            // 无论是否从外部更新的数据，变形、旋转和位移的操作始终是有效的
            this.$scale = this.$scaleTo;
            this.$radian = this.$rotateTo;
            this.$collision.x = this.$x;
            this.$collision.y = this.$y;
            if (isModifiedByExtern === false) {
                // 注意这三个函数的调用顺序不可互换
                this.$applyScale();
                this.$applyRotate();
                this.$applyPosition();
            }
            // 必为多边形
            else {
                var collision = this.$collision;
                collision.prepareVertexs();
            }
            // 更新碰撞体数据
            this.$updateCollision();
        };
        /**
         * 移动
         */
        Transform2D.prototype.moveBy = function (x, y) {
            this.$x += x;
            this.$y += y;
        };
        /**
         * 移动至
         * export
         */
        Transform2D.prototype.moveTo = function (x, y) {
            this.$x = x;
            this.$y = y;
        };
        /**
         * 变形
         */
        Transform2D.prototype.scaleBy = function (value) {
            this.$scaleTo *= value;
        };
        /**
         * 变形至
         */
        Transform2D.prototype.scaleTo = function (value) {
            this.$scaleTo = value;
        };
        /**
         * 旋转（弧度）
         */
        Transform2D.prototype.rotateBy = function (value) {
            this.$updateRadian(this.$rotateTo + value);
        };
        /**
         * 旋转至（弧度）
         * export
         */
        Transform2D.prototype.rotateTo = function (value) {
            this.$updateRadian(value);
        };
        /**
         * 更新弧度（此方法将旋转角度限定在0到2PI之间）
         */
        Transform2D.prototype.$updateRadian = function (radian) {
            if (radian < 0) {
                radian %= world2d.Helper2D.PI2;
                radian += world2d.Helper2D.PI2;
            }
            else if (radian >= world2d.Helper2D.PI2) {
                radian %= world2d.Helper2D.PI2;
            }
            if (this.$rotateTo !== radian) {
                this.$rotateTo = radian;
                this.$rotation = world2d.Helper2D.r2d(radian);
            }
        };
        /**
         * 更新碰撞区域
         */
        Transform2D.prototype.$updateCollision = function () {
            // 更新包围盒数据
            this.$collision.updateBounds();
            // 多边形还需要准备边数据
            if (this.$collision.shap === world2d.CollisionShapEnum2D.POLYGON) {
                var collision = this.$collision;
                collision.prepareSegments();
            }
            // 矩形还需要准备顶点数据和边数据
            else if (this.$collision.shap === world2d.CollisionShapEnum2D.RECTANGLE) {
                var collision = this.$collision;
                collision.prepareVertexs();
                collision.prepareSegments();
            }
        };
        Transform2D.prototype.$applyPosition = function () {
            // 多边形需要更新重组所有顶点的位置
            if (this.$collider.shap !== world2d.ColliderShapEnum2D.CIRCLE) {
                var collision = this.$collision;
                for (var i = 0; i < collision.vertexs.length; i++) {
                    var p = collision.vertexs[i];
                    p.x += this.$x;
                    p.y += this.$y;
                }
            }
        };
        Transform2D.prototype.$applyRotate = function () {
            // 只有多边形对撞机才支持旋转
            if (this.$collider.shap === world2d.ColliderShapEnum2D.POLYGON) {
                var collision = this.$collision;
                for (var i = 0; i < collision.vertexs.length; i++) {
                    var p = collision.vertexs[i];
                    p.rotate(this.$radian);
                }
            }
        };
        Transform2D.prototype.$applyScale = function () {
            if (this.$collision.shap === world2d.CollisionShapEnum2D.CIRCLE) {
                var collider = this.$collider;
                var collision = this.$collision;
                // 对半径进行缩放
                collision.radius = collider.radius * this.$scale;
            }
            else {
                var collider = this.$collider;
                var collision = this.$collision;
                // 对顶点向量进行缩放
                for (var i = 0; i < collider.vertexs.length; i++) {
                    var a = collider.vertexs[i];
                    var b = collision.vertexs[i];
                    b.assign(a.x, a.y).mul(this.$scale);
                }
            }
        };
        Transform2D.prototype.$needUpdate = function () {
            if (this.$scale !== this.$scaleTo) {
                return true;
            }
            else if (this.$radian !== this.$rotateTo) {
                return true;
            }
            else if (this.$x !== this.$collision.x || this.$y !== this.$collision.y) {
                return true;
            }
            else {
                return false;
            }
        };
        Transform2D.prototype.$isModifiedByExtern = function () {
            if (this.$collision.shap === world2d.CollisionShapEnum2D.POLYGON) {
                var collision = this.$collision;
                return collision.modified;
            }
            return false;
        };
        /**
         * 获取旋转角度
         * export
         */
        Transform2D.prototype.getRotation = function () {
            return this.$rotation;
        };
        /**
         * 设置旋转角度
         * export
         */
        Transform2D.prototype.setRotation = function (rotation) {
            this.rotateTo(world2d.Helper2D.d2r(rotation));
        };
        /**
         * 设置为无效
         * export
         */
        Transform2D.prototype.disabled = function () {
            this.$enabled = false;
        };
        Object.defineProperty(Transform2D.prototype, "layer", {
            /**
             * 碰撞层级
             */
            get: function () {
                return this.$layer;
            },
            set: function (value) {
                this.$layer = value;
                this.dispatchEvent(world2d.World2D.TRANSFORM_LAYER_CHANGED, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "x", {
            /**
             * 获取坐标
             * export
             */
            get: function () {
                return this.$x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "y", {
            /**
             * export
             */
            get: function () {
                return this.$y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "scale", {
            /**
             * 变形
             */
            get: function () {
                return this.$scaleTo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "rotation", {
            /**
             * 旋转（弧度）
             */
            get: function () {
                return this.$rotateTo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "enabled", {
            /**
             * 是否有效（一次性值，默认为true，当其被置成false时，将永远不会被重置）
             * export
             */
            get: function () {
                return this.$enabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "entity", {
            /**
             * 获取实体对象
             * export
             */
            get: function () {
                return this.$entity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "collider", {
            /**
             * 对撞机
             */
            get: function () {
                return this.$collider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "collision", {
            /**
             * 碰撞体
             * export
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
             * export
             */
            get: function () {
                return this.$rigidbody;
            },
            enumerable: true,
            configurable: true
        });
        return Transform2D;
    }(suncom.EventSystem));
    world2d.Transform2D = Transform2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=Transform2D.js.map