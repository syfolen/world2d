
module test {

    export class TestWorld2dCircle extends TestWorld2dShap {

        constructor() {
            super(world2d.CollisionLayerEnum.CIRCLE);
        }

        protected $createCollider(): world2d.ICollider2D {
            return new world2d.ColliderCircle2D(this.$radius);
        }

        protected $createCollision(): world2d.ICollision2D {
            return new world2d.CollisionCircle2D(this.$radius);
        }

        protected $onEnterFrame(): void {
            this.$transform.setRotation(this.$transform.getRotation() + this.$rotation);
            super.$onEnterFrame();
        }
    }
}