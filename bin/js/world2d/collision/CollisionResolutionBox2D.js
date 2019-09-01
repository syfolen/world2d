var world2d;
(function (world2d) {
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
                p = new world2d.Vector2D(start.x + t * dx, start.y + t * dy);
            }
            else {
                if (d) {
                    if (t < 0)
                        p = start;
                    else if (t > 1)
                        p = end;
                    else
                        p = new world2d.Vector2D(start.x + t * dx, start.y + t * dy);
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
})(world2d || (world2d = {}));
//# sourceMappingURL=CollisionResolutionBox2D.js.map