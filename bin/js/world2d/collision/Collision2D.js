var world2d;
(function (world2d) {
    /**
     * 碰撞体，用来保存对撞机数据模型在世界空间中的映射数据，包括绝对坐标，绝对矩形区域、圆绝对半径、多边形顶点的绝对坐标
     * 此对象仅仅是数据结构，不具有任何行为方法
     * export
     */
    var Collision2D = /** @class */ (function () {
        function Collision2D(shap) {
            /**
             * 矩形区域
             */
            this.bounds = new world2d.Bounds();
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