
module world2d {

    /**
     * 物理类
     */
    export class Physics {

        /**
         * 射线检测
         */
        static raycast(origin: IVector2D, direction: IVector2D, maxDistance: number, layers: CollisionLayerEnum): void {
            // 射线目标位置
            const destination: IVector2D = direction.copy().normalize().mul(maxDistance).add(origin);
            DrawAPI2D.drawLine(origin, destination, "#FF0000");

            // 线射碰撞盒
            const bounds: IBounds = new Bounds();
            bounds.updateBounds(
                Helper2D.min(origin.x, destination.x),
                Helper2D.max(origin.x, destination.x),
                Helper2D.max(origin.y, destination.y),
                Helper2D.max(origin.y, destination.y)
            );

            const transforms: Array<ITransform2D> = World2D.inst.transforms;

            // 参与检测的对象列表
            let array: Array<ITransform2D> = (layers & CollisionLayerEnum.ALL) ? null : [];

            // 默认检测所有对象
            if (array === null) {
                array = transforms.concat();
            }
            // 获取与射线包围盒发生碰撞的对象
            else {
                for (let i: number = 0; i < transforms.length; i++) {
                    const transform: ITransform2D = transforms[i];
                    // 不在指定的层级之中
                    if ((transform.layer & layers) === 0) {
                        continue;
                    }
                    // 未与射线的包围盒发生碰撞
                    if (CollisionResolution2D.bounds2Bounds(bounds, transform.bounds) === false) {
                        continue;
                    }
                    array.push(transform);
                }
            }
        }
    }
}