
module world2d {
    /**
     * 射线碰撞结果
     */
    export interface IRayCastResult {

        transform: ITransform2D;

        point: IVector2D;

        normal: IVector2D;

        fraction: number;
    }
}