
module world2d {

    export class TestWorld2dStableCircle extends TestWorld2dShap {

        constructor() {
            super(CollisionLayerEnum.CIRCLE);
        }

        protected $createCollider(): ICollider2D {
            return new ColliderCircle2D(80);
        }

        protected $createCollision(): ICollision2D {
            return new CollisionCircle2D(80);
        }

        protected $onEnterFrame(): void {
            this.$transform.setRotation(this.$transform.getRotation() + this.$rotation);
            super.$onEnterFrame();
        }
    }
}