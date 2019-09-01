
module world2d {

    export abstract class TestWorld2dShap {

        protected $collider: ICollider2D;
        protected $collision: ICollision2D;
        protected $transform: ITransform2D;

        get transform(): ITransform2D {
            return this.$transform;
        }

        protected $posX: number = Math.random() * Global.WIDTH;
        protected $posY: number = Math.random() * Global.HEIGHT;

        protected $speedX: number = Math.random() * 40 - 20;
        protected $speedY: number = Math.random() * 40 - 20;

        protected $radius: number = Math.random() * 50 + 50;

        protected $width: number = Math.random() * 50 + 50;
        protected $height: number = Math.random() * 50 + 50;

        protected $rotation: number = Math.random() * 2 - 1;

        protected $scale: number = 0.01;

        constructor(layer: CollisionLayerEnum) {
            this.$collider = this.$createCollider();
            this.$collision = this.$createCollision();

            const rigidbody: IRigidbody2D = new Rigidbody2D();
            rigidbody.velocity = new Vector2D(this.$speedX, this.$speedY);

            this.$transform = new Transform2D(this.$collider, rigidbody, this.$collision);

            const world: IWorld2D = Global.world2d;
            world.addTransform(this.$transform, world2d.CollisionLayerEnum.DEFAULT);

            Laya.timer.frameLoop(1, this, this.$onEnterFrame);
        }

        protected abstract $createCollider(): ICollider2D;

        protected abstract $createCollision(): ICollision2D;

        protected $onEnterFrame(): void {
            if (this.$transform.x < 0) {
                this.$transform.rigidbody.velocity.x = Math.abs(this.$transform.rigidbody.velocity.x);
            }
            else if (this.$transform.x > Global.WIDTH) {
                this.$transform.rigidbody.velocity.x = -Math.abs(this.$transform.rigidbody.velocity.x);
            }
            if (this.$transform.y < 0) {
                this.$transform.rigidbody.velocity.y = Math.abs(this.$transform.rigidbody.velocity.y);
            }
            else if (this.$transform.y > Global.HEIGHT) {
                this.$transform.rigidbody.velocity.y = -Math.abs(this.$transform.rigidbody.velocity.y);
            }

            // this.$transform.scaleBy(this.$scale);
            // if (this.$transform.scale > 1.5 && this.$scale > 0) {
            //     this.$scale = -0.01;
            // }
            // else if (this.$transform.scale < 1 && this.$scale < 0) {
            //     this.$scale = 0.01;
            // }
        }
    }
}