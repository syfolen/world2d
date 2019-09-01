var world2d;
(function (world2d) {
    /**
     * 物理类
     */
    var Physics = /** @class */ (function () {
        function Physics() {
        }
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
            if (array == null) {
                array = transforms.concat();
            }
            // 获取与射线包围盒发生碰撞的对象
            else {
                for (var i = 0; i < transforms.length; i++) {
                    var transform = transforms[i];
                    // 不在指定的层级之中
                    if ((transform.layer & layers) == 0) {
                        continue;
                    }
                    // 未与射线的包围盒发生碰撞
                    if (world2d.CollisionResolution2D.bounds2Bounds(bounds, transform.bounds) == false) {
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