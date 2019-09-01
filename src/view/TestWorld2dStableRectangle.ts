
module world2d {

    export class TestWorld2dStableRectangle extends TestWorld2dShap {

        constructor() {
            super(CollisionLayerEnum.RECTANLE);
        }

        protected $createCollider(): ICollider2D {
            return new ColliderPolygon2D(115, 195, [
                new Vector2D(-30, -30),
                new Vector2D(30, -30),
                new Vector2D(30, 30),
                new Vector2D(-30, 30)
            ]);
        }

        protected $createCollision(): ICollision2D {
            return new CollisionRectangle2D();
        }
    }
}