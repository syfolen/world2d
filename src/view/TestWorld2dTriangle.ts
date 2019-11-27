
module world2d {

    export class TestWorld2dTriangle extends TestWorld2dShap {

        constructor() {
            super(CollisionLayerEnum.POLYGON);
        }

        protected $createCollider(): ICollider2D {
            return new ColliderPolygon2D([
                // new Vector2D(-this.$width * 0.5, this.$height * 0.5),
                // new Vector2D(-this.$width * 0.5, this.$height * 0.5 - 15),
                // new Vector2D(this.$width * 0.5, -this.$height * 0.5)
                new Vector2D(0, -10),
                new Vector2D(0, 10),
                new Vector2D(50, 0)
            ]);
        }

        protected $createRigidbody(): IRigidbody2D {
            const rigidbody = new Rigidbody2D();
            rigidbody.torque = 10;
            rigidbody.moveSpeed = 20;

            return rigidbody;
        }

        protected $onEnterFrame() {

        }

        protected $createCollision(): ICollision2D {
            return new CollisionPolygon2D(this.$collider as IColliderPolygon2D);
        }
    }
}