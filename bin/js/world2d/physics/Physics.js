var world2d;
(function (world2d) {
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
            var transforms = world2d.World2D.inst.transforms.slice(0);
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                if (transform.collision.shap === world2d.CollisionShapEnum2D.CIRCLE) {
                    var collision = transform.collision;
                    if (p.distanceTo(collision) <= collision.radius) {
                        return transform;
                    }
                }
                else if (transform.collision.shap === world2d.CollisionShapEnum2D.RECTANGLE) {
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
                        angle += world2d.Vector2D.angle(world2d.Vector2D.sub(a, p), world2d.Vector2D.sub(b, p));
                    }
                    if (world2d.Helper2D.abs(world2d.Helper2D.a2d(angle) - 360) < 0.1) {
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
            world2d.DrawAPI2D.drawLine(origin, destination, "#FF0000");
            // 线射碰撞盒
            var bounds = new world2d.Bounds();
            bounds.updateBounds(world2d.Helper2D.min(origin.x, destination.x), world2d.Helper2D.max(origin.x, destination.x), world2d.Helper2D.max(origin.y, destination.y), world2d.Helper2D.max(origin.y, destination.y));
            var transforms = world2d.World2D.inst.transforms;
            // 参与检测的对象列表
            var array = (layers & world2d.CollisionLayerEnum.ALL) ? null : [];
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
                    if (world2d.CollisionResolution2D.bounds2Bounds(bounds, transform.bounds) === false) {
                        continue;
                    }
                    array.push(transform);
                }
            }
        };
        return Physics;
    }());
    world2d.Physics = Physics;
})(world2d || (world2d = {}));
//# sourceMappingURL=Physics.js.map