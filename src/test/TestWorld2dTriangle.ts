
module test {

    export class TestWorld2dTriangle extends TestWorld2dShap {

        constructor() {
            super(world2d.CollisionLayerEnum.POLYGON);
        }

        protected $createCollider(): world2d.ICollider2D {
            return new world2d.ColliderPolygon2D([
                // new Vector2D(-this.$width * 0.5, this.$height * 0.5),
                // new Vector2D(-this.$width * 0.5, this.$height * 0.5 - 15),
                // new Vector2D(this.$width * 0.5, -this.$height * 0.5)
                new world2d.Vector2D(0, -10),
                new world2d.Vector2D(0, 10),
                new world2d.Vector2D(50, 0)
            ]);
        }

        protected $createRigidbody(): world2d.IRigidbody2D {
            const rigidbody: world2d.IRigidbody2D = new world2d.Rigidbody2D();
            rigidbody.torque = 10;
            rigidbody.moveSpeed = 20;

            return rigidbody;
        }

        protected $onEnterFrame() {

        }

        protected $createCollision(): world2d.ICollision2D {
            return new world2d.CollisionPolygon2D(this.$collider as world2d.IColliderPolygon2D);
        }
    }
}