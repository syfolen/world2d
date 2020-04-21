
module test {

    export class TestWorld2dStableRectangle extends TestWorld2dShap {

        constructor() {
            super(world2d.CollisionLayerEnum.RECTANLE);
        }

        protected $createCollider(): world2d.ICollider2D {
            return new world2d.ColliderPolygon2D([
                new world2d.Vector2D(-30, -30),
                new world2d.Vector2D(30, -30),
                new world2d.Vector2D(30, 30),
                new world2d.Vector2D(-30, 30)
            ]);
        }

        protected $createCollision(): world2d.ICollision2D {
            return new world2d.CollisionRectangle2D();
        }
    }
}