
module test {

    export class TestWorld2dRectangle2 extends TestWorld2dShap {

        constructor() {
            super(world2d.CollisionLayerEnum.RECTANLE);
        }

        protected $createCollider(): world2d.ICollider2D {
            return new world2d.ColliderPolygon2D([
                new world2d.Vector2D(-this.$width * 0.5, -this.$height * 0.5),
                new world2d.Vector2D(-this.$width * 0.5, this.$height * 0.5),
                new world2d.Vector2D(this.$width * 0.5, this.$height * 0.5),
                new world2d.Vector2D(this.$width * 0.5, -this.$height * 0.5)
            ]);
        }

        protected $createCollision(): world2d.ICollision2D {
            return new world2d.CollisionRectangle2D();
        }

        protected $onEnterFrame(): void {
            this.$transform.setRotation(this.$transform.getRotation() + this.$rotation);
            super.$onEnterFrame();
        }
    }
}