
module test {

    export class TestWorld2dPolygon extends TestWorld2dShap {

        constructor() {
            super(world2d.CollisionLayerEnum.POLYGON);
        }

        protected $createCollider(): world2d.ICollider2D {
            return new world2d.ColliderPolygon2D([
                new world2d.Vector2D(-this.$width, 0),
                new world2d.Vector2D(-this.$width * 0.5, this.$height * 0.5),
                new world2d.Vector2D(0, this.$height * 0.8),
                new world2d.Vector2D(this.$width, 0),
                new world2d.Vector2D(this.$width * 0.5, -this.$height * 0.5),
                new world2d.Vector2D(0, -this.$height),
                new world2d.Vector2D(-this.$width * 0.5, -this.$height),
            ]);
        }

        protected $createCollision(): world2d.ICollision2D {
            return new world2d.CollisionPolygon2D(this.$collider as world2d.IColliderPolygon2D);
        }
    }
}