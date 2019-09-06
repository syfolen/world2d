"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var world2d;
(function (world2d) {
    /**
     * 碰撞体形状枚举
     */
    var ColliderShapEnum2D;
    (function (ColliderShapEnum2D) {
        /**
         * 圆型
         */
        ColliderShapEnum2D[ColliderShapEnum2D["CIRCLE"] = 0] = "CIRCLE";
        /**
         * 多边型
         */
        ColliderShapEnum2D[ColliderShapEnum2D["POLYGON"] = 1] = "POLYGON";
    })(ColliderShapEnum2D = world2d.ColliderShapEnum2D || (world2d.ColliderShapEnum2D = {}));
    /**
     * 碰撞层级
     */
    var CollisionLayerEnum;
    (function (CollisionLayerEnum) {
        /**
         * 默认
         */
        CollisionLayerEnum[CollisionLayerEnum["DEFAULT"] = 1] = "DEFAULT";
        /**
         * 鱼
         */
        CollisionLayerEnum[CollisionLayerEnum["FISH"] = 2] = "FISH";
        /**
         * 子弹
         */
        CollisionLayerEnum[CollisionLayerEnum["BULLET"] = 4] = "BULLET";
        CollisionLayerEnum[CollisionLayerEnum["POLYGON"] = 8] = "POLYGON";
        CollisionLayerEnum[CollisionLayerEnum["CIRCLE"] = 16] = "CIRCLE";
        CollisionLayerEnum[CollisionLayerEnum["RECTANLE"] = 32] = "RECTANLE";
        CollisionLayerEnum[CollisionLayerEnum["ALL"] = 4096] = "ALL";
    })(CollisionLayerEnum = world2d.CollisionLayerEnum || (world2d.CollisionLayerEnum = {}));
    /**
     * 碰撞区域形状枚举
     */
    var CollisionShapEnum2D;
    (function (CollisionShapEnum2D) {
        /**
         * 圆型
         */
        CollisionShapEnum2D[CollisionShapEnum2D["CIRCLE"] = 0] = "CIRCLE";
        /**
         * 多边型
         */
        CollisionShapEnum2D[CollisionShapEnum2D["POLYGON"] = 1] = "POLYGON";
        /**
         * 矩形
         */
        CollisionShapEnum2D[CollisionShapEnum2D["RECTANGLE"] = 2] = "RECTANGLE";
    })(CollisionShapEnum2D = world2d.CollisionShapEnum2D || (world2d.CollisionShapEnum2D = {}));
    /**
     * 碰撞类型
     */
    var CollisionType;
    (function (CollisionType) {
        /**
         * 发生碰撞
         */
        CollisionType[CollisionType["COLLISION_ENTER"] = 0] = "COLLISION_ENTER";
        /**
         * 保持碰撞
         */
        CollisionType[CollisionType["COLLISION_STAY"] = 1] = "COLLISION_STAY";
        /**
         * 结束碰撞
         */
        CollisionType[CollisionType["COLLISION_EXIT"] = 2] = "COLLISION_EXIT";
    })(CollisionType = world2d.CollisionType || (world2d.CollisionType = {}));
    /**
     * 图形边界对象
     */
    var Bounds = /** @class */ (function () {
        function Bounds() {
        }
        /**
         * 更新边界数据
         */
        Bounds.prototype.updateBounds = function (left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        };
        return Bounds;
    }());
    world2d.Bounds = Bounds;
    /**
     * 对撞机
     */
    var Collider2D = /** @class */ (function () {
        function Collider2D(x, y, shap) {
            this.x = x;
            this.y = y;
            this.$shap = shap;
        }
        Object.defineProperty(Collider2D.prototype, "shap", {
            /**
             * 形状
             */
            get: function () {
                return this.$shap;
            },
            enumerable: true,
            configurable: true
        });
        return Collider2D;
    }());
    world2d.Collider2D = Collider2D;
    /**
     * 圆形对撞机
     */
    var ColliderCircle2D = /** @class */ (function (_super) {
        __extends(ColliderCircle2D, _super);
        function ColliderCircle2D(x, y, radius) {
            var _this = _super.call(this, x, y, ColliderShapEnum2D.CIRCLE) || this;
            _this.radius = radius;
            return _this;
        }
        /**
         * 变形
         */
        ColliderCircle2D.prototype.scale = function (value) {
            this.radius *= value;
        };
        /**
         * 旋转
         */
        ColliderCircle2D.prototype.rotate = function (angle) {
            // 圆形不需要实现旋转操作
        };
        /**
         * 克隆
         */
        ColliderCircle2D.prototype.clone = function () {
            return new ColliderCircle2D(this.x, this.y, this.radius);
        };
        return ColliderCircle2D;
    }(Collider2D));
    world2d.ColliderCircle2D = ColliderCircle2D;
    /**
     * 多边形对撞机
     */
    var ColliderPolygon2D = /** @class */ (function (_super) {
        __extends(ColliderPolygon2D, _super);
        /**
         * @vertexs: 原始顶点数据
         */
        function ColliderPolygon2D(x, y, vertexs) {
            var _this = _super.call(this, x, y, ColliderShapEnum2D.POLYGON) || this;
            _this.vertexs = vertexs;
            return _this;
        }
        /**
         * 变形
         */
        ColliderPolygon2D.prototype.scale = function (value) {
            for (var i = 0; i < this.vertexs.length; i++) {
                this.vertexs[i].mul(value);
            }
        };
        /**
         * 旋转
         */
        ColliderPolygon2D.prototype.rotate = function (angle) {
            for (var i = 0; i < this.vertexs.length; i++) {
                this.vertexs[i].rotate(angle);
            }
        };
        /**
         * 更新顶点数据
         * NOTE: 此更新并不会触发collision的刷新
         */
        ColliderPolygon2D.prototype.updateVertexs = function (vertexs) {
            for (var i = 0; i < vertexs.length; i++) {
                var vertex = vertexs[i];
                this.vertexs[i].assign(vertex.x, vertex.y);
            }
        };
        /**
         * 克隆
         */
        ColliderPolygon2D.prototype.clone = function () {
            var vertexs = [];
            for (var i = 0; i < this.vertexs.length; i++) {
                vertexs.push(this.vertexs[i].copy());
            }
            return new ColliderPolygon2D(this.x, this.y, vertexs);
        };
        return ColliderPolygon2D;
    }(Collider2D));
    world2d.ColliderPolygon2D = ColliderPolygon2D;
    /**
     * 碰撞区域
     */
    var Collision2D = /** @class */ (function () {
        function Collision2D(shap) {
            this.$shap = shap;
        }
        Object.defineProperty(Collision2D.prototype, "shap", {
            /**
             * 形状
             */
            get: function () {
                return this.$shap;
            },
            enumerable: true,
            configurable: true
        });
        return Collision2D;
    }());
    world2d.Collision2D = Collision2D;
    /**
     * 圆形碰撞区域（效率最高）
     */
    var CollisionCircle2D = /** @class */ (function (_super) {
        __extends(CollisionCircle2D, _super);
        function CollisionCircle2D(radius) {
            var _this = _super.call(this, CollisionShapEnum2D.CIRCLE) || this;
            // 默认半径
            _this.radius = radius;
            return _this;
        }
        /**
         * 更新碰撞区域
         */
        CollisionCircle2D.prototype.updateBounds = function (x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        };
        return CollisionCircle2D;
    }(Collision2D));
    world2d.CollisionCircle2D = CollisionCircle2D;
    var CollisionContact2D = /** @class */ (function () {
        function CollisionContact2D(a, b) {
            /**
             * 是否使用box2d的碰撞算法
             * NOTE: box2d中的碰撞算法效率很高，但并不精确
             */
            this.useBox2d = false;
            /**
             * 是否检测包围盒
             */
            this.$testAABB = true;
            /**
             * 相撞标记
             */
            this.$touching = false;
            if (a.collision.shap === CollisionShapEnum2D.CIRCLE) {
                this.$a = a;
                this.$b = b;
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2c;
                    // 圆对圆不需要检测包围盒
                    this.$testAABB = false;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    this.$testFunc = this.$c2r;
                }
                else {
                    this.$testFunc = this.$c2p;
                }
            }
            else if (a.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$a = b;
                    this.$b = a;
                    this.$testFunc = this.$c2r;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
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
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2p;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
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
            var collide = this.$testAABB == false ? true : CollisionResolution2D.bounds2Bounds(a.bounds, b.bounds);
            // 若包围盒发生碰撞，则继续检测
            if (collide === true) {
                collide = this.$testFunc.call(this, a.collision, b.collision);
            }
            if (collide === true) {
                if (this.$touching === false) {
                    this.$touching = true;
                    a.hitNum++;
                    b.hitNum++;
                    this.doCollide(CollisionType.COLLISION_ENTER);
                }
                else {
                    this.doCollide(CollisionType.COLLISION_STAY);
                }
            }
            else if (this.$touching === true) {
                this.$touching = false;
                a.hitNum--;
                b.hitNum--;
                this.doCollide(CollisionType.COLLISION_EXIT);
            }
        };
        CollisionContact2D.prototype.doCollide = function (type) {
            var a = this.$a;
            var b = this.$b;
            if (type === CollisionType.COLLISION_ENTER) {
                a.entity.onCollisionEnter(b.entity);
                b.entity.onCollisionEnter(a.entity);
            }
            else if (type === CollisionType.COLLISION_EXIT) {
                a.entity.onCollisionExit(b.entity);
                b.entity.onCollisionExit(a.entity);
            }
            else {
                a.entity.onCollisionStay(b.entity);
                b.entity.onCollisionStay(a.entity);
            }
        };
        /**
         * 圆与圆
         */
        CollisionContact2D.prototype.$c2c = function (a, b) {
            return CollisionResolution2D.circle2Circle(a, b);
        };
        /**
         * 矩型与圆
         */
        CollisionContact2D.prototype.$c2r = function (c, r) {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.circle2Polygon(new Vector2D(c.x, c.y), c.radius, r.vertexs);
            }
            return CollisionResolution2D.circle2Polygin(c, r);
        };
        /**
         * 多边型与圆
         */
        CollisionContact2D.prototype.$c2p = function (c, p) {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.circle2Polygon(new Vector2D(c.x, c.y), c.radius, p.vertexs);
            }
            return CollisionResolution2D.circle2Polygin(c, p);
        };
        /**
         * 矩型与矩型
         */
        CollisionContact2D.prototype.$r2r = function () {
            // 直接返回边框的碰撞结果
            return CollisionResolution2D.bounds2Bounds(this.$a.bounds, this.$b.bounds);
        };
        /**
         * 矩型与多边型
         */
        CollisionContact2D.prototype.$r2p = function (r, p) {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.polygon2Polygon(r.vertexs, p.vertexs);
            }
            return CollisionResolution2D.polygon2Vertexs(p, r.vertexs);
        };
        /**
         * 多边形与多边形
         */
        CollisionContact2D.prototype.$p2p = function (p1, p2) {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.polygon2Polygon(p1.vertexs, p2.vertexs);
            }
            return CollisionResolution2D.polygon2Vertexs(p1, p2.vertexs) && CollisionResolution2D.polygon2Vertexs(p2, p1.vertexs);
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
    /**
     * 多边型碰撞区域（效率最低）
     */
    var CollisionPolygon2D = /** @class */ (function (_super) {
        __extends(CollisionPolygon2D, _super);
        /**
         * 仅适用于多边型碰撞体
         */
        function CollisionPolygon2D(collider) {
            var _this = _super.call(this, CollisionShapEnum2D.POLYGON) || this;
            /**
             * 顶点数据
             */
            _this.vertexs = [];
            /**
             * 线段数据
             */
            _this.segments = [];
            for (var i = 0; i < collider.vertexs.length; i++) {
                var vertex = collider.vertexs[i];
                // 复制所有顶点信息作为碰撞数据
                _this.vertexs.push(new Vector2D(collider.x + vertex.x, collider.y + vertex.y));
                // 初始化线段数据
                _this.segments.push(new Vector2D(0, 0));
            }
            return _this;
        }
        /**
         * 更新顶点数据
         */
        CollisionPolygon2D.prototype.updateVertexs = function (x, y, vertexs) {
            for (var i = 0; i < vertexs.length; i++) {
                this.vertexs[i].x = x + vertexs[i].x;
                this.vertexs[i].y = y + vertexs[i].y;
            }
        };
        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        CollisionPolygon2D.prototype.prepareSegments = function () {
            for (var i = 0; i < this.vertexs.length; i++) {
                var a = this.vertexs[i];
                var b = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                this.segments[i].assign(a.x - b.x, a.y - b.y);
            }
        };
        return CollisionPolygon2D;
    }(Collision2D));
    world2d.CollisionPolygon2D = CollisionPolygon2D;
    /**
     * 矩型碰撞区域（效率中等）
     */
    var CollisionRectangle2D = /** @class */ (function (_super) {
        __extends(CollisionRectangle2D, _super);
        function CollisionRectangle2D() {
            var _this = _super.call(this, CollisionShapEnum2D.RECTANGLE) || this;
            /**
             * 项点数据，当矩型与圆和多边型发生碰撞时，需要使用顶点数据
             */
            _this.vertexs = [];
            /**
             * 线段数据
             */
            _this.segments = [];
            // 初始化顶点数据
            for (var i = 0; i < 4; i++) {
                _this.vertexs.push(new Vector2D(0, 0));
                _this.segments.push(new Vector2D(0, 0));
            }
            return _this;
        }
        /**
         * 更新矩型区域
         */
        CollisionRectangle2D.prototype.updateBounds = function (left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        };
        /**
         * 准备顶点数据（为矩型计算顶点信息）
         */
        CollisionRectangle2D.prototype.prepareVertexs = function () {
            this.vertexs[0].assign(this.left, this.bottom);
            this.vertexs[1].assign(this.right, this.bottom);
            this.vertexs[2].assign(this.right, this.top);
            this.vertexs[3].assign(this.left, this.top);
        };
        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        CollisionRectangle2D.prototype.prepareSegments = function () {
            for (var i = 0; i < this.vertexs.length; i++) {
                var a = this.vertexs[i];
                var b = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                this.segments[i].assign(a.x - b.x, a.y - b.y);
            }
        };
        return CollisionRectangle2D;
    }(Collision2D));
    world2d.CollisionRectangle2D = CollisionRectangle2D;
    /**
     * 2D碰撞检测
     */
    var CollisionResolution2D = /** @class */ (function () {
        function CollisionResolution2D() {
        }
        /**
         * 包围盒与包围盒
         */
        CollisionResolution2D.bounds2Bounds = function (a, b) {
            if (a.left > b.right || b.left > a.right || a.top > b.bottom || b.top > a.bottom) {
                return false;
            }
            return true;
        };
        /**
         * 圆与圆
         */
        CollisionResolution2D.circle2Circle = function (a, b) {
            // 坐标差
            var dx = b.x - a.x;
            var dy = b.y - a.y;
            // 两圆半径和
            var dr = a.radius + b.radius;
            // 若两圆距离大于半径和，则未碰撞
            if (dx * dx + dy * dy > dr * dr) {
                return false;
            }
            return true;
        };
        /**
         * 检测圆与多边形是否相交
         */
        CollisionResolution2D.circle2Polygin = function (c, polygon) {
            // 多边形顶点数据
            var vertexs = polygon.vertexs;
            // 半径平方
            var radiusSquared = c.radius * c.radius;
            // 与圆最近的顶点
            var nearestVertex = null;
            // 最小距离
            var nearestDistanceSquared = Number.MAX_VALUE;
            // 最小距离是否小于或等于半径
            var distanceLessOrEqualThanRadius = false;
            // 计算与圆最近的顶点
            for (var i = 0; i < vertexs.length; i++) {
                var vertex = vertexs[i];
                var distance = vertex.distanceToSquared(c);
                // 若最小距离的平方小于或等于半径平方，则返回
                if (distance <= radiusSquared) {
                    distanceLessOrEqualThanRadius = true;
                    break;
                }
                if (distance < nearestDistanceSquared) {
                    nearestVertex = vertex;
                    nearestDistanceSquared = distance;
                }
            }
            // 若顶点与圆心的距离小于半径，则碰撞
            if (distanceLessOrEqualThanRadius === true) {
                return true;
            }
            // 以圆心到距离最近的顶点组成的线段的法向量为投影线，计算投影是否重合
            var a = new Vector2D(c.x, c.y);
            var b = nearestVertex.copy();
            var ab = new Vector2D(b.x - a.x, b.y - a.y);
            var normal = ab.normal();
            // DrawAPI2D.drawNormal(normal, "#FFFFFF");
            // 获取参与判断的圆上的点
            var p = ab.copy().normalize().mul(c.radius).add(a);
            // DrawAPI2D.drawLine(a, p, "#FF0000");
            // 若p与多边形顶点的顶影不重合，则不相交
            if (CollisionResolution2D.$vertex2VertexInDirection([p], vertexs, normal) === false) {
                return false;
            }
            var array = [a, b];
            var segments = polygon.segments;
            // 检测圆与多边形顶点在多边形每条边的方向上的投影是否重合
            for (var i = 0; i < segments.length; i++) {
                var segment = segments[i];
                if (segment.length() === 0) {
                    continue;
                }
                // 获取这条边的法向量，并且以半径的倍数放大
                normal.assign(segment.y, -segment.x).normalize().mul(c.radius);
                // 根据法向量获取圆上的两个点
                a.assign(c.x, c.y).add(normal);
                b.assign(c.x, c.y).sub(normal);
                // DrawAPI2D.drawLine(c, a, "#FF0000");
                // DrawAPI2D.drawLine(c, b, "#FF0000");
                // 判断多边型顶点与圆顶点的投影是否相交
                if (CollisionResolution2D.$vertex2VertexInDirection(array, vertexs, segment) === false) {
                    return false;
                }
            }
            return true;
        };
        /**
         * 判断两组顶点在指定方向上产生的投影是否重叠
         */
        CollisionResolution2D.$vertex2VertexInDirection = function (array, array2, direction) {
            /**
             * y=kx+b => k=y/x; b=y-kx;
             * x=my+n => m=x/y; n=x-my;
             * 若k大于-1且小于1，则取b值作比较
             * 否则取n值作比较
             */
            var k = direction.y / direction.x;
            var m = direction.x / direction.y;
            var min1 = Number.MAX_VALUE;
            var max1 = -Number.MAX_VALUE;
            var min2 = Number.MAX_VALUE;
            var max2 = -Number.MAX_VALUE;
            var x = 0, y = 0;
            var collide = false;
            if (k < -1 || k > 1) {
                while (x < array.length || y < array2.length) {
                    if (x < array.length) {
                        var p = array[x];
                        var b = p.x - m * p.y;
                        // DrawAPI2D.drawLine(p, new Vector2D(b, 0), "#FF0000");
                        if (min1 > b) {
                            min1 = b;
                        }
                        if (max1 < b) {
                            max1 = b;
                        }
                        x++;
                    }
                    if (y < array2.length) {
                        var p = array2[y];
                        var b = p.x - m * p.y;
                        // DrawAPI2D.drawLine(p, new Vector2D(b, 0), "#FF0000");
                        if (min2 > b) {
                            min2 = b;
                        }
                        if (max2 < b) {
                            max2 = b;
                        }
                        y++;
                    }
                    // 若（max1 < min2 || min1 > max2）成立，则投影未相交，若己相交，则产生碰撞
                    if ((max1 < min2 || min1 > max2) === false) {
                        collide = true;
                        break;
                    }
                }
            }
            else {
                while (x < array.length || y < array2.length) {
                    if (x < array.length) {
                        var p = array[x];
                        var b = p.y - k * p.x;
                        // DrawAPI2D.drawLine(p, new Vector2D(0, b), "#FF0000");
                        if (min1 > b) {
                            min1 = b;
                        }
                        if (max1 < b) {
                            max1 = b;
                        }
                        x++;
                    }
                    if (y < array2.length) {
                        var p = array2[y];
                        var b = p.y - k * p.x;
                        // DrawAPI2D.drawLine(p, new Vector2D(0, b), "#FF0000");
                        if (min2 > b) {
                            min2 = b;
                        }
                        if (max2 < b) {
                            max2 = b;
                        }
                        y++;
                    }
                    // 若（max1 < min2 || min1 > max2）成立，则投影未相交，若己相交，则产生碰撞
                    if ((max1 < min2 || min1 > max2) === false) {
                        collide = true;
                        break;
                    }
                }
            }
            return collide;
        };
        /**
         * 判断一组顶点与多边型顶点在多边型每条边的法线上的投影是否全部重合
         * @polygon: 多边形
         * @vertexs: 顶点数据
         */
        CollisionResolution2D.polygon2Vertexs = function (polygon, vertexs) {
            var array = polygon.vertexs;
            var segments = polygon.segments;
            for (var i = 0; i < segments.length; i++) {
                var segment = segments[i];
                if (segment.length() === 0) {
                    continue;
                }
                // 若未碰撞，则直接返回
                if (CollisionResolution2D.$vertex2VertexInDirection(array, vertexs, segments[i]) === false) {
                    return false;
                }
            }
            // 默认返回己碰撞
            return true;
        };
        /**
         * 判断两直线是否相交
         * @a,b: 需要参与判断的两条线段
         * @a1,a2: 线段a的两个点
         * @b1,b2: 线段b的两个点
         */
        CollisionResolution2D.line2Line = function (a, a1, a2, b, b1, b2) {
            return CollisionResolution2D.isLineBetweenPoints(a1, a, b1, b2) && CollisionResolution2D.isLineBetweenPoints(b1, b, a1, a2);
        };
        /**
         * 判断点p1和p2是否在线段ab两侧
         * @a: 线段ab上的一个点
         * @ab: 线段的方向向量
         * @p1,p2: 需要判断的两个点
         * 思路：将点a,p1,p2沿ab方线投射到x或y轴，若点a的投影在ab中间，则返回true，否则返回false
         */
        CollisionResolution2D.isLineBetweenPoints = function (a, ab, p1, p2) {
            // 若向量ab的x为0，则说明ab垂直于x轴，此时点的投影线必定与y轴平行，故可直接比较三个点的x值
            if (ab.x === 0) {
                // DrawAPI2D.drawLine(new Vector2D(a.x, 0), a, cc.Color.YELLOW);
                // DrawAPI2D.drawLine(new Vector2D(p1.x, 0), p1, cc.Color.YELLOW);
                // DrawAPI2D.drawLine(new Vector2D(p2.x, 0), p2, cc.Color.YELLOW);
                return CollisionResolution2D.isXbetweenAandB(a.x, p1.x, p2.x);
            }
            // 若向量ab的y为0，则说明ab垂直于y轴，此时点的投影线必定与x轴平行，故可直接比较三个点的y值
            else if (ab.y === 0) {
                // DrawAPI2D.drawLine(new Vector2D(0, a.y), a, cc.Color.YELLOW);
                // DrawAPI2D.drawLine(new Vector2D(0, p1.y), p1, cc.Color.YELLOW);
                // DrawAPI2D.drawLine(new Vector2D(0, p2.y), p2, cc.Color.YELLOW);
                return CollisionResolution2D.isXbetweenAandB(a.y, p1.y, p2.y);
            }
            else {
                var k = ab.y / ab.x;
                // 若k>-1且小于1，则应当将点投影到y轴上，此时可直接比较投影线在y轴上的截距, y=kx+b=>b=y-kx;
                if (k > -1 && k < 1) {
                    var b = a.y - k * a.x;
                    var p1b = p1.y - k * p1.x;
                    var p2b = p2.y - k * p2.x;
                    // DrawAPI2D.drawLine(new Vector2D(0, b), a, cc.Color.YELLOW);
                    // DrawAPI2D.drawLine(new Vector2D(0, p1b), p1, cc.Color.YELLOW);
                    // DrawAPI2D.drawLine(new Vector2D(0, p2b), p2, cc.Color.YELLOW);
                    return CollisionResolution2D.isXbetweenAandB(b, p1b, p2b);
                }
                // 否则应当将点投影到x轴上，此时可直接比较投影线在x轴上的截距, x=my+n=>n=x-my;
                else {
                    var m = ab.x / ab.y;
                    var n = a.x - m * a.y;
                    var p1n = p1.x - m * p1.y;
                    var p2n = p2.x - m * p2.y;
                    // DrawAPI2D.drawLine(new Vector2D(n, 0), a, cc.Color.YELLOW);
                    // DrawAPI2D.drawLine(new Vector2D(p1n, 0), p1, cc.Color.YELLOW);
                    // DrawAPI2D.drawLine(new Vector2D(p2n, 0), p2, cc.Color.YELLOW);
                    return CollisionResolution2D.isXbetweenAandB(n, p1n, p2n);
                }
            }
        };
        /**
         * 判断a与b是否在x两侧
         */
        CollisionResolution2D.isXbetweenAandB = function (x, a, b) {
            if (a > b) {
                var t = a;
                a = b;
                b = t;
            }
            if (a <= x && x <= b) {
                return true;
            }
            return false;
        };
        return CollisionResolution2D;
    }());
    world2d.CollisionResolution2D = CollisionResolution2D;
    /**
     * Box2D的碰撞检测算法
     */
    var CollisionResolutionBox2D = /** @class */ (function () {
        function CollisionResolutionBox2D() {
        }
        CollisionResolutionBox2D.testBounds = function (a, b) {
            if (a.left > b.right || a.right < b.left || a.top < b.bottom || a.bottom > b.top) {
                return false;
            }
            return true;
        };
        CollisionResolutionBox2D.circle2Polygon = function (p, radius, polygon) {
            var position = p;
            if (CollisionResolutionBox2D.pointInPolygon(position, polygon)) {
                return true;
            }
            for (var i = 0, l = polygon.length; i < l; i++) {
                var start = i === 0 ? polygon[polygon.length - 1] : polygon[i - 1];
                var end = polygon[i];
                if (CollisionResolutionBox2D.pointLineDistance(position, start, end, true) < radius) {
                    return true;
                }
            }
            return false;
        };
        CollisionResolutionBox2D.polygon2Polygon = function (a, b) {
            var i, l;
            // check if a intersects b
            for (i = 0, l = a.length; i < l; ++i) {
                var a1 = a[i];
                var a2 = a[(i + 1) % l];
                if (CollisionResolutionBox2D.line2Polygon(a1, a2, b))
                    return true;
            }
            // check if a contains b
            for (i = 0, l = b.length; i < l; ++i) {
                if (CollisionResolutionBox2D.pointInPolygon(b[i], a))
                    return true;
            }
            // check if b contains a
            for (i = 0, l = a.length; i < l; ++i) {
                if (CollisionResolutionBox2D.pointInPolygon(a[i], b))
                    return true;
            }
            return false;
        };
        CollisionResolutionBox2D.pointInPolygon = function (point, polygon) {
            var inside = false;
            var x = point.x;
            var y = point.y;
            // use some raycasting to test hits
            // https://github.com/substack/point-in-polygon/blob/master/index.js
            var length = polygon.length;
            for (var i = 0, j = length - 1; i < length; j = i++) {
                var xi = polygon[i].x, yi = polygon[i].y, xj = polygon[j].x, yj = polygon[j].y, intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect)
                    inside = !inside;
            }
            return inside;
        };
        CollisionResolutionBox2D.pointLineDistance = function (point, start, end, isSegment) {
            var dx = end.x - start.x;
            var dy = end.y - start.y;
            var d = dx * dx + dy * dy;
            var t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / d;
            var p;
            if (!isSegment) {
                p = new Vector2D(start.x + t * dx, start.y + t * dy);
            }
            else {
                if (d) {
                    if (t < 0)
                        p = start;
                    else if (t > 1)
                        p = end;
                    else
                        p = new Vector2D(start.x + t * dx, start.y + t * dy);
                }
                else {
                    p = start;
                }
            }
            dx = point.x - p.x;
            dy = point.y - p.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        CollisionResolutionBox2D.line2Polygon = function (a1, a2, b) {
            var length = b.length;
            for (var i = 0; i < length; ++i) {
                var b1 = b[i];
                var b2 = b[(i + 1) % length];
                if (CollisionResolutionBox2D.line2Line(a1, a2, b1, b2))
                    return true;
            }
            return false;
        };
        CollisionResolutionBox2D.line2Line = function (a1, a2, b1, b2) {
            var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
            if (u_b !== 0) {
                var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
                var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
                var ua = ua_t / u_b;
                var ub = ub_t / u_b;
                if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
                    return true;
                }
            }
            return false;
        };
        return CollisionResolutionBox2D;
    }());
    world2d.CollisionResolutionBox2D = CollisionResolutionBox2D;
    var DrawAPI2D = /** @class */ (function () {
        function DrawAPI2D() {
        }
        DrawAPI2D.clear = function () {
            DrawAPI2D.graphics.clear();
        };
        DrawAPI2D.draw = function (transforms) {
            // 绘制坐标系
            DrawAPI2D.graphics.drawLine(Global.WIDTH * 0.5, 0, Global.WIDTH * 0.5, Global.WIDTH, "#FF0000");
            DrawAPI2D.graphics.drawLine(0, Global.HEIGHT * 0.5, Global.WIDTH, Global.HEIGHT * 0.5, "#FF0000");
            // 绘制所有包围盒
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                var bounds = transform.bounds;
                DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, "#FF0000");
            }
            // 绘制所有对撞机
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                if (transform.collider.shap === ColliderShapEnum2D.CIRCLE) {
                    var collider = transform.collider;
                    DrawAPI2D.drawCircle(collider.x, collider.y, collider.radius, "#FF0000");
                }
                else if (transform.collider.shap === ColliderShapEnum2D.POLYGON) {
                    var collider = transform.collider;
                    DrawAPI2D.drawPolygon(collider.x, collider.y, collider.vertexs, "#FF0000");
                }
            }
            // 绘制所有碰撞区域
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                var lineColor = transform.hitNum == 0 ? "#0000FF" : "#00FF00";
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    var collision = transform.collision;
                    DrawAPI2D.drawCircle(collision.x, collision.y, collision.radius, lineColor);
                }
                else if (transform.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    var collision = transform.collision;
                    DrawAPI2D.drawRect(collision.left, collision.top, collision.right - collision.left, collision.bottom - collision.top, lineColor);
                }
                else {
                    var collision = transform.collision;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, lineColor);
                }
            }
        };
        DrawAPI2D.drawLine = function (a, b, lineColor) {
            DrawAPI2D.graphics.drawLine(a.x, a.y, b.x, b.y, lineColor);
        };
        DrawAPI2D.drawNormal = function (a, lineColor) {
            var normal = a.copy().normalize().mul(1000);
            DrawAPI2D.graphics.drawLine(a.x, a.y, -a.x, -a.y, lineColor);
        };
        DrawAPI2D.drawRect = function (x, y, width, height, lineColor) {
            DrawAPI2D.graphics.drawRect(x, y, width, height, void 0, lineColor);
        };
        DrawAPI2D.drawCircle = function (x, y, radius, lineColor) {
            DrawAPI2D.graphics.drawCircle(x, y, radius, void 0, lineColor);
        };
        DrawAPI2D.drawPolygon = function (x, y, vertexs, lineColor) {
            for (var i = 0; i < vertexs.length; i++) {
                var a = vertexs[i];
                var b = i == 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                DrawAPI2D.graphics.drawLine(a.x + x, a.y + y, b.x + x, b.y + y, lineColor);
            }
        };
        return DrawAPI2D;
    }());
    world2d.DrawAPI2D = DrawAPI2D;
    var Helper2D = /** @class */ (function () {
        function Helper2D() {
        }
        /**
         * 角度换算为弧度
         */
        Helper2D.d2a = function (d) {
            return d * Math.PI / 180;
        };
        /**
         * 弧度换算为角度
         */
        Helper2D.a2d = function (a) {
            return a * 180 / Math.PI;
        };
        /**
         * 获取较小值
         */
        Helper2D.min = function (a, b) {
            return a < b ? a : b;
        };
        /**
         * 获取较大值
         */
        Helper2D.max = function (a, b) {
            return a > b ? a : b;
        };
        /**
         * 获取绝对值
         */
        Helper2D.abs = function (a) {
            if (a < 0) {
                return -a;
            }
            return a;
        };
        /**
         * PI
         */
        Helper2D.PI = Math.PI;
        /**
         * 2PI
         */
        Helper2D.PI2 = Math.PI * 2;
        return Helper2D;
    }());
    world2d.Helper2D = Helper2D;
    /**
     * 物理类
     */
    var Physics = /** @class */ (function () {
        function Physics() {
        }
        /**
         * 返回所有与指定点碰撞的图形
         */
        Physics.testPoint = function (p) {
            var transforms = World2D.inst.transforms.slice(0);
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    var collision = transform.collision;
                    if (p.distanceTo(collision) <= collision.radius) {
                        return transform;
                    }
                }
                else if (transform.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    var collision = transform.collision;
                    if (p.x >= collision.left && p.x <= collision.right && p.y >= collision.top && p.y <= collision.bottom) {
                        return transform;
                    }
                }
                else {
                    var collision = transform.collision;
                    var vertexs = collision.vertexs;
                    var angle = 0;
                    for (var i_1 = 0; i_1 < vertexs.length; i_1++) {
                        var a = vertexs[i_1];
                        var b = i_1 === 0 ? vertexs[vertexs.length - 1] : vertexs[i_1 - 1];
                        if (a.x === b.x && a.y === b.y) {
                            continue;
                        }
                        angle += Vector2D.angle(Vector2D.sub(a, p), Vector2D.sub(b, p));
                    }
                    if (Helper2D.abs(Helper2D.a2d(angle) - 360) < 0.1) {
                        return transform;
                    }
                }
            }
            return null;
        };
        /**
         * 射线检测
         */
        Physics.raycast = function (origin, direction, maxDistance, layers) {
            // 射线目标位置
            var destination = direction.copy().normalize().mul(maxDistance).add(origin);
            DrawAPI2D.drawLine(origin, destination, "#FF0000");
            // 线射碰撞盒
            var bounds = new Bounds();
            bounds.updateBounds(Helper2D.min(origin.x, destination.x), Helper2D.max(origin.x, destination.x), Helper2D.max(origin.y, destination.y), Helper2D.max(origin.y, destination.y));
            var transforms = World2D.inst.transforms;
            // 参与检测的对象列表
            var array = (layers & CollisionLayerEnum.ALL) ? null : [];
            // 默认检测所有对象
            if (array === null) {
                array = transforms.concat();
            }
            // 获取与射线包围盒发生碰撞的对象
            else {
                for (var i = 0; i < transforms.length; i++) {
                    var transform = transforms[i];
                    // 不在指定的层级之中
                    if ((transform.layer & layers) === 0) {
                        continue;
                    }
                    // 未与射线的包围盒发生碰撞
                    if (CollisionResolution2D.bounds2Bounds(bounds, transform.bounds) === false) {
                        continue;
                    }
                    array.push(transform);
                }
            }
        };
        return Physics;
    }());
    world2d.Physics = Physics;
    /**
     * 刚体
     */
    var Rigidbody2D = /** @class */ (function () {
        function Rigidbody2D() {
            /**
             * 当前速率，此为临时变量
             */
            this.$velocity = new Vector2D(0, 0);
            /**
             * 扭矩（最大转向弧度）
             */
            this.$torque = 180;
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
                var min = rotation - Helper2D.PI;
                var max = rotation + Helper2D.PI;
                // 当前速率角度（弧度）
                var angle = this.velocity.angle();
                // 修正速率方向
                if (angle < min) {
                    angle += Helper2D.PI2;
                }
                else if (angle > max) {
                    angle -= Helper2D.PI2;
                }
                // 若面向差大于扭矩，则进行偏移
                var abs = Helper2D.abs(angle - rotation);
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
                if (abs !== 0) {
                    this.$velocity.rotate(rotation - angle);
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
                return Helper2D.a2d(this.$torque);
            },
            set: function (value) {
                this.$torque = Helper2D.d2a(value);
            },
            enumerable: true,
            configurable: true
        });
        return Rigidbody2D;
    }());
    world2d.Rigidbody2D = Rigidbody2D;
    /**
     * 线段
     */
    var Segment2D = /** @class */ (function () {
        function Segment2D() {
            /**
             * 线段起点
             */
            this.a = new Vector2D(0, 0);
            /**
             * 线段终点
             */
            this.b = new Vector2D(0, 0);
            /**
             * 线段方向
             */
            this.ab = new Vector2D(0, 0);
        }
        return Segment2D;
    }());
    world2d.Segment2D = Segment2D;
    /**
     * 物理数据转化对象
     */
    var Transform2D = /** @class */ (function () {
        /**
         * @vertexs: 原始顶点数据
         */
        function Transform2D(entity, collider, rigidbody, collision) {
            /**
             * 实体对象
             */
            this.$entity = null;
            /**
             * 刚体
             */
            this.$rigidbody = null;
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
            // 实体对象
            this.$entity = entity;
            // 碰撞体
            this.$collider = collider;
            // 刚体对象
            this.$rigidbody = rigidbody;
            // 碰撞区域
            this.$collision = collision;
            // 为刚体指定实体对象
            if (rigidbody !== null) {
                rigidbody.transform = this;
            }
            // 创建包围盒
            this.$bounds = new Bounds();
            // 更新包围盒数据
            this.$updateBounds();
            // 更新碰撞区域
            if (collision !== null) {
                this.$updateCollision();
            }
        }
        /**
         * 2D世界通过调用此方法完成对象的数据转换与碰撞
         */
        Transform2D.prototype.transform = function (delta) {
            // 物理模拟计算
            if (this.$rigidbody !== null) {
                this.$rigidbody.update(delta);
            }
            // 若数据未发生变化，则直接返回
            if (this.$modified === false) {
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
            if (this.$collider.shap == ColliderShapEnum2D.POLYGON) {
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
            if (this.$collider.shap == ColliderShapEnum2D.POLYGON) {
                this.$modified = true;
            }
        };
        /**
         * 更新旋转角度（此方法将旋转角度限定在0到360之间）
         */
        Transform2D.prototype.$updateAngle = function (angle) {
            if (angle < 0) {
                angle %= Helper2D.PI2;
                angle += Helper2D.PI2;
            }
            else if (angle >= Helper2D.PI2) {
                angle %= Helper2D.PI2;
            }
            this.$angle = angle;
            this.$rotation = Helper2D.a2d(angle);
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
            this.rotateTo(Helper2D.d2a(rotation));
        };
        /**
         * 更新包围盒数据
         */
        Transform2D.prototype.$updateBounds = function () {
            var x = this.$collider.x;
            var y = this.$collider.y;
            // 更新碰撞边界
            if (this.$collider.shap === ColliderShapEnum2D.CIRCLE) {
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
            if (this.$collision.shap === CollisionShapEnum2D.CIRCLE) {
                var collider = this.$collider;
                var collision = this.$collision;
                collision.updateBounds(collider.x, collider.y, collider.radius);
            }
            // 矩形直接以包围盒数据作为更新
            else if (this.$collision.shap === CollisionShapEnum2D.RECTANGLE) {
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
        Object.defineProperty(Transform2D.prototype, "entity", {
            /**
             * 获取实体对象
             */
            get: function () {
                return this.$entity;
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
    /**
     * 向量
     */
    var Vector2D = /** @class */ (function () {
        function Vector2D(x, y) {
            this.x = x;
            this.y = y;
        }
        /**
         * 赋值
         */
        Vector2D.prototype.assign = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * 相加
         */
        Vector2D.prototype.add = function (vec2) {
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        };
        /**
         * 相减
         */
        Vector2D.prototype.sub = function (vec2) {
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        };
        /**
         * 相乘
         */
        Vector2D.prototype.mul = function (value) {
            this.x *= value;
            this.y *= value;
            return this;
        };
        /**
         * 点积
         */
        Vector2D.prototype.dot = function (a) {
            return this.x * a.x + this.y * a.y;
        };
        /**
         * 叉积
         */
        Vector2D.prototype.cross = function (a) {
            return this.x * a.y - this.y * a.x;
        };
        /**
         * 相反
         */
        Vector2D.prototype.negate = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        /**
         * 旋转（弘度）
         */
        Vector2D.prototype.rotate = function (angle) {
            var x = this.x;
            var y = this.y;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
            return this;
        };
        /**
         * 向量与x轴之间的弧度
         */
        Vector2D.prototype.angle = function () {
            var angle = Math.atan2(this.y, this.x);
            if (angle < 0) {
                return angle + 2 * Math.PI;
            }
            else {
                return angle;
            }
        };
        /**
         * 归零
         */
        Vector2D.prototype.zero = function () {
            this.x = this.y = 0;
            return this;
        };
        /**
         * 返回新的向量作为当前向量的法向量
         * NOTE：法向量与向量相交，且相互垂直，向量的法向量为(-y,x)或(y,-x)
         */
        Vector2D.prototype.normal = function () {
            return new Vector2D(this.y, -this.x);
        };
        /**
         * 归一
         */
        Vector2D.prototype.normalize = function () {
            var length = this.length();
            if (length < 1e-9) {
                return this;
            }
            this.x /= length;
            this.y /= length;
            return this;
        };
        /**
         * 长度
         */
        Vector2D.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        /**
         * 长度平方
         */
        Vector2D.prototype.lengthSquared = function () {
            return this.x * this.x + this.y * this.y;
        };
        /**
         * 计算到指定位置的距离
         */
        Vector2D.prototype.distanceTo = function (p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        /**
         * 计算到指定位置的距离平方
         */
        Vector2D.prototype.distanceToSquared = function (p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            return dx * dx + dy * dy;
        };
        /**
         * 拷贝
         */
        Vector2D.prototype.copy = function () {
            return new Vector2D(this.x, this.y);
        };
        /**
         * 输出向量值
         */
        Vector2D.prototype.toString = function () {
            return "{" + this.x + "," + this.y + "}";
        };
        /**
         * 两向量相加
         */
        Vector2D.add = function (a, b) {
            return new Vector2D(a.x + b.x, a.y + b.y);
        };
        /**
         * 两向量相减
         */
        Vector2D.sub = function (a, b) {
            return new Vector2D(b.x - a.x, b.y - a.y);
        };
        /**
         * 法向量
         */
        Vector2D.normal = function (a, b) {
            return new Vector2D(b.y - a.y, a.x - b.x);
        };
        /**
         * 计算两个向量之间的夹角
         */
        Vector2D.angle = function (a, b) {
            var m = a.length();
            var n = b.length();
            if (m <= 1e-9 || n < 1e-9) {
                return 0;
            }
            return Math.acos(a.dot(b) / (m * n));
        };
        return Vector2D;
    }());
    world2d.Vector2D = Vector2D;
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
            DrawAPI2D.graphics = graphics;
            // 默认层级中的所有元素都会相互碰撞
            this.addDetector(CollisionLayerEnum.DEFAULT, CollisionLayerEnum.DEFAULT);
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
            World2D.DEBUG == true && DrawAPI2D.draw(this.$transforms);
        };
        /**
         * 添加对象
         */
        World2D.prototype.addTransform = function (transform, layer) {
            if (layer === void 0) { layer = CollisionLayerEnum.DEFAULT; }
            transform.layer = layer;
            for (var i = 0; i < this.$transforms.length; i++) {
                var transform2 = this.$transforms[i];
                if (this.$shouldCollide(transform.layer, transform2.layer) === true) {
                    var contact = new CollisionContact2D(transform, transform2);
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
                        contact.doCollide(CollisionType.COLLISION_EXIT);
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
        World2D.DEBUG = true;
        return World2D;
    }());
    world2d.World2D = World2D;
})(world2d = exports.world2d || (exports.world2d = {}));
//# sourceMappingURL=world2d.js.map