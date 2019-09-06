
module world2d {

    export interface ICollisionContact2D<T extends IEntity<any>> {

        /**
         * 检测是否相撞
         */
        test(): void;

        /**
         * 执行碰撞回调
         */
        doCollide(type: CollisionType): void;

        /**
         * 碰撞对象
         */
        readonly a: ITransform2D<T>;

        /**
         * 碰撞对象
         */
        readonly b: ITransform2D<T>;

        /**
         * 相撞标记
         */
        readonly touching: boolean;
    }
}