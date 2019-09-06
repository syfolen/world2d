
module world2d {

    /**
     * 物理类
     */
    export class Physics {

        /**
         * 返回所有与指定点碰撞的图形
         */
        static testPoint<T extends IEntity<any>>(p: IVector2D): ITransform2D<T> {
            const transforms = World2D.inst.transforms.slice(0);
            for (let i = 0; i < transforms.length; i++) {
                const transform = transforms[i];
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    const collision: ICollisionCircle2D = transform.collision as ICollisionCircle2D;
                    if (p.distanceTo(collision) <= collision.radius) {
                        return transform;
                    }
                }
                else if (transform.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    const collision: ICollisionRectangle2D = transform.collision as ICollisionRectangle2D;
                    if (p.x >= collision.left && p.x <= collision.right && p.y >= collision.top && p.y <= collision.bottom) {
                        return transform;
                    }
                }
                else {
                    const collision: ICollisionPolygon2D = transform.collision as ICollisionPolygon2D;
                    const vertexs = collision.vertexs;

                    let angle: number = 0;
                    for (let i = 0; i < vertexs.length; i++) {
                        const a = vertexs[i];
                        const b = i === 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                        if (a.x === b.x && a.y === b.y) {
                            continue;
                        }
                        angle += Vector2D.angle(Vector2D.sub(a, p), Vector2D.sub(b, p));
                    }

                    if (Helper2D.abs(Helper2D.a2d(angle) - 360) < 0.1) {
                        return transform;
                    }
                }
            }
            return null;
        }

        /**
         * 射线检测
         */
        static raycast<T extends IEntity<any>>(origin: IVector2D, direction: IVector2D, maxDistance: number, layers: CollisionLayerEnum): void {
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

            const transforms: Array<ITransform2D<T>> = World2D.inst.transforms;

            // 参与检测的对象列表
            let array: Array<ITransform2D<T>> = (layers & CollisionLayerEnum.ALL) ? null : [];

            // 默认检测所有对象
            if (array === null) {
                array = transforms.concat();
            }
            // 获取与射线包围盒发生碰撞的对象
            else {
                for (let i: number = 0; i < transforms.length; i++) {
                    const transform: ITransform2D<T> = transforms[i];
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