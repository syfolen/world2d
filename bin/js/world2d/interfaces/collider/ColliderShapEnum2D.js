var world2d;
(function (world2d) {
    /**
     * 碰撞体形状枚举
     */
    var ColliderShapEnum2D;
    (function (ColliderShapEnum2D) {
        /**
         * 圆型
         */
        ColliderShapEnum2D[ColliderShapEnum2D["CIRCLE"] = 0] = "CIRCLE";
        /**
         * 多边型
         */
        ColliderShapEnum2D[ColliderShapEnum2D["POLYGON"] = 1] = "POLYGON";
    })(ColliderShapEnum2D = world2d.ColliderShapEnum2D || (world2d.ColliderShapEnum2D = {}));
})(world2d || (world2d = {}));
//# sourceMappingURL=ColliderShapEnum2D.js.map