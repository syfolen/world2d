
module world2d {
    /**
     * 碰撞层级
     * export
     */
    export enum CollisionLayerEnum {
        /**
         * 默认
         * export
         */
        DEFAULT = 0x1,

        /**
         * 鱼
         * export
         */
        FISH = 0x2,

        /**
         * 子弹
         * export
         */
        BULLET = 0x4,

        POLYGON = 0x8,

        CIRCLE = 0x10,

        RECTANLE = 0x20,

        /**
         * 鱼的子集
         */
        FISH_2 = 0x40,

        /**
         * 锁定的子弹
         */
        BULLET_2 = 0x80,

        ALL = 0x1000
    }
}