
module world2d {

    export class TestWorld2dPolygon2 extends TestWorld2dShap {

        constructor() {
            super(CollisionLayerEnum.POLYGON);
        }

        protected $createCollider(): ICollider2D {
            return new ColliderPolygon2D([
                new Vector2D(-this.$width, 0),
                new Vector2D(-this.$width * 0.5, this.$height * 0.5),
                new Vector2D(0, this.$height * 0.8),
                new Vector2D(this.$width, 0),
                new Vector2D(this.$width * 0.7, -this.$height * 0.6),
                new Vector2D(0, -this.$height),
                new Vector2D(-this.$width * 0.5, -this.$height),
            ]);
        }

        protected $createCollision(): ICollision2D {
            return new CollisionPolygon2D(this.$collider as IColliderPolygon2D);
        }

        protected $onEnterFrame(): void {
            this.$transform.setRotation(this.$transform.getRotation() + this.$rotation);
            super.$onEnterFrame();
        }
    }
}