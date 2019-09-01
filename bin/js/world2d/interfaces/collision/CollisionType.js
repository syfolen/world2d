var world2d;
(function (world2d) {
    /**
     * 碰撞类型
     */
    var CollisionType;
    (function (CollisionType) {
        /**
         * 发生碰撞
         */
        CollisionType[CollisionType["COLLISION_ENTER"] = 0] = "COLLISION_ENTER";
        /**
         * 保持碰撞
         */
        CollisionType[CollisionType["COLLISION_STAY"] = 1] = "COLLISION_STAY";
        /**
         * 结束碰撞
         */
        CollisionType[CollisionType["COLLISION_EXIT"] = 2] = "COLLISION_EXIT";
    })(CollisionType = world2d.CollisionType || (world2d.CollisionType = {}));
})(world2d || (world2d = {}));
//# sourceMappingURL=CollisionType.js.map