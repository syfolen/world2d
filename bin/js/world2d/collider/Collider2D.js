var world2d;
(function (world2d) {
    /**
     * 对撞机接口，仅用来保存对撞机的模型数据，如圆形对撞机的半径、多边形对撞机的顶点坐标等，坐标、缩放、旋转等数据不在此模型中
     * 此对象仅仅是数据结构，不具有任何行为方法
     * export
     */
    var Collider2D = /** @class */ (function () {
        function Collider2D(shap) {
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