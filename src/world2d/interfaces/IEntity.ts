
module world2d {
    /**
     * 实体对象接口
     * export
     */
    export interface IEntity {

        /**
         * 碰撞产生
         * export
         */
        onCollisionEnter(other: IEntity): void;

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         * export
         */
        onCollisionStay(other: IEntity): void;

        /**
         * 碰撞结束
         * export
         */
        onCollisionExit(other: IEntity): void;

        /**
         * 物理数据转换器
         * export
         */
        readonly transform: ITransform2D;
    }
}