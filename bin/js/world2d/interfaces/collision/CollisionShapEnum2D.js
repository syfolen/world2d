var world2d;
(function (world2d) {
    /**
     * 碰撞区域形状枚举
     */
    var CollisionShapEnum2D;
    (function (CollisionShapEnum2D) {
        /**
         * 圆型
         */
        CollisionShapEnum2D[CollisionShapEnum2D["CIRCLE"] = 0] = "CIRCLE";
        /**
         * 多边型
         */
        CollisionShapEnum2D[CollisionShapEnum2D["POLYGON"] = 1] = "POLYGON";
        /**
         * 矩形
         */
        CollisionShapEnum2D[CollisionShapEnum2D["RECTANGLE"] = 2] = "RECTANGLE";
    })(CollisionShapEnum2D = world2d.CollisionShapEnum2D || (world2d.CollisionShapEnum2D = {}));
})(world2d || (world2d = {}));
//# sourceMappingURL=CollisionShapEnum2D.js.map