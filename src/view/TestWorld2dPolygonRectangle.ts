
module world2d {

    export class TestWorld2dPolygonRectangle extends TestWorld2dShap {

        constructor() {
            super(CollisionLayerEnum.POLYGON);
        }

        protected $createCollider(): ICollider2D {
            return new ColliderPolygon2D([
                new Vector2D(-this.$width * 0.5, -this.$height * 0.5),
                new Vector2D(-this.$width * 0.5, this.$height * 0.5),
                new Vector2D(this.$width * 0.5, this.$height * 0.5),
                new Vector2D(this.$width * 0.5, -this.$height * 0.5)
            ]);
        }

        protected $createCollision(): ICollision2D {
            return new CollisionPolygon2D(this.$collider as IColliderPolygon2D);
        }
    }
}