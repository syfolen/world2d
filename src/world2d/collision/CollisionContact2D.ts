
module world2d {

    export class CollisionContact2D implements ICollisionContact2D {
        /**
         * 是否使用box2d的碰撞算法
         * NOTE: box2d中的碰撞算法效率很高，但并不精确
         */
        useBox2d: boolean = false;

        /**
         * 是否检测包围盒
         */
        private $testAABB: boolean = true;

        /**
         * 碰撞检测函数
         */
        private $testFunc: Function;

        /**
         * 对象 a
         */
        private $a: ITransform2D;

        /**
         * 对象 b
         */
        private $b: ITransform2D;

        /**
         * 相撞标记
         */
        private $touching: boolean = false;

        constructor(a: ITransform2D, b: ITransform2D) {
            if (a.collision.shap === CollisionShapEnum2D.CIRCLE) {
                this.$a = a;
                this.$b = b;
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2c;
                    // 圆对圆不需要检测包围盒
                    this.$testAABB = false;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    this.$testFunc = this.$c2r;
                }
                else {
                    this.$testFunc = this.$c2p;
                }
            }
            else if (a.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$a = b;
                    this.$b = a;
                    this.$testFunc = this.$c2r;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    this.$a = a;
                    this.$b = b;
                    this.$testFunc = this.$r2r;
                    // 矩型对矩型不需要检测包围盒
                    this.$testAABB = false;
                }
                else {
                    this.$a = a;
                    this.$b = b;
                    this.$testFunc = this.$r2p;
                }
            }
            else {
                this.$a = b;
                this.$b = a;
                if (b.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    this.$testFunc = this.$c2p;
                }
                else if (b.collision.shap === CollisionShapEnum2D.RECTANGLE) {
                    this.$testFunc = this.$r2p;
                }
                else {
                    this.$testFunc = this.$p2p;
                }
            }
        }

        /**
         * 检测是否相撞
         */
        test(): void {
            const a: ITransform2D = this.$a;
            const b: ITransform2D = this.$b;

            let collide: boolean = this.$testAABB == false ? true : CollisionResolution2D.bounds2Bounds(a.bounds, b.bounds);

            // 若包围盒发生碰撞，则继续检测
            if (collide === true) {
                collide = this.$testFunc.call(this, a.collision, b.collision);
            }

            if (collide === true) {
                if (this.$touching === false) {
                    this.$touching = true;
                    a.hitNum++;
                    b.hitNum++;
                    this.doCollide(CollisionType.COLLISION_ENTER);
                }
                else {
                    this.doCollide(CollisionType.COLLISION_STAY);
                }
            }
            else if (this.$touching === true) {
                this.$touching = false;
                a.hitNum--;
                b.hitNum--;
                this.doCollide(CollisionType.COLLISION_EXIT);
            }
        }

        doCollide(type: CollisionType): void {
            const a: ITransform2D = this.$a;
            const b: ITransform2D = this.$b;

            if (type === CollisionType.COLLISION_ENTER) {
                a.onCollisionEnter(b);
                b.onCollisionEnter(a);
            }
            else if (type === CollisionType.COLLISION_EXIT) {
                a.onCollisionExit(b);
                b.onCollisionExit(a);
            }
            else {
                a.onCollisionStay(b);
                b.onCollisionStay(a);
            }
        }

        /**
         * 圆与圆
         */
        private $c2c(a: ICollisionCircle2D, b: ICollisionCircle2D): boolean {
            return CollisionResolution2D.circle2Circle(a, b);
        }

        /**
         * 矩型与圆
         */
        private $c2r(c: ICollisionCircle2D, r: ICollisionRectangle2D): boolean {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.circle2Polygon(new Vector2D(c.x, c.y), c.radius, r.vertexs);
            }
            return CollisionResolution2D.circle2Polygin(c, r);
        }

        /**
         * 多边型与圆
         */
        private $c2p(c: ICollisionCircle2D, p: ICollisionPolygon2D): boolean {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.circle2Polygon(new Vector2D(c.x, c.y), c.radius, p.vertexs);
            }
            return CollisionResolution2D.circle2Polygin(c, p);
        }

        /**
         * 矩型与矩型
         */
        private $r2r(): boolean {
            // 直接返回边框的碰撞结果
            return CollisionResolution2D.bounds2Bounds(this.$a.bounds, this.$b.bounds);
        }

        /**
         * 矩型与多边型
         */
        private $r2p(r: ICollisionRectangle2D, p: ICollisionPolygon2D): boolean {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.polygon2Polygon(r.vertexs, p.vertexs);
            }
            return CollisionResolution2D.polygon2Vertexs(p, r.vertexs);
        }

        /**
         * 多边形与多边形
         */
        private $p2p(p1: ICollisionPolygon2D, p2: ICollisionPolygon2D): boolean {
            if (this.useBox2d === true) {
                return CollisionResolutionBox2D.polygon2Polygon(p1.vertexs, p2.vertexs);
            }
            return CollisionResolution2D.polygon2Vertexs(p1, p2.vertexs) && CollisionResolution2D.polygon2Vertexs(p2, p1.vertexs);
        }

        get a(): ITransform2D {
            return this.$a;
        }

        get b(): ITransform2D {
            return this.$b;
        }

        /**
         * 相撞标记
         */
        get touching(): boolean {
            return this.$touching;
        }
    }
}