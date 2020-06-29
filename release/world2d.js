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
    var ColliderShapEnum2D;
    (function (ColliderShapEnum2D) {
        ColliderShapEnum2D[ColliderShapEnum2D["CIRCLE"] = 0] = "CIRCLE";
        ColliderShapEnum2D[ColliderShapEnum2D["POLYGON"] = 1] = "POLYGON";
    })(ColliderShapEnum2D = world2d.ColliderShapEnum2D || (world2d.ColliderShapEnum2D = {}));
    var CollisionLayerEnum;
    (function (CollisionLayerEnum) {
        CollisionLayerEnum[CollisionLayerEnum["DEFAULT"] = 1] = "DEFAULT";
        CollisionLayerEnum[CollisionLayerEnum["FISH"] = 2] = "FISH";
        CollisionLayerEnum[CollisionLayerEnum["BULLET"] = 4] = "BULLET";
        CollisionLayerEnum[CollisionLayerEnum["POLYGON"] = 8] = "POLYGON";
        CollisionLayerEnum[CollisionLayerEnum["CIRCLE"] = 16] = "CIRCLE";
        CollisionLayerEnum[CollisionLayerEnum["RECTANLE"] = 32] = "RECTANLE";
        CollisionLayerEnum[CollisionLayerEnum["FISH_2"] = 64] = "FISH_2";
        CollisionLayerEnum[CollisionLayerEnum["BULLET_2"] = 128] = "BULLET_2";
    })(CollisionLayerEnum = world2d.CollisionLayerEnum || (world2d.CollisionLayerEnum = {}));
    var CollisionShapEnum2D;
    (function (CollisionShapEnum2D) {
        CollisionShapEnum2D[CollisionShapEnum2D["CIRCLE"] = 0] = "CIRCLE";
        CollisionShapEnum2D[CollisionShapEnum2D["POLYGON"] = 1] = "POLYGON";
        CollisionShapEnum2D[CollisionShapEnum2D["RECTANGLE"] = 2] = "RECTANGLE";
    })(CollisionShapEnum2D = world2d.CollisionShapEnum2D || (world2d.CollisionShapEnum2D = {}));
    var CollisionType;
    (function (CollisionType) {
        CollisionType[CollisionType["COLLISION_ENTER"] = 0] = "COLLISION_ENTER";
        CollisionType[CollisionType["COLLISION_STAY"] = 1] = "COLLISION_STAY";
        CollisionType[CollisionType["COLLISION_EXIT"] = 2] = "COLLISION_EXIT";
    })(CollisionType = world2d.CollisionType || (world2d.CollisionType = {}));
    var CrossTypeEnum;
    (function (CrossTypeEnum) {
        CrossTypeEnum[CrossTypeEnum["NONE"] = 0] = "NONE";
        CrossTypeEnum[CrossTypeEnum["CROSS"] = 1] = "CROSS";
        CrossTypeEnum[CrossTypeEnum["CROSS_2"] = 2] = "CROSS_2";
        CrossTypeEnum[CrossTypeEnum["OVERLAP"] = 3] = "OVERLAP";
    })(CrossTypeEnum = world2d.CrossTypeEnum || (world2d.CrossTypeEnum = {}));
    var RaycastTypeEnum;
    (function (RaycastTypeEnum) {
        RaycastTypeEnum[RaycastTypeEnum["ANY"] = 0] = "ANY";
        RaycastTypeEnum[RaycastTypeEnum["CLOSEST"] = 1] = "CLOSEST";
        RaycastTypeEnum[RaycastTypeEnum["ALL"] = 2] = "ALL";
        RaycastTypeEnum[RaycastTypeEnum["ALL_CLOSEST"] = 3] = "ALL_CLOSEST";
    })(RaycastTypeEnum = world2d.RaycastTypeEnum || (world2d.RaycastTypeEnum = {}));
    var Bounds = (function () {
        function Bounds() {
        }
        Bounds.prototype.updateBounds = function (left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        };
        return Bounds;
    }());
    world2d.Bounds = Bounds;
    var Collider2D = (function () {
        function Collider2D(shap) {
            this.$shap = shap;
        }
        Object.defineProperty(Collider2D.prototype, "shap", {
            get: function () {
                return this.$shap;
            },
            enumerable: true,
            configurable: true
        });
        return Collider2D;
    }());
    world2d.Collider2D = Collider2D;
    var ColliderCircle2D = (function (_super) {
        __extends(ColliderCircle2D, _super);
        function ColliderCircle2D(radius) {
            var _this = _super.call(this, ColliderShapEnum2D.CIRCLE) || this;
            _this.radius = radius;
            return _this;
        }
        ColliderCircle2D.prototype.clone = function () {
            return new ColliderCircle2D(this.radius);
        };
        return ColliderCircle2D;
    }(Collider2D));
    world2d.ColliderCircle2D = ColliderCircle2D;
    var ColliderPolygon2D = (function (_super) {
        __extends(ColliderPolygon2D, _super);
        function ColliderPolygon2D(vertexs) {
            var _this = _super.call(this, ColliderShapEnum2D.POLYGON) || this;
            _this.vertexs = vertexs;
            return _this;
        }
        ColliderPolygon2D.prototype.clone = function () {
            var vertexs = [];
            for (var i = 0; i < this.vertexs.length; i++) {
                vertexs.push(this.vertexs[i].copy());
            }
            return new ColliderPolygon2D(vertexs);
        };
        return ColliderPolygon2D;
    }(Collider2D));
    world2d.ColliderPolygon2D = ColliderPolygon2D;
    var Collision2D = (function () {
        function Collision2D(shap) {
            this.bounds = new Bounds();
            this.$shap = shap;
        }
        Object.defineProperty(Collision2D.prototype, "shap", {
            get: function () {
                return this.$shap;
            },
            enumerable: true,
            configurable: true
        });
        return Collision2D;
    }());
    world2d.Collision2D = Collision2D;
    var CollisionCircle2D = (function (_super) {
        __extends(CollisionCircle2D, _super);
        function CollisionCircle2D(radius) {
            var _this = _super.call(this, CollisionShapEnum2D.CIRCLE) || this;
            _this.radius = radius;
            return _this;
        }
        CollisionCircle2D.prototype.updateBounds = function () {
            this.bounds.updateBounds(this.x - this.radius, this.x + this.radius, this.y - this.radius, this.y + this.radius);
        };
        return CollisionCircle2D;
    }(Collision2D));
    world2d.CollisionCircle2D = CollisionCircle2D;
    var CollisionContact2D = (function () {
        function CollisionContact2D(a, b) {
            this.useBox2d = false;
            this.$testAABB = true;
            this.$touching = false;
            if (a.collision.shap === CollisionShapEnum2D.CIRCLE) {
                this.$a = a;
                this.$b = b;
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2c;
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
        CollisionContact2D.prototype.test = function () {
            var a = this.$a;
            var b = this.$b;
            if (a.enabled === false || b.enabled === false) {
                return;
            }
            var x, y;
            if (a.rigidbody !== null) {
                x = a;
                y = b;
            }
            else {
                x = b;
                y = a;
            }
            if (x.rigidbody.target !== null && x.rigidbody.target !== y) {
                return;
            }
            var collide = this.$testAABB === false ? true : CollisionResolution2D.bounds2Bounds(a.collision.bounds, b.collision.bounds);
            if (collide === true) {
                collide = this.$testFunc.call(this, a.collision, b.collision);
            }
            if (collide === true) {
                if (this.$touching === false) {
                    this.$touching = true;
                    this.doCollide(CollisionType.COLLISION_ENTER);
                }
                else {
                    this.doCollide(CollisionType.COLLISION_STAY);
                }
            }
            else if (this.$touching === true) {
                this.$touching = false;
                this.doCollide(CollisionType.COLLISION_EXIT);
            }
        };
        CollisionContact2D.prototype.doCollide = function (type) {
            var a = this.$a;
            var b = this.$b;
            if (type === CollisionType.COLLISION_ENTER) {
                a.hitNum++;
                b.hitNum++;
                a.entity.onCollisionEnter(b.entity);
                b.entity.onCollisionEnter(a.entity);
            }
            else if (type === CollisionType.COLLISION_EXIT) {
                a.hitNum--;
                b.hitNum--;
                a.entity.onCollisionExit(b.entity);
                b.entity.onCollisionExit(a.entity);
            }
            else {
                a.entity.onCollisionStay(b.entity);
                b.entity.onCollisionStay(a.entity);
            }
        };
        CollisionContact2D.prototype.$c2c = function (a, b) {
            return CollisionResolution2D.circle2Circle(a, b);
        };
        CollisionContact2D.prototype.$c2r = function (c, r) {
            return CollisionResolution2D.circle2Polygin(c, r);
        };
        CollisionContact2D.prototype.$c2p = function (a, b) {
            return CollisionResolution2D.circle2Polygin(a, b);
        };
        CollisionContact2D.prototype.$r2r = function () {
            return CollisionResolution2D.bounds2Bounds(this.$a.collision.bounds, this.$b.collision.bounds);
        };
        CollisionContact2D.prototype.$r2p = function (r, p) {
            return CollisionResolution2D.polygon2Vertexs(p, r.vertexs);
        };
        CollisionContact2D.prototype.$p2p = function (p1, p2) {
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
            get: function () {
                return this.$touching;
            },
            enumerable: true,
            configurable: true
        });
        return CollisionContact2D;
    }());
    world2d.CollisionContact2D = CollisionContact2D;
    var CollisionPolygon2D = (function (_super) {
        __extends(CollisionPolygon2D, _super);
        function CollisionPolygon2D(collider) {
            var _this = _super.call(this, CollisionShapEnum2D.POLYGON) || this;
            _this.$tempVertexs = null;
            _this.vertexs = [];
            _this.segments = [];
            for (var i = 0; i < collider.vertexs.length; i++) {
                var vertex = collider.vertexs[i];
                _this.vertexs.push(vertex.copy());
                _this.segments.push(new Segment2D());
            }
            return _this;
        }
        CollisionPolygon2D.prototype.updateBounds = function () {
            Helper2D.calculateBoundsForVertexs(this.vertexs, this.bounds);
        };
        CollisionPolygon2D.prototype.updateVertexs = function (vertexs) {
            this.$tempVertexs = vertexs;
        };
        CollisionPolygon2D.prototype.prepareVertexs = function () {
            for (var i = 0; i < this.$tempVertexs.length; i++) {
                var a = this.vertexs[i];
                var b = this.$tempVertexs[i];
                a.assign(b.x, b.y);
            }
            this.$tempVertexs = null;
        };
        CollisionPolygon2D.prototype.prepareSegments = function () {
            for (var i = 0; i < this.vertexs.length; i++) {
                var segment = this.segments[i];
                segment.a = this.vertexs[i];
                segment.b = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                var a = this.vertexs[i];
                var b = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                this.segments[i].assign(a, b);
            }
        };
        Object.defineProperty(CollisionPolygon2D.prototype, "modified", {
            get: function () {
                return this.$tempVertexs !== null;
            },
            enumerable: true,
            configurable: true
        });
        return CollisionPolygon2D;
    }(Collision2D));
    world2d.CollisionPolygon2D = CollisionPolygon2D;
    var CollisionRectangle2D = (function (_super) {
        __extends(CollisionRectangle2D, _super);
        function CollisionRectangle2D() {
            var _this = _super.call(this, CollisionShapEnum2D.RECTANGLE) || this;
            _this.vertexs = [];
            _this.segments = [];
            for (var i = 0; i < 4; i++) {
                _this.vertexs.push(new Vector2D(0, 0));
                _this.segments.push(new Segment2D());
            }
            return _this;
        }
        CollisionRectangle2D.prototype.updateBounds = function () {
            Helper2D.calculateBoundsForVertexs(this.vertexs, this.bounds);
        };
        CollisionRectangle2D.prototype.prepareVertexs = function () {
            this.vertexs[0].assign(this.bounds.left, this.bounds.bottom);
            this.vertexs[1].assign(this.bounds.right, this.bounds.bottom);
            this.vertexs[2].assign(this.bounds.right, this.bounds.top);
            this.vertexs[3].assign(this.bounds.left, this.bounds.top);
        };
        CollisionRectangle2D.prototype.prepareSegments = function () {
            for (var i = 0; i < this.vertexs.length; i++) {
                var segment = this.segments[i];
                var a = this.vertexs[i];
                var b = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                segment.assign(a, b);
            }
        };
        return CollisionRectangle2D;
    }(Collision2D));
    world2d.CollisionRectangle2D = CollisionRectangle2D;
    var Physics2D = (function () {
        function Physics2D() {
        }
        Physics2D.testPoint = function (p, layers) {
            if (layers === void 0) { layers = 0; }
            var transforms = World2D.inst.transforms.slice(0);
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                var collision = transform.collision;
                if (layers > 0 && (transform.layer & layers) === 0) {
                    continue;
                }
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    if (CollisionResolution2D.pointInCircle(p, collision)) {
                        return transform;
                    }
                }
                else if (transform.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    if (CollisionResolution2D.pointInRectangle(p, transform.collision.bounds)) {
                        return transform;
                    }
                }
                else {
                    if (CollisionResolution2D.pointInPolygon(p, transform.collision)) {
                        return transform;
                    }
                }
            }
            return null;
        };
        Physics2D.raycast = function (origin, direction, maxDistance, layers, type) {
            if (layers === void 0) { layers = 0; }
            if (type === void 0) { type = RaycastTypeEnum.CLOSEST; }
            var destination = direction.copy().normalize().mul(maxDistance).add(origin);
            world2d.World2D.DEBUG === true && DrawAPI2D.drawLine(origin, destination, "#FF0000");
            var segment = new Segment2D();
            segment.assign(origin, destination);
            var bounds = new Bounds();
            bounds.updateBounds(suncom.Mathf.min(origin.x, destination.x), suncom.Mathf.max(origin.x, destination.x), suncom.Mathf.min(origin.y, destination.y), suncom.Mathf.max(origin.y, destination.y));
            var transforms = World2D.inst.transforms;
            var out = null;
            var array = [];
            for (var i = 0; i < transforms.length; i++) {
                transforms[i].hitNum = 0;
            }
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                if (layers > 0 && (transform.layer & layers) === 0) {
                    continue;
                }
                if (CollisionResolution2D.bounds2Bounds(bounds, transform.collision.bounds) === false) {
                    continue;
                }
                if (out === null) {
                    out = {
                        type: CrossTypeEnum.NONE,
                        transform: null,
                        p1: new Vector2D(0, 0),
                        p2: new Vector2D(0, 0),
                        normal: null,
                        distance: 0
                    };
                }
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    CollisionResolution2D.line2Circle(segment, transform.collision, out);
                }
                else {
                    CollisionResolution2D.line2Polygon(segment, transform.collision, type, out);
                }
                if (out.type === CrossTypeEnum.NONE) {
                    continue;
                }
                out.transform = transform;
                transform.hitNum = 1;
                if (type === RaycastTypeEnum.CLOSEST) {
                    if (array.length === 1) {
                        array[0].transform.hitNum = 0;
                    }
                    array[0] = out;
                    bounds.updateBounds(suncom.Mathf.min(origin.x, out.p1.x), suncom.Mathf.max(origin.x, out.p1.x), suncom.Mathf.min(origin.y, out.p1.y), suncom.Mathf.max(origin.y, out.p1.y));
                }
                else {
                    array.push(out);
                }
                if (type === RaycastTypeEnum.ANY) {
                    break;
                }
                else if (type === RaycastTypeEnum.CLOSEST || type === RaycastTypeEnum.ALL_CLOSEST) {
                    out.distance = out.p1.distanceTo(origin);
                }
                out = null;
            }
            if (type === RaycastTypeEnum.ALL_CLOSEST && array.length > 1) {
                var newArray = [];
                while (array.length > 1) {
                    var res = array[0];
                    var index = 0;
                    for (var i = 1; i < array.length; i++) {
                        var item = array[i];
                        if (res === null || item.distance < res.distance) {
                            res = item;
                            index = i;
                        }
                    }
                    array.splice(index, 1);
                    newArray.push(res);
                }
                newArray.push(array[0]);
                array = newArray;
            }
            return array;
        };
        return Physics2D;
    }());
    world2d.Physics2D = Physics2D;
    var Rigidbody2D = (function () {
        function Rigidbody2D() {
            this.$torque = 180;
            this.target = null;
            this.moveSpeed = 0;
        }
        Rigidbody2D.prototype.update = function (delta) {
            if (this.moveSpeed === 0) {
                return;
            }
            if (this.target !== null && this.target.enabled === false) {
                this.target = null;
            }
            var p = suncom.Pool.getItemByClass("world2d.Vector2D", Vector2D, [0, 0]);
            if (this.target !== null) {
                p.assign(this.target.x - this.transform.x, this.target.y - this.transform.y);
                var rotate2 = p.angle();
                if (this.$torque === 180) {
                    this.transform.rotateTo(rotate2);
                }
                else {
                    var min = this.transform.rotation - suncom.Mathf.PI;
                    var max = this.transform.rotation + suncom.Mathf.PI;
                    if (rotate2 < min) {
                        rotate2 += suncom.Mathf.PI2;
                    }
                    else if (rotate2 > max) {
                        rotate2 -= suncom.Mathf.PI2;
                    }
                    var rotation = rotate2 - this.transform.rotation;
                    var torque = suncom.Mathf.clamp(this.$torque * delta * 10, 0, suncom.Mathf.PI);
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
            p.assign(this.moveSpeed, 0).rotate(this.transform.rotation);
            this.transform.moveBy(p.x * delta, p.y * delta);
            suncom.Pool.recover("world2d.Vector2D", p);
        };
        Object.defineProperty(Rigidbody2D.prototype, "torque", {
            get: function () {
                return suncom.Mathf.r2d(this.$torque);
            },
            set: function (value) {
                this.$torque = suncom.Mathf.d2r(value);
            },
            enumerable: true,
            configurable: true
        });
        return Rigidbody2D;
    }());
    world2d.Rigidbody2D = Rigidbody2D;
    var Segment2D = (function () {
        function Segment2D() {
            this.a = null;
            this.b = null;
            this.ab = new Vector2D(0, 0);
        }
        Segment2D.prototype.assign = function (a, b) {
            this.a = a;
            this.b = b;
            this.ab.assign(b.x - a.x, b.y - a.y);
            return this;
        };
        return Segment2D;
    }());
    world2d.Segment2D = Segment2D;
    var Transform2D = (function (_super) {
        __extends(Transform2D, _super);
        function Transform2D(entity, collider, rigidbody, collision) {
            var _this = _super.call(this) || this;
            _this.$x = 0;
            _this.$y = 0;
            _this.$scaleTo = 1;
            _this.$rotateTo = 0;
            _this.$rotation = 0;
            _this.$enabled = true;
            _this.$entity = null;
            _this.$rigidbody = null;
            _this.hitNum = 0;
            _this.$entity = entity;
            _this.$collider = collider;
            _this.$rigidbody = rigidbody;
            _this.$collision = collision;
            if (rigidbody !== null) {
                rigidbody.transform = _this;
            }
            return _this;
        }
        Transform2D.prototype.transform = function (delta) {
            if (this.$rigidbody !== null) {
                this.$rigidbody.update(delta);
            }
            var needUpdate = this.$needUpdate();
            var isModifiedByExtern = this.$isModifiedByExtern();
            if (needUpdate === false && isModifiedByExtern === false) {
                return;
            }
            this.$scale = this.$scaleTo;
            this.$radian = this.$rotateTo;
            this.$collision.x = this.$x;
            this.$collision.y = this.$y;
            if (isModifiedByExtern === false) {
                this.$applyScale();
                this.$applyRotate();
                this.$applyPosition();
            }
            else {
                var collision = this.$collision;
                collision.prepareVertexs();
            }
            this.$updateCollision();
        };
        Transform2D.prototype.moveBy = function (x, y) {
            this.$x += x;
            this.$y += y;
        };
        Transform2D.prototype.moveTo = function (x, y) {
            this.$x = x;
            this.$y = y;
        };
        Transform2D.prototype.scaleBy = function (value) {
            this.$scaleTo *= value;
        };
        Transform2D.prototype.scaleTo = function (value) {
            this.$scaleTo = value;
        };
        Transform2D.prototype.rotateBy = function (value) {
            this.$updateRadian(this.$rotateTo + value);
        };
        Transform2D.prototype.rotateTo = function (value) {
            this.$updateRadian(value);
        };
        Transform2D.prototype.$updateRadian = function (radian) {
            if (radian < 0) {
                radian %= suncom.Mathf.PI2;
                radian += suncom.Mathf.PI2;
            }
            else if (radian >= suncom.Mathf.PI2) {
                radian %= suncom.Mathf.PI2;
            }
            if (this.$rotateTo !== radian) {
                this.$rotateTo = radian;
                this.$rotation = suncom.Mathf.r2d(radian);
            }
        };
        Transform2D.prototype.$updateCollision = function () {
            this.$collision.updateBounds();
            if (this.$collision.shap === CollisionShapEnum2D.POLYGON) {
                var collision = this.$collision;
                collision.prepareSegments();
            }
            else if (this.$collision.shap === CollisionShapEnum2D.RECTANGLE) {
                var collision = this.$collision;
                collision.prepareVertexs();
                collision.prepareSegments();
            }
        };
        Transform2D.prototype.$applyPosition = function () {
            if (this.$collider.shap !== ColliderShapEnum2D.CIRCLE) {
                var collision = this.$collision;
                for (var i = 0; i < collision.vertexs.length; i++) {
                    var p = collision.vertexs[i];
                    p.x += this.$x;
                    p.y += this.$y;
                }
            }
        };
        Transform2D.prototype.$applyRotate = function () {
            if (this.$collider.shap === ColliderShapEnum2D.POLYGON) {
                var collision = this.$collision;
                for (var i = 0; i < collision.vertexs.length; i++) {
                    var p = collision.vertexs[i];
                    p.rotate(this.$radian);
                }
            }
        };
        Transform2D.prototype.$applyScale = function () {
            if (this.$collision.shap === CollisionShapEnum2D.CIRCLE) {
                var collider = this.$collider;
                var collision = this.$collision;
                collision.radius = collider.radius * this.$scale;
            }
            else {
                var collider = this.$collider;
                var collision = this.$collision;
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
            if (this.$collision.shap === CollisionShapEnum2D.POLYGON) {
                var collision = this.$collision;
                return collision.modified;
            }
            return false;
        };
        Transform2D.prototype.getRotation = function () {
            return this.$rotation;
        };
        Transform2D.prototype.setRotation = function (rotation) {
            this.rotateTo(suncom.Mathf.d2r(rotation));
        };
        Transform2D.prototype.disabled = function () {
            this.$enabled = false;
        };
        Object.defineProperty(Transform2D.prototype, "layer", {
            get: function () {
                return this.$layer;
            },
            set: function (value) {
                this.$layer = value;
                this.dispatchEvent(World2D.TRANSFORM_LAYER_CHANGED, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "x", {
            get: function () {
                return this.$x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "y", {
            get: function () {
                return this.$y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "scale", {
            get: function () {
                return this.$scaleTo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "rotation", {
            get: function () {
                return this.$rotateTo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "enabled", {
            get: function () {
                return this.$enabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "entity", {
            get: function () {
                return this.$entity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "collider", {
            get: function () {
                return this.$collider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "collision", {
            get: function () {
                return this.$collision;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform2D.prototype, "rigidbody", {
            get: function () {
                return this.$rigidbody;
            },
            enumerable: true,
            configurable: true
        });
        return Transform2D;
    }(suncom.EventSystem));
    world2d.Transform2D = Transform2D;
    var Vector2D = (function () {
        function Vector2D(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector2D.prototype.assign = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        Vector2D.prototype.add = function (vec2) {
            this.x += vec2.x;
            this.y += vec2.y;
            return this;
        };
        Vector2D.prototype.sub = function (vec2) {
            this.x -= vec2.x;
            this.y -= vec2.y;
            return this;
        };
        Vector2D.prototype.mul = function (value) {
            this.x *= value;
            this.y *= value;
            return this;
        };
        Vector2D.prototype.dot = function (a) {
            return this.x * a.x + this.y * a.y;
        };
        Vector2D.prototype.cross = function (a) {
            return this.x * a.y - this.y * a.x;
        };
        Vector2D.prototype.negate = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        Vector2D.prototype.rotate = function (radian) {
            var x = this.x;
            var y = this.y;
            var cos = Math.cos(radian);
            var sin = Math.sin(radian);
            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
            return this;
        };
        Vector2D.prototype.angle = function () {
            var radian = Math.atan2(this.y, this.x);
            if (radian < 0) {
                return radian + 2 * Math.PI;
            }
            else {
                return radian;
            }
        };
        Vector2D.prototype.zero = function () {
            this.x = this.y = 0;
            return this;
        };
        Vector2D.prototype.normal = function () {
            return new Vector2D(this.y, -this.x);
        };
        Vector2D.prototype.normalize = function () {
            var length = this.length();
            if (length < 1e-9) {
                return this;
            }
            this.x /= length;
            this.y /= length;
            return this;
        };
        Vector2D.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector2D.prototype.lengthSquared = function () {
            return this.x * this.x + this.y * this.y;
        };
        Vector2D.prototype.distanceTo = function (p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        Vector2D.prototype.distanceToSquared = function (p) {
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            return dx * dx + dy * dy;
        };
        Vector2D.prototype.copy = function () {
            return new Vector2D(this.x, this.y);
        };
        Vector2D.prototype.toString = function () {
            return "{" + this.x + "," + this.y + "}";
        };
        Vector2D.add = function (a, b) {
            return new Vector2D(a.x + b.x, a.y + b.y);
        };
        Vector2D.sub = function (a, b) {
            return new Vector2D(b.x - a.x, b.y - a.y);
        };
        Vector2D.normal = function (a, b) {
            return new Vector2D(b.y - a.y, a.x - b.x);
        };
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
    var World2D = (function () {
        function World2D(graphics) {
            this.$detectors = [];
            this.$contacts = [];
            this.$transforms = [];
            World2D.inst = this;
            DrawAPI2D.graphics = graphics;
            this.addDetector(CollisionLayerEnum.DEFAULT, CollisionLayerEnum.DEFAULT);
        }
        World2D.prototype.update = function (delta) {
            for (var i = 0; i < this.$transforms.length; i++) {
                this.$transforms[i].transform(delta);
            }
            for (var i = 0; i < this.$contacts.length; i++) {
                this.$contacts[i].test();
            }
            World2D.DEBUG === true && DrawAPI2D.draw(this.$transforms);
        };
        World2D.prototype.addTransform = function (transform, layer) {
            if (layer === void 0) { layer = CollisionLayerEnum.DEFAULT; }
            transform.layer = layer;
            transform.addEventListener(World2D.TRANSFORM_LAYER_CHANGED, this.$onTransformLayerChanged, this);
            for (var i = 0; i < this.$transforms.length; i++) {
                var transform2 = this.$transforms[i];
                if (this.$shouldCollide(transform.layer, transform2.layer) === true) {
                    var contact = new CollisionContact2D(transform, transform2);
                    this.$contacts.push(contact);
                }
            }
            this.$transforms.push(transform);
        };
        World2D.prototype.removeTransform = function (transform) {
            var index = this.$transforms.indexOf(transform);
            if (index < 0) {
                return;
            }
            transform.disabled();
            this.$transforms.splice(index, 1);
            transform.removeEventListener(World2D.TRANSFORM_LAYER_CHANGED, this.$onTransformLayerChanged, this);
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
        World2D.prototype.$onTransformLayerChanged = function (transform) {
            this.removeTransform(transform);
            this.addTransform(transform, transform.layer);
        };
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
            get: function () {
                return this.$transforms;
            },
            enumerable: true,
            configurable: true
        });
        World2D.DEBUG = false;
        World2D.TRANSFORM_LAYER_CHANGED = "world2d.TRANSFORM_LAYER_CHANGED";
        return World2D;
    }());
    world2d.World2D = World2D;
    var CollisionResolution2D;
    (function (CollisionResolution2D) {
        function pointInCircle(p, c) {
            return p.distanceToSquared(c) <= c.radius * c.radius;
        }
        CollisionResolution2D.pointInCircle = pointInCircle;
        function pointInRectangle(p, r) {
            return p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom;
        }
        CollisionResolution2D.pointInRectangle = pointInRectangle;
        function pointInPolygon(p, p2d) {
            var vertexs = p2d.vertexs;
            var radian = 0;
            for (var i = 0; i < vertexs.length; i++) {
                var a = vertexs[i];
                var b = i === 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                if (a.x === b.x && a.y === b.y) {
                    continue;
                }
                radian += Vector2D.angle(Vector2D.sub(a, p), Vector2D.sub(b, p));
            }
            return suncom.Mathf.abs(suncom.Mathf.r2d(radian) - 360) < 0.01;
        }
        CollisionResolution2D.pointInPolygon = pointInPolygon;
        function bounds2Bounds(a, b) {
            if (a.left > b.right || b.left > a.right || a.top > b.bottom || b.top > a.bottom) {
                return false;
            }
            return true;
        }
        CollisionResolution2D.bounds2Bounds = bounds2Bounds;
        function circle2Circle(a, b) {
            var dx = b.x - a.x;
            var dy = b.y - a.y;
            var dr = a.radius + b.radius;
            if (dx * dx + dy * dy > dr * dr) {
                return false;
            }
            return true;
        }
        CollisionResolution2D.circle2Circle = circle2Circle;
        function lineCrossCircle(line, circle, out) {
            var a2p = line.a.distanceToSquared(circle);
            var b2p = line.b.distanceToSquared(circle);
            var rxr = circle.radius * circle.radius;
            if (a2p <= rxr && b2p <= rxr) {
                out.p1.assign(line.a.x, line.a.y);
                out.type = CrossTypeEnum.CROSS;
            }
            else {
            }
            return false;
        }
        function circle2Polygin(c, d) {
            var vertexs = d.vertexs;
            var radiusSquared = c.radius * c.radius;
            var nearestVertex = null;
            var nearestDistanceSquared = suncom.Mathf.MAX_SAFE_INTEGER;
            var distanceLessOrEqualThanRadius = false;
            for (var i = 0; i < vertexs.length; i++) {
                var vertex = vertexs[i];
                var distance = vertex.distanceToSquared(c);
                if (distance <= radiusSquared) {
                    distanceLessOrEqualThanRadius = true;
                    break;
                }
                if (distance < nearestDistanceSquared) {
                    nearestVertex = vertex;
                    nearestDistanceSquared = distance;
                }
            }
            if (distanceLessOrEqualThanRadius === true) {
                return true;
            }
            var a = new Vector2D(c.x, c.y);
            var b = nearestVertex.copy();
            var ab = new Vector2D(b.x - a.x, b.y - a.y);
            var normal = ab.normal();
            var p = ab.copy().normalize().mul(c.radius).add(a);
            if (vertex2VertexInDirection([p], vertexs, normal) === false) {
                return false;
            }
            var array = [a, b];
            var segments = d.segments;
            for (var i = 0; i < segments.length; i++) {
                var segment = segments[i];
                if (segment.ab.length() === 0) {
                    continue;
                }
                normal.assign(segment.ab.y, -segment.ab.x).normalize().mul(c.radius);
                a.assign(c.x, c.y).add(normal);
                b.assign(c.x, c.y).sub(normal);
                if (vertex2VertexInDirection(array, vertexs, segment.ab) === false) {
                    return false;
                }
            }
            return true;
        }
        CollisionResolution2D.circle2Polygin = circle2Polygin;
        function vertex2VertexInDirection(array, array2, direction) {
            var k = direction.y / direction.x;
            var m = direction.x / direction.y;
            var min1 = suncom.Mathf.MAX_SAFE_INTEGER;
            var max1 = suncom.Mathf.MIN_SAFE_INTEGER;
            var min2 = suncom.Mathf.MAX_SAFE_INTEGER;
            var max2 = suncom.Mathf.MIN_SAFE_INTEGER;
            var x = 0, y = 0;
            var collide = false;
            if (k < -1 || k > 1) {
                while (x < array.length || y < array2.length) {
                    if (x < array.length) {
                        var p = array[x];
                        var b = p.x - m * p.y;
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
                        if (min2 > b) {
                            min2 = b;
                        }
                        if (max2 < b) {
                            max2 = b;
                        }
                        y++;
                    }
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
                        if (min2 > b) {
                            min2 = b;
                        }
                        if (max2 < b) {
                            max2 = b;
                        }
                        y++;
                    }
                    if ((max1 < min2 || min1 > max2) === false) {
                        collide = true;
                        break;
                    }
                }
            }
            return collide;
        }
        function polygon2Vertexs(polygon, vertexs) {
            var array = polygon.vertexs;
            var segments = polygon.segments;
            for (var i = 0; i < segments.length; i++) {
                var segment = segments[i];
                if (segment.ab.length() === 0) {
                    continue;
                }
                if (vertex2VertexInDirection(array, vertexs, segments[i].ab) === false) {
                    return false;
                }
            }
            return true;
        }
        CollisionResolution2D.polygon2Vertexs = polygon2Vertexs;
        function line2Circle(line, circle, out) {
            var rxr = circle.radius * circle.radius;
            var a2cs = line.a.distanceToSquared(circle);
            var b2cs = line.b.distanceToSquared(circle);
            if (a2cs <= rxr && b2cs <= rxr) {
                out.p1.assign(line.a.x, line.a.y);
                out.type = CrossTypeEnum.CROSS;
                return true;
            }
            var normal = line.ab.normal().normalize().mul(circle.radius);
            var a = new Vector2D(circle.x, circle.y).add(normal);
            var b = new Vector2D(circle.x, circle.y).sub(normal);
            var info = {
                p: new Vector2D(0, 0),
                type: CrossTypeEnum.NONE
            };
            isLineBetweenPoints(line.a, line.ab, a, b, info);
            if (info.type === CrossTypeEnum.NONE) {
                return false;
            }
            info.type = CrossTypeEnum.NONE;
            var lxl = info.p.copy().sub(circle).lengthSquared();
            var distance = Math.sqrt(rxr - lxl);
            normal.assign(line.ab.x, line.ab.y).normalize().mul(distance);
            a = info.p.copy().add(normal);
            b = info.p.copy().sub(normal);
            var isAinLine = isInRange(a.x, line.a.x, line.b.x) && isInRange(a.y, line.a.y, line.b.y);
            var isBinLine = isInRange(b.x, line.a.x, line.b.x) && isInRange(b.y, line.a.y, line.b.y);
            if (isAinLine && isBinLine) {
                makeP1andP2(line.a, a, b, out);
                out.type = CrossTypeEnum.CROSS_2;
            }
            else if (isAinLine) {
                out.p1 = a;
                out.type = CrossTypeEnum.CROSS;
            }
            else if (isBinLine) {
                out.p1 = b;
                out.type = CrossTypeEnum.CROSS;
            }
            else {
                return false;
            }
        }
        CollisionResolution2D.line2Circle = line2Circle;
        function line2Polygon(line, polygon, type, out) {
            var segments = polygon.segments;
            var info = {
                p: new world2d.Vector2D(0, 0),
                type: CrossTypeEnum.NONE
            };
            for (var i = 0; i < segments.length; i++) {
                var seg = segments[i];
                if (type === RaycastTypeEnum.ANY || type === RaycastTypeEnum.ALL) {
                    if (line2Line(line.ab, line.a, line.b, seg.ab, seg.a, seg.b, null)) {
                        out.type = CrossTypeEnum.CROSS;
                        break;
                    }
                }
                else {
                    line2Line(line.ab, line.a, line.b, seg.ab, seg.a, seg.b, info);
                    if (info.type === CrossTypeEnum.CROSS) {
                        if (out.type === CrossTypeEnum.NONE) {
                            out.type = CrossTypeEnum.CROSS;
                            out.p1.assign(info.p.x, info.p.y);
                        }
                        else {
                            out.type = CrossTypeEnum.CROSS_2;
                            out.p2.assign(info.p.x, info.p.y);
                        }
                        if (out.type === CrossTypeEnum.CROSS_2) {
                            break;
                        }
                        info.type = CrossTypeEnum.NONE;
                    }
                }
            }
            if (out.type === CrossTypeEnum.NONE) {
                if (pointInPolygon(line.a, polygon) && pointInPolygon(line.b, polygon)) {
                    out.p1.assign(line.a.x, line.a.y);
                    out.type = CrossTypeEnum.CROSS;
                }
            }
            else if (out.type === CrossTypeEnum.CROSS_2) {
                makeP1andP2(line.a, out.p1, out.p2, out);
            }
            return out.type !== CrossTypeEnum.NONE;
        }
        CollisionResolution2D.line2Polygon = line2Polygon;
        function makeP1andP2(p, p1, p2, out) {
            if (p2.distanceToSquared(p) < p1.distanceToSquared(p)) {
                out.p1 = p2;
                out.p2 = p1;
            }
            else {
                out.p1 = p1;
                out.p2 = p2;
            }
        }
        function line2Line(a, a1, a2, b, b1, b2, info) {
            var type;
            if (a.x === 0 && b.x === 0) {
                if (a1.x === b1.x && (isInRange(a1.y, b1.y, b2.y) || isInRange(a2.y, b1.y, b2.y) || isInRange(b1.y, a1.y, a2.y) || isInRange(b2.y, a1.y, a2.y))) {
                    type = CrossTypeEnum.OVERLAP;
                }
                else {
                    type = CrossTypeEnum.NONE;
                }
            }
            else if (a.y === 0 && b.y === 0) {
                if (a1.y === b1.y && (isInRange(a1.x, b1.x, b2.x) || isInRange(a2.x, b1.x, b2.x) || isInRange(b1.x, a1.x, a2.x) || isInRange(b2.x, a1.x, a2.x))) {
                    type = CrossTypeEnum.OVERLAP;
                }
                else {
                    type = CrossTypeEnum.NONE;
                }
            }
            else if (isLineBetweenPoints(b1, b, a1, a2, info) && isLineBetweenPoints(a1, a, b1, b2, info)) {
                type = CrossTypeEnum.CROSS;
            }
            else {
                type = CrossTypeEnum.NONE;
            }
            if (info !== null && info.type !== type) {
                info.type = type;
            }
            return type !== CrossTypeEnum.NONE;
        }
        CollisionResolution2D.line2Line = line2Line;
        function isLineBetweenPoints(a, ab, p1, p2, info) {
            if (ab.x === 0) {
                return isInRange(a.x, p1.x, p2.x) && fixCrossInfo(a.x, a.x, p1.y, p2.y, info);
            }
            else if (ab.y === 0) {
                return isInRange(a.y, p1.y, p2.y) && fixCrossInfo(p1.x, p2.x, a.y, a.y, info);
            }
            else {
                var k = ab.y / ab.x;
                if (k > -1 && k < 1) {
                    var b = a.y - k * a.x;
                    var p1b = p1.y - k * p1.x;
                    var p2b = p2.y - k * p2.x;
                    return isInRange(b, p1b, p2b) && makeCrossInfo(b, p1b, p2b, p1, p2, info);
                }
                else {
                    var m = ab.x / ab.y;
                    var n = a.x - m * a.y;
                    var p1n = p1.x - m * p1.y;
                    var p2n = p2.x - m * p2.y;
                    return isInRange(n, p1n, p2n) && makeCrossInfo(n, p1n, p2n, p1, p2, info);
                }
            }
        }
        CollisionResolution2D.isLineBetweenPoints = isLineBetweenPoints;
        function isInRange(x, a, b) {
            if (a < b) {
                return a <= x && x <= b;
            }
            else {
                return b <= x && x <= a;
            }
        }
        CollisionResolution2D.isInRange = isInRange;
        function fixCrossInfo(x1, x2, y1, y2, info) {
            if (info !== null && info.type === CrossTypeEnum.NONE && x1 === x2 && y1 === y2) {
                info.p.assign(x1, y1);
                info.type = CrossTypeEnum.CROSS;
            }
            return true;
        }
        function makeCrossInfo(k, k1, k2, p1, p2, info) {
            if (info !== null && info.type === CrossTypeEnum.NONE) {
                info.p = new Vector2D(p2.x - p1.x, p2.y - p1.y).mul((k - k1) / (k2 - k1)).add(p1);
                info.type = CrossTypeEnum.CROSS;
            }
            return true;
        }
    })(CollisionResolution2D = world2d.CollisionResolution2D || (world2d.CollisionResolution2D = {}));
    var DrawAPI2D;
    (function (DrawAPI2D) {
        function clear() {
            DrawAPI2D.graphics.clear();
        }
        DrawAPI2D.clear = clear;
        function draw(transforms) {
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                var bounds = transform.collision.bounds;
                DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, "#FF0000");
            }
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    var collision = transform.collision;
                    DrawAPI2D.drawCircle(transform.x, transform.y, collision.radius, "#FF0000");
                }
                else if (transform.collision.shap === CollisionShapEnum2D.POLYGON) {
                    var collision = transform.collision;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, "#FF0000");
                }
                else {
                    var collision = transform.collision;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, "#FF0000");
                }
            }
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                var lineColor = transform.hitNum === 0 ? "#0000FF" : "#00FF00";
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    var collision = transform.collision;
                    DrawAPI2D.drawCircle(transform.x, transform.y, collision.radius, lineColor);
                }
                else if (transform.collision.shap === CollisionShapEnum2D.POLYGON) {
                    var collision = transform.collision;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, lineColor);
                }
                else {
                    var bounds = transform.collision.bounds;
                    DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, lineColor);
                }
            }
        }
        DrawAPI2D.draw = draw;
        function drawLine(a, b, lineColor) {
            DrawAPI2D.graphics.drawLine(a.x, a.y, b.x, b.y, lineColor);
        }
        DrawAPI2D.drawLine = drawLine;
        function drawNormal(a, lineColor) {
            var normal = a.copy().normalize().mul(1000);
            DrawAPI2D.graphics.drawLine(a.x, a.y, -a.x, -a.y, lineColor);
        }
        DrawAPI2D.drawNormal = drawNormal;
        function drawRect(x, y, width, height, lineColor) {
            DrawAPI2D.graphics.drawRect(x, y, width, height, void 0, lineColor);
        }
        DrawAPI2D.drawRect = drawRect;
        function drawCircle(x, y, radius, lineColor) {
            DrawAPI2D.graphics.drawCircle(x, y, radius, void 0, lineColor);
        }
        DrawAPI2D.drawCircle = drawCircle;
        function drawPolygon(x, y, vertexs, lineColor) {
            for (var i = 0; i < vertexs.length; i++) {
                var a = vertexs[i];
                var b = i === 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                DrawAPI2D.graphics.drawLine(a.x + x, a.y + y, b.x + x, b.y + y, lineColor);
            }
        }
        DrawAPI2D.drawPolygon = drawPolygon;
    })(DrawAPI2D = world2d.DrawAPI2D || (world2d.DrawAPI2D = {}));
    var Helper2D;
    (function (Helper2D) {
        function calculateBoundsForVertexs(vertexs, bounds) {
            var p = vertexs[0];
            var left = p.x;
            var right = p.x;
            var top = p.y;
            var bottom = p.y;
            for (var i = 1; i < vertexs.length; i++) {
                var p_1 = vertexs[i];
                if (left > p_1.x) {
                    left = p_1.x;
                }
                else if (right < p_1.x) {
                    right = p_1.x;
                }
                if (top > p_1.y) {
                    top = p_1.y;
                }
                else if (bottom < p_1.y) {
                    bottom = p_1.y;
                }
            }
            bounds.updateBounds(left, right, top, bottom);
        }
        Helper2D.calculateBoundsForVertexs = calculateBoundsForVertexs;
    })(Helper2D = world2d.Helper2D || (world2d.Helper2D = {}));
})(world2d || (world2d = {}));
