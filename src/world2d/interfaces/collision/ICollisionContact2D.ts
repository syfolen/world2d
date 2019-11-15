
module world2d {

    export interface ICollisionContact2D {

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
        readonly a: ITransform2D;

        /**
         * 碰撞对象
         */
        readonly b: ITransform2D;

        /**
         * 相撞标记
         */
        readonly touching: boolean;
    }
}