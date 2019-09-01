var world2d;
(function (world2d) {
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
})(world2d || (world2d = {}));
//# sourceMappingURL=Helper2D.js.map