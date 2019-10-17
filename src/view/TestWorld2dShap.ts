
module world2d {

    export abstract class TestWorld2dShap implements world2d.IEntity<TestWorld2dShap> {

        protected $collider: ICollider2D;
        protected $collision: ICollision2D;
        protected $transform: ITransform2D<TestWorld2dShap>;

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

            let rigidbody: IRigidbody2D<TestWorld2dShap> = this.$createRigidbody();

            if (rigidbody === null) {
                rigidbody = new Rigidbody2D<TestWorld2dShap>();
                rigidbody.torque = 5;
            }

            this.$transform = new Transform2D<TestWorld2dShap>(this, this.$collider, rigidbody, this.$collision);
            this.$transform.moveTo(this.$posX, this.$posY);

            const world: IWorld2D<TestWorld2dShap> = Global.world2d;
            world.addTransform(this.$transform, world2d.CollisionLayerEnum.DEFAULT);

            Laya.timer.frameLoop(1, this, this.$onEnterFrame);
        }

        protected $createRigidbody(): IRigidbody2D<TestWorld2dShap> {
            return null;
        }

        protected abstract $createCollider(): ICollider2D;

        protected abstract $createCollision(): ICollision2D;

        protected $onEnterFrame(): void {
            // if (this.$transform.x < 0) {
            //     this.$transform.rigidbody.velocity.x = Math.abs(this.$transform.rigidbody.velocity.x);
            // }
            // else if (this.$transform.x > Global.WIDTH) {
            //     this.$transform.rigidbody.velocity.x = -Math.abs(this.$transform.rigidbody.velocity.x);
            // }
            // if (this.$transform.y < 0) {
            //     this.$transform.rigidbody.velocity.y = Math.abs(this.$transform.rigidbody.velocity.y);
            // }
            // else if (this.$transform.y > Global.HEIGHT) {
            //     this.$transform.rigidbody.velocity.y = -Math.abs(this.$transform.rigidbody.velocity.y);
            // }

            // this.$transform.scaleBy(this.$scale);
            // if (this.$transform.scale > 1.5 && this.$scale > 0) {
            //     this.$scale = -0.01;
            // }
            // else if (this.$transform.scale < 1 && this.$scale < 0) {
            //     this.$scale = 0.01;
            // }
        }

        /**
         * 碰撞产生
         */
        onCollisionEnter(other: IEntity<TestWorld2dShap>): void {

        }

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        onCollisionStay(other: IEntity<TestWorld2dShap>): void {

        }

        /**
         * 碰撞结束
         */
        onCollisionExit(other: IEntity<TestWorld2dShap>): void {

        }

        /**
         * 物理数据转换器
         */
        get transform(): ITransform2D<TestWorld2dShap> {
            return this.$transform;
        }
    }
}