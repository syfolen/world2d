
module world2d {

    export class TestWorld2dCircle extends TestWorld2dShap {

        constructor() {
            super(CollisionLayerEnum.CIRCLE);
        }

        protected $createCollider(): ICollider2D {
            return new ColliderCircle2D(this.$posX, this.$posY, this.$radius);
        }

        protected $createCollision(): ICollision2D {
            return new CollisionCircle2D(this.$radius);
        }

        protected $onEnterFrame(): void {
            this.$transform.setRotation(this.$transform.getRotation() + this.$rotation);
            super.$onEnterFrame();
        }
    }
}