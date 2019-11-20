
module world2d {

    /**
     * 实体对象接口
     */
    export interface IEntity {

        /**
         * 碰撞产生
         */
        onCollisionEnter(other: IEntity): void;

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        onCollisionStay(other: IEntity): void;

        /**
         * 碰撞结束
         */
        onCollisionExit(other: IEntity): void;

        /**
         * 物理数据转换器
         */
        readonly transform: ITransform2D;
    }
}