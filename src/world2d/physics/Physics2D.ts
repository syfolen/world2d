
module world2d {
    /**
     * 物理类
     * export
     */
    export class Physics2D {

        /**
         * 返回所有与指定点碰撞的图形
         * export
         */
        static testPoint(p: IVector2D, layers: CollisionLayerEnum = 0): ITransform2D {
            const transforms: ITransform2D[] = World2D.inst.transforms.slice(0);
            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                const collision: ICollisionCircle2D = transform.collision as ICollisionCircle2D;
                if (layers > 0 && (transform.layer & layers) === 0) {
                    continue;
                }
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    if (CollisionResolution2D.pointInCircle(p, collision)) {
                        return transform;
                    }
                }
                else if (transform.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    if (CollisionResolution2D.pointInRectangle(p, transform.collision.bounds)) {
                        return transform;
                    }
                }
                else {
                    if (CollisionResolution2D.pointInPolygon(p, transform.collision as ICollisionPolygon2D)) {
                        return transform;
                    }
                }
            }
            return null;
        }

        /**
         * 射线检测
         */
        static raycast(origin: IVector2D, direction: IVector2D, maxDistance: number, layers: CollisionLayerEnum = 0): IRaycastResult[] {
            // 射线目标位置
            const destination: IVector2D = direction.copy().normalize().mul(maxDistance).add(origin);
            DrawAPI2D.drawLine(origin, destination, "#FF00FF");

            const segment: ISegment2D = new Segment2D();
            segment.a.assign(origin.x, origin.y);
            segment.b.assign(destination.x, destination.y);
            segment.ab.assign(destination.x - origin.x, destination.y - origin.y);

            // 线射碰撞盒
            const bounds: IBounds = new Bounds();
            bounds.updateBounds(
                Helper2D.min(origin.x, destination.x),
                Helper2D.max(origin.x, destination.x),
                Helper2D.min(origin.y, destination.y),
                Helper2D.max(origin.y, destination.y)
            );
            DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, "#FF0000");

            const array: ITransform2D[] = [];
            const transforms: ITransform2D[] = World2D.inst.transforms;

            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                if (layers > 0 && (transform.layer & layers) === 0) {
                    continue;
                }
                if (CollisionResolution2D.bounds2Bounds(bounds, transform.collision.bounds) === false) {
                    continue;
                }
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    // array.push(transform);
                    // CollisionResolution2D.line2Circle();
                }
                else {
                    // array.push(transform);
                    CollisionResolution2D.line2Polygon(segment, transform.collision as ICollisionPolygon2D);
                }
            }

            console.log(array.length);

            return null;
        }
    }
}