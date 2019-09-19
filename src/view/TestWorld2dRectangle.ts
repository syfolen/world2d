
module world2d {

    export class TestWorld2dRectangle extends TestWorld2dShap {

        constructor() {
            super(CollisionLayerEnum.RECTANLE);
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
            return new CollisionRectangle2D();
        }
    }
}