
module world2d {

    /**
     * 碰撞层级
     */
    export enum CollisionLayerEnum {
        /**
         * 默认
         */
        DEFAULT = 0x1,

        /**
         * 鱼
         */
        FISH = 0x2,

        /**
         * 子弹
         */
        BULLET = 0x4,

        POLYGON = 0x8,

        CIRCLE = 0x10,

        RECTANLE = 0x20,

        ALL = 0x1000
    }
}