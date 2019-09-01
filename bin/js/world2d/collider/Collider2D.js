var world2d;
(function (world2d) {
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
})(world2d || (world2d = {}));
//# sourceMappingURL=Collider2D.js.map