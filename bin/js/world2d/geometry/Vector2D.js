var world2d;
(function (world2d) {
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
        Vector2D.prototype.rotate = function (radian) {
            var x = this.x;
            var y = this.y;
            var cos = Math.cos(radian);
            var sin = Math.sin(radian);
            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
            return this;
        };
        /**
         * 向量与x轴之间的弧度
         */
        Vector2D.prototype.angle = function () {
            var radian = Math.atan2(this.y, this.x);
            if (radian < 0) {
                return radian + 2 * Math.PI;
            }
            else {
                return radian;
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
})(world2d || (world2d = {}));
//# sourceMappingURL=Vector2D.js.map