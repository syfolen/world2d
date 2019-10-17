
module world2d {

    export class World2DIniClass {

        private $image: Laya.Image = new Laya.Image();
        private $world: world2d.IWorld2D<IEntity<any>>;

        private $direction: IVector2D = new Vector2D(1, 0);

        constructor() {
            this.$world = new world2d.World2D(this.$image.graphics);
            Global.world2d = this.$world;

            let count: number = 1;

            // const a: TestWorld2dStableCircle = new TestWorld2dStableCircle();
            // const b: TestWorld2dStableRectangle = new TestWorld2dStableRectangle();

            let circle: TestWorld2dCircle = null;
            for (let i = 0; i < count; i++) {
                circle = new TestWorld2dCircle();
            }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRectangle();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRectangle2();
            // }

            for (let i = 0; i < count; i++) {
                const x = new TestWorld2dTriangle();
                x.transform.rigidbody.target = circle.transform;
            }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dTriangle2();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRightTriangle();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRightTriangle2();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dPolygonRectangle();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dPolygonRectangle2();
            // }

            // for (let i = 0; i < count; i++) {
            //     const item = new TestWorld2dPolygon();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dPolygon2();
            // }

            Laya.stage.addChild(this.$image);
            DrawAPI2D.graphics = this.$image.graphics;

            Laya.timer.frameLoop(1, this, this.$onEnterFrame);
        }

        private $onEnterFrame(): void {
            DrawAPI2D.clear();
            this.$world.update(Laya.timer.delta / 1000);

            this.$direction.rotate(Math.PI / 180);
            world2d.Physics.raycast(new Vector2D(500, 300), this.$direction, 300, CollisionLayerEnum.ALL);
        }
    }
}