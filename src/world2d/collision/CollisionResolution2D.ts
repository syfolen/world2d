
module world2d {
    /**
     * 2D碰撞检测
     */
    export namespace CollisionResolution2D {
        /**
         * 判断点是否在圆里面
         */
        export function pointInCircle(p: IVector2D, c: ICircle2D): boolean {
            return p.distanceToSquared(c) <= c.radius * c.radius;
        }

        /**
         * 判断点是否在矩形内
         */
        export function pointInRectangle(p: IVector2D, r: IBounds): boolean {
            return p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom;
        }

        /**
         * 判断点是否在多边形内
         */
        export function pointInPolygon(p: IVector2D, p2d: ICollisionPolygon2D): boolean {
            const vertexs: IVector2D[] = p2d.vertexs;

            let radian: number = 0;
            for (let i: number = 0; i < vertexs.length; i++) {
                const a: IVector2D = vertexs[i];
                const b: IVector2D = i === 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                if (a.x === b.x && a.y === b.y) {
                    continue;
                }
                radian += Vector2D.angle(Vector2D.sub(a, p), Vector2D.sub(b, p));
            }

            return Helper2D.abs(Helper2D.r2d(radian) - 360) < 0.01;
        }

        /**
         * 包围盒与包围盒
         */
        export function bounds2Bounds(a: IBounds, b: IBounds): boolean {
            if (a.left > b.right || b.left > a.right || a.top > b.bottom || b.top > a.bottom) {
                return false;
            }
            return true;
        }

        /**
         * 圆与圆
         */
        export function circle2Circle(a: ICircle2D, b: ICircle2D): boolean {
            // 坐标差
            const dx: number = b.x - a.x;
            const dy: number = b.y - a.y;
            // 两圆半径和
            const dr: number = a.radius + b.radius;
            // 若两圆距离大于半径和，则未碰撞
            if (dx * dx + dy * dy > dr * dr) {
                return false;
            }
            return true;
        }

        /**
         * 检测圆与多边形是否相交
         */
        export function circle2Polygin(c: ICircle2D, d: IPolygon2D): boolean {
            // 多边形顶点数据
            const vertexs: IVector2D[] = d.vertexs;
            // 半径平方
            const radiusSquared: number = c.radius * c.radius;

            // 与圆最近的顶点
            let nearestVertex: IVector2D = null;
            // 最小距离
            let nearestDistanceSquared: number = Helper2D.MAX_SAFE_INTEGER;
            // 最小距离是否小于或等于半径
            let distanceLessOrEqualThanRadius: boolean = false;

            // 计算与圆最近的顶点
            for (let i: number = 0; i < vertexs.length; i++) {
                const vertex: IVector2D = vertexs[i];
                const distance: number = vertex.distanceToSquared(c);
                // 若最小距离的平方小于或等于半径平方，则返回
                if (distance <= radiusSquared) {
                    distanceLessOrEqualThanRadius = true;
                    break;
                }
                if (distance < nearestDistanceSquared) {
                    nearestVertex = vertex;
                    nearestDistanceSquared = distance;
                }
            }

            // 若顶点与圆心的距离小于半径，则碰撞
            if (distanceLessOrEqualThanRadius === true) {
                return true;
            }

            // 以圆心到距离最近的顶点组成的线段的法向量为投影线，计算投影是否重合
            const a: IVector2D = new Vector2D(c.x, c.y);
            const b: IVector2D = nearestVertex.copy();
            const ab: IVector2D = new Vector2D(b.x - a.x, b.y - a.y);
            const normal: IVector2D = ab.normal();
            // DrawAPI2D.drawNormal(normal, "#FFFFFF");

            // 获取参与判断的圆上的点
            const p: IVector2D = ab.copy().normalize().mul(c.radius).add(a);
            // DrawAPI2D.drawLine(a, p, "#FF0000");
            // 若p与多边形顶点的顶影不重合，则不相交
            if (vertex2VertexInDirection([p], vertexs, normal) === false) {
                return false;
            }

            const array: IVector2D[] = [a, b];
            const segments: ISegment2D[] = d.segments;

            // 检测圆与多边形顶点在多边形每条边的方向上的投影是否重合
            for (let i: number = 0; i < segments.length; i++) {
                const segment: ISegment2D = segments[i];
                if (segment.ab.length() === 0) {
                    continue;
                }
                // 获取这条边的法向量，并且以半径的倍数放大
                normal.assign(segment.ab.y, -segment.ab.x).normalize().mul(c.radius);
                // 根据法向量获取圆上的两个点
                a.assign(c.x, c.y).add(normal);
                b.assign(c.x, c.y).sub(normal);
                // DrawAPI2D.drawLine(c, a, "#FF0000");
                // DrawAPI2D.drawLine(c, b, "#FF0000");
                // 判断多边型顶点与圆顶点的投影是否相交
                if (vertex2VertexInDirection(array, vertexs, segment.ab) === false) {
                    return false;
                }
            }

            return true;
        }

        /**
         * 判断两组顶点在指定方向上产生的投影是否重叠
         */
        function vertex2VertexInDirection(array: IVector2D[], array2: IVector2D[], direction: IVector2D): boolean {
            /**
             * y=kx+b => k=y/x; b=y-kx;
             * x=my+n => m=x/y; n=x-my;
             * 若k大于-1且小于1，则取b值作比较
             * 否则取n值作比较
             */
            const k: number = direction.y / direction.x;
            const m: number = direction.x / direction.y;

            let min1: number = Helper2D.MAX_SAFE_INTEGER;
            let max1: number = Helper2D.MIN_SAFE_INTEGER;
            let min2: number = Helper2D.MAX_SAFE_INTEGER;
            let max2: number = Helper2D.MIN_SAFE_INTEGER;

            let x: number = 0, y: number = 0;
            let collide: boolean = false;

            if (k < -1 || k > 1) {
                while (x < array.length || y < array2.length) {
                    if (x < array.length) {
                        const p: IVector2D = array[x];
                        const b: number = p.x - m * p.y;
                        // DrawAPI2D.drawLine(p, new Vector2D(b, 0), "#FF0000");
                        if (min1 > b) {
                            min1 = b;
                        }
                        if (max1 < b) {
                            max1 = b;
                        }
                        x++;
                    }
                    if (y < array2.length) {
                        const p: IVector2D = array2[y];
                        const b: number = p.x - m * p.y;
                        // DrawAPI2D.drawLine(p, new Vector2D(b, 0), "#FF0000");
                        if (min2 > b) {
                            min2 = b;
                        }
                        if (max2 < b) {
                            max2 = b;
                        }
                        y++;
                    }
                    // 若（max1 < min2 || min1 > max2）成立，则投影未相交，若己相交，则产生碰撞
                    if ((max1 < min2 || min1 > max2) === false) {
                        collide = true;
                        break;
                    }
                }
            }
            else {
                while (x < array.length || y < array2.length) {
                    if (x < array.length) {
                        const p: IVector2D = array[x];
                        const b: number = p.y - k * p.x;
                        // DrawAPI2D.drawLine(p, new Vector2D(0, b), "#FF0000");
                        if (min1 > b) {
                            min1 = b;
                        }
                        if (max1 < b) {
                            max1 = b;
                        }
                        x++;
                    }
                    if (y < array2.length) {
                        const p: IVector2D = array2[y];
                        const b: number = p.y - k * p.x;
                        // DrawAPI2D.drawLine(p, new Vector2D(0, b), "#FF0000");
                        if (min2 > b) {
                            min2 = b;
                        }
                        if (max2 < b) {
                            max2 = b;
                        }
                        y++;
                    }
                    // 若（max1 < min2 || min1 > max2）成立，则投影未相交，若己相交，则产生碰撞
                    if ((max1 < min2 || min1 > max2) === false) {
                        collide = true;
                        break;
                    }
                }
            }
            return collide;
        }

        /**
         * 判断一组顶点与多边型顶点在多边型每条边的法线上的投影是否全部重合
         * @polygon: 多边形
         * @vertexs: 顶点数据
         */
        export function polygon2Vertexs(polygon: IPolygon2D, vertexs: IVector2D[]): boolean {
            const array: IVector2D[] = polygon.vertexs;
            const segments: ISegment2D[] = polygon.segments;

            for (let i: number = 0; i < segments.length; i++) {
                const segment: ISegment2D = segments[i];
                if (segment.ab.length() === 0) {
                    continue;
                }
                // 若未碰撞，则直接返回
                if (vertex2VertexInDirection(array, vertexs, segments[i].ab) === false) {
                    return false;
                }
            }
            // 默认返回己碰撞
            return true;
        }

        /**
         * 检测线和圆是否相交
         */
        export function line2Circle(line: ISegment2D, circle: ICollisionCircle2D, out: IRaycastResult): boolean {
            const isAInC: boolean = pointInCircle(line.a, circle);
            const isBInC: boolean = pointInCircle(line.b, circle);
            
            // if (pointInCircle(line.a, c) || pointInCircle(line.b, c)) {
            //     return true;
            // }
            return false;
        }

        /**
         * 检测线与多线边是否相交
         */
        export function line2Polygon(line: ISegment2D, polygon: IPolygon2D, out: IRaycastResult): boolean {
            const segments: ISegment2D[] = polygon.segments;

            let info: ICrossInfo2D = {
                p: new world2d.Vector2D(0, 0),
                type: CrossTypeEnum.NONE
            };

            for (let i: number = 0; i < segments.length; i++) {
                const seg: ISegment2D = segments[i];
                line2Line(line.ab, line.a, line.b, seg.ab, seg.a, seg.b, info);
                if (info.type === CrossTypeEnum.CROSS) {
                    if (out.type === CrossTypeEnum.NONE) {
                        out.type = CrossTypeEnum.CROSS;
                        out.p1.assign(info.p.x, info.p.y);
                    }
                    else {
                        out.type = CrossTypeEnum.CROSS_2;
                        out.p2.assign(info.p.x, info.p.y);
                    }
                    if (out.type === CrossTypeEnum.CROSS_2) {
                        break;
                    }
                    info.type = CrossTypeEnum.NONE;
                }
            }

            return out.type !== CrossTypeEnum.NONE;
        }

        /**
         * 判断两直线是否相交
         * @a,b: 需要参与判断的两条线段
         * @a1,a2: 线段a的两个点
         * @b1,b2: 线段b的两个点
         * @info: 相交信息
         */
        export function line2Line(a: IVector2D, a1: IVector2D, a2: IVector2D, b: IVector2D, b1: IVector2D, b2: IVector2D, info: ICrossInfo2D): boolean {
            // a与b均垂直于x轴
            if (a.x === 0 && b.x === 0) {
                if (isInRange(a1.y, b1.y, b2.y) || isInRange(a2.y, b1.y, b2.y) || isInRange(b1.y, a1.y, a2.y) || isInRange(b2.y, a1.y, a2.y)) {
                    // if (a1.y < a2.y) {
                    //     const b1y: number = Helper2D.min(b1.y, b2.y);
                    //     const b2y: number = Helper2D.max(b1.y, b2.y);
                    //     info.p1.assign(Helper2D.max(a1.y, b1y), a1.x);
                    //     info.p2.assign(b2y, a1.x);
                    // }
                    // else {
                    //     const b1y: number = Helper2D.max(b1.y, b2.y);
                    //     const b2y: number = Helper2D.min(b1.y, b2.y);
                    //     info.p1.assign(Helper2D.min(a1.y, b1y), a1.x);
                    //     info.p2.assign(b2y, a1.x);
                    // }
                    info.type = CrossTypeEnum.OVERLAP;
                }
                else {
                    info.type = CrossTypeEnum.NONE;
                }
            }
            // a与b均重直于y轴
            else if (a.y === 0 && b.y === 0) {
                if (isInRange(a1.x, b1.x, b2.x) || isInRange(a2.x, b1.x, b2.x) || isInRange(b1.x, a1.x, a2.x) || isInRange(b2.x, a1.x, a2.x)) {
                    // a:[{50,100},{150,100}],b:[{100,100},{200,100}]=>p1:{100,100},p2:{200,100}
                    // a:[{50,100},{200,100}],b:[{100,100},{150,100}]=>p1:{100,100},p2:{150,100}
                    // a:[{100,100},{200,100}],b:[{50,100},{150,100}]=>p1:{100,100},p2:{150,100}
                    // a:[{100,100},{150,100}],b:[{50,100},{200,100}]=>p1:{100,100},p2:{200,100}
                    // if (a1.x < a2.x) {
                    //     const b1x: number = Helper2D.min(b1.x, b2.x);
                    //     const b2x: number = Helper2D.max(b1.x, b2.x);
                    //     info.p1.assign(Helper2D.max(a1.x, b1x), a1.y);
                    //     info.p2.assign(b2x, a1.y);
                    // }
                    // a:[{150,100},{50,100}],b:[{200,100},{100,100}]=>p1:{150,100},p2:{100,100}
                    // a:[{200,100},{50,100}],b:[{150,100},{100,100}]=>p1:{150,100},p2:{100,100}
                    // a:[{200,100},{100,100}],b:[{150,100},{50,100}]=>p1:{150,100},p2:{50,100}
                    // a:[{150,100},{100,100}],b:[{200,100},{50,100}]=>p1:{150,100},p2:{50,100}
                    // else {
                    //     const b1x: number = Helper2D.max(b1.x, b2.x);
                    //     const b2x: number = Helper2D.min(b1.x, b2.x);
                    //     info.p1.assign(Helper2D.min(a1.x, b1x), a1.y);
                    //     info.p2.assign(b2x, a1.y);
                    // }
                    info.type = CrossTypeEnum.OVERLAP;
                }
                else {
                    info.type = CrossTypeEnum.NONE;
                }
            }
            else if (isLineBetweenPoints(b1, b, a1, a2, info) && isLineBetweenPoints(a1, a, b1, b2, info)) {
                // out.type = CrossTypeEnum.CROSS;
            }
            else {
                info.type = CrossTypeEnum.NONE;
            }
            if (info.type === CrossTypeEnum.NONE) {
                return false;
            }
            else {
                return true;
            }
        }

        /**
         * 判断点p1和p2是否在线段ab两侧
         * @a: 线段ab上的一个点
         * @ab: 线段的方向向量
         * @p1,p2: 需要判断的两个点
         * @info: 相交信息
         * 思路：将点a,p1,p2沿ab方线投射到x或y轴，若点a的投影在ab中间，则返回true，否则返回false
         */
        export function isLineBetweenPoints(a: IVector2D, ab: IVector2D, p1: IVector2D, p2: IVector2D, info: ICrossInfo2D): boolean {
            // 若向量ab的x为0，则说明ab垂直于x轴，此时点的投影线必定与y轴平行，故可直接比较三个点的x值
            if (ab.x === 0) {
                // DrawAPI2D.drawLine(new Vector2D(a.x, 0), a, "#00FFFF");
                // DrawAPI2D.drawLine(new Vector2D(p1.x, 0), p1, "#00FFFF");
                // DrawAPI2D.drawLine(new Vector2D(p2.x, 0), p2, "#00FFFF");
                return isInRange(a.x, p1.x, p2.x);
            }
            // 若向量ab的y为0，则说明ab垂直于y轴，此时点的投影线必定与x轴平行，故可直接比较三个点的y值
            else if (ab.y === 0) {
                // DrawAPI2D.drawLine(new Vector2D(0, a.y), a, "#00FFFF");
                // DrawAPI2D.drawLine(new Vector2D(0, p1.y), p1, "#00FFFF");
                // DrawAPI2D.drawLine(new Vector2D(0, p2.y), p2, "#00FFFF");
                return isInRange(a.y, p1.y, p2.y);
            }
            else {
                const k: number = ab.y / ab.x;
                // 若k>-1且小于1，则应当将点投影到y轴上，此时可直接比较投影线在y轴上的截距, y=kx+b=>b=y-kx;
                if (k > -1 && k < 1) {
                    const b: number = a.y - k * a.x;
                    const p1b: number = p1.y - k * p1.x;
                    const p2b: number = p2.y - k * p2.x;
                    // DrawAPI2D.drawLine(new Vector2D(0, b), a, "#00FFFF");
                    // DrawAPI2D.drawLine(new Vector2D(0, p1b), p1, "#00FFFF");
                    // DrawAPI2D.drawLine(new Vector2D(0, p2b), p2, "#00FFFF");
                    return isInRange(b, p1b, p2b) && makeCrossInfo(b, p1b, p2b, p1, p2, info);
                }
                // 否则应当将点投影到x轴上，此时可直接比较投影线在x轴上的截距, x=my+n=>n=x-my;
                else {
                    const m: number = ab.x / ab.y;
                    const n: number = a.x - m * a.y;
                    const p1n: number = p1.x - m * p1.y;
                    const p2n: number = p2.x - m * p2.y;
                    // DrawAPI2D.drawLine(new Vector2D(n, 0), a, "#00FFFF");
                    // DrawAPI2D.drawLine(new Vector2D(p1n, 0), p1, "#00FFFF");
                    // DrawAPI2D.drawLine(new Vector2D(p2n, 0), p2, "#00FFFF");
                    return isInRange(n, p1n, p2n) && makeCrossInfo(n, p1n, p2n, p1, p2, info);
                }
            }
        }

        /**
         * 判断x是否在a与b之间
         */
        export function isInRange(x: number, a: number, b: number): boolean {
            if (a < b) {
                return a <= x && x <= b;
            }
            else {
                return b <= x && x <= a;
            }
        }

        /**
         * 计算交叉点信息
         */
        function makeCrossInfo(k: number, k1: number, k2: number, p1: IVector2D, p2: IVector2D, info: ICrossInfo2D): boolean {
            if (info !== null && info.type === CrossTypeEnum.NONE) {
                info.p = new Vector2D(p2.x - p1.x, p2.y - p1.y).mul((k - k1) / (k2 - k1)).add(p1);
                info.type = CrossTypeEnum.CROSS;
            }
            return true;
        }
    }
}