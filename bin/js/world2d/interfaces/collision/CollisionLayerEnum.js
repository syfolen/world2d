var world2d;
(function (world2d) {
    /**
     * 碰撞层级
     */
    var CollisionLayerEnum;
    (function (CollisionLayerEnum) {
        /**
         * 默认
         */
        CollisionLayerEnum[CollisionLayerEnum["DEFAULT"] = 1] = "DEFAULT";
        /**
         * 鱼
         */
        CollisionLayerEnum[CollisionLayerEnum["FISH"] = 2] = "FISH";
        /**
         * 子弹
         */
        CollisionLayerEnum[CollisionLayerEnum["BULLET"] = 4] = "BULLET";
        CollisionLayerEnum[CollisionLayerEnum["POLYGON"] = 8] = "POLYGON";
        CollisionLayerEnum[CollisionLayerEnum["CIRCLE"] = 16] = "CIRCLE";
        CollisionLayerEnum[CollisionLayerEnum["RECTANLE"] = 32] = "RECTANLE";
        CollisionLayerEnum[CollisionLayerEnum["ALL"] = 4096] = "ALL";
    })(CollisionLayerEnum = world2d.CollisionLayerEnum || (world2d.CollisionLayerEnum = {}));
})(world2d || (world2d = {}));
//# sourceMappingURL=CollisionLayerEnum.js.map