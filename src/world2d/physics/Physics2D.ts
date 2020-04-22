
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
         * @layers: 射线检测的层级，若为0，则检测所有层级，默认为：0
         * @type: 射线类型，默认为：CLOSEST
         */
        static raycast(origin: IVector2D, direction: IVector2D, maxDistance: number, layers: CollisionLayerEnum = 0, type: RaycastTypeEnum = RaycastTypeEnum.CLOSEST): IRaycastResult[] {
            // 射线目标位置
            const destination: IVector2D = direction.copy().normalize().mul(maxDistance).add(origin);
            DrawAPI2D.drawLine(origin, destination, "#FF0000");

            const segment: ISegment2D = new Segment2D();
            segment.assign(origin, destination);

            // 线射碰撞盒
            const bounds: IBounds = new Bounds();
            bounds.updateBounds(
                Helper2D.min(origin.x, destination.x),
                Helper2D.max(origin.x, destination.x),
                Helper2D.min(origin.y, destination.y),
                Helper2D.max(origin.y, destination.y)
            );
            // DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, "#FF0000");

            const array: IRaycastResult[] = [];
            const transforms: ITransform2D[] = World2D.inst.transforms;

            let out: IRaycastResult = null;

            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                transform.hitNum = 0;
                if (layers > 0 && (transform.layer & layers) === 0) {
                    continue;
                }
                if (CollisionResolution2D.bounds2Bounds(bounds, transform.collision.bounds) === false) {
                    continue;
                }
                if (out === null) {
                    out = {
                        type: CrossTypeEnum.NONE,
                        transform: null,
                        p1: new Vector2D(0, 0),
                        p2: new Vector2D(0, 0),
                        normal: null,
                        distance: 0
                    };
                }
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    CollisionResolution2D.line2Circle(segment, transform.collision as ICollisionCircle2D, out);
                }
                else {
                    CollisionResolution2D.line2Polygon(segment, transform.collision as ICollisionPolygon2D, out);
                }
                if (out.type === CrossTypeEnum.NONE) {
                    transform.hitNum = 0;
                }
                else {
                    transform.hitNum = 1;
                    out.transform = transform;
                    array.push(out);
                    out = null;
                }
            }
            console.log(array.length);

            return array;
        }
    }
}