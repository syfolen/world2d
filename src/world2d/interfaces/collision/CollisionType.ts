
module world2d {
    /**
     * 碰撞类型
     */
    export enum CollisionType {
        /**
         * 发生碰撞
         */
        COLLISION_ENTER = 0,

        /**
         * 保持碰撞
         */
        COLLISION_STAY,

        /**
         * 结束碰撞
         */
        COLLISION_EXIT
    }
}