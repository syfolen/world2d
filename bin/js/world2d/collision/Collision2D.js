var world2d;
(function (world2d) {
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
})(world2d || (world2d = {}));
//# sourceMappingURL=Collision2D.js.map