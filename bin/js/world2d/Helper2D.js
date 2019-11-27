var world2d;
(function (world2d) {
    /**
     * export
     */
    var Helper2D = /** @class */ (function () {
        function Helper2D() {
        }
        /**
         * 角度换算为弧度
         * export
         */
        Helper2D.d2r = function (d) {
            return d * Math.PI / 180;
        };
        /**
         * 弧度换算为角度
         * export
         */
        Helper2D.r2d = function (a) {
            return a * 180 / Math.PI;
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
         * 为一组顶点计算边界值
         */
        Helper2D.calculateBoundsForVertexs = function (vertexs, bounds) {
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
})(world2d || (world2d = {}));
//# sourceMappingURL=Helper2D.js.map