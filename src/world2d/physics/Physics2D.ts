
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
            world2d.World2D.DEBUG === true && DrawAPI2D.drawLine(origin, destination, "#FF0000");

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

            const transforms: ITransform2D[] = World2D.inst.transforms;

            let out: IRaycastResult = null;
            let array: IRaycastResult[] = [];

            // 测试代码
            for (let i: number = 0; i < transforms.length; i++) {
                transforms[i].hitNum = 0;
            }

            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
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
                    CollisionResolution2D.line2Polygon(segment, transform.collision as ICollisionPolygon2D, type, out);
                }

                if (out.type === CrossTypeEnum.NONE) {
                    continue;
                }
                out.transform = transform;

                // 测试代码
                transform.hitNum = 1;

                // 若射线类型为CLOSEST，则替换己找到的对象，并更新射线的矩形区域
                if (type === RaycastTypeEnum.CLOSEST) {
                    if (array.length === 1) {
                        // 测试代码
                        array[0].transform.hitNum = 0;
                    }
                    array[0] = out;
                    bounds.updateBounds(
                        Helper2D.min(origin.x, out.p1.x),
                        Helper2D.max(origin.x, out.p1.x),
                        Helper2D.min(origin.y, out.p1.y),
                        Helper2D.max(origin.y, out.p1.y)
                    );
                    // DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, "#FF0000");
                }
                else {
                    array.push(out);
                }

                if (type === RaycastTypeEnum.ANY) {
                    break;
                }
                else if (type === RaycastTypeEnum.CLOSEST || type === RaycastTypeEnum.ALL_CLOSEST) {
                    out.distance = out.p1.distanceTo(origin);
                }

                /**
                 * 以上为测试代码，正式发布时需要优化
                 */
                out = null;
            }

            // CLOSEST类型的射线得到的array长度己在上面作过限制了
            if (type === RaycastTypeEnum.ALL_CLOSEST && array.length > 1) {
                const newArray: IRaycastResult[] = [];

                while (array.length > 1) {
                    let res: IRaycastResult = array[0];
                    let index: number = 0;

                    for (let i: number = 1; i < array.length; i++) {
                        const item: IRaycastResult = array[i];
                        if (res === null || item.distance < res.distance) {
                            res = item;
                            index = i;
                        }
                    }

                    array.splice(index, 1);
                    newArray.push(res);
                }

                newArray.push(array[0]);
                array = newArray;
            }

            return array;
        }
    }
}