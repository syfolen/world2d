
module test {

    export abstract class TestWorld2dShap implements world2d.IEntity {

        protected $collider: world2d.ICollider2D;
        protected $collision: world2d.ICollision2D;
        protected $transform: world2d.ITransform2D;

        protected $posX: number = Math.random() * Global.WIDTH;
        protected $posY: number = Math.random() * Global.HEIGHT;

        protected $speedX: number = Math.random() * 40 - 20;
        protected $speedY: number = Math.random() * 40 - 20;

        protected $radius: number = Math.random() * 50 + 50;
        // protected $radius: number = 100;

        protected $width: number = Math.random() * 50 + 50;
        protected $height: number = Math.random() * 50 + 50;

        protected $rotation: number = Math.random() * 2 - 1;

        protected $scale: number = 0.01;

        constructor(layer: world2d.CollisionLayerEnum) {
            this.$collider = this.$createCollider();
            this.$collision = this.$createCollision();

            let rigidbody: world2d.IRigidbody2D = this.$createRigidbody();

            if (rigidbody === null) {
                rigidbody = new world2d.Rigidbody2D();
                rigidbody.torque = 5;
                rigidbody.moveSpeed = suncom.Common.random(30, 100) * (Math.random() < 0.5 ? -1 : 1);
            }

            this.$transform = new world2d.Transform2D(this, this.$collider, rigidbody, this.$collision);
            this.$transform.moveTo(this.$posX, this.$posY);

            const world: world2d.IWorld2D = Global.world2d;
            world.addTransform(this.$transform, world2d.CollisionLayerEnum.FISH);

            Laya.timer.frameLoop(1, this, this.$onEnterFrame);
        }

        protected $createRigidbody(): world2d.IRigidbody2D {
            return null;
        }

        protected abstract $createCollider(): world2d.ICollider2D;

        protected abstract $createCollision(): world2d.ICollision2D;

        protected $onEnterFrame(): void {
            if (this.$transform.x < 0) {
                this.$transform.moveTo(Global.WIDTH, this.$transform.y);
            }
            else if (this.$transform.x > Global.WIDTH) {
                this.$transform.moveTo(0, this.$transform.y);
            }
            if (this.$transform.y < 0) {
                this.$transform.moveTo(this.$transform.x, Global.HEIGHT);
            }
            else if (this.$transform.y > Global.HEIGHT) {
                this.$transform.moveTo(this.$transform.x, 0);
            }

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
        onCollisionEnter(other: world2d.IEntity): void {

        }

        /**
         * 碰撞产生后，结束前，每次计算碰撞结果后调用
         */
        onCollisionStay(other: world2d.IEntity): void {

        }

        /**
         * 碰撞结束
         */
        onCollisionExit(other: world2d.IEntity): void {

        }

        /**
         * 物理数据转换器
         */
        get transform(): world2d.ITransform2D {
            return this.$transform;
        }
    }
}