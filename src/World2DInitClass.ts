
module world2d {

    export class World2DIniClass {

        private $image: Laya.Image = new Laya.Image();
        private $world: world2d.IWorld2D;

        private $direction: IVector2D = new Vector2D(1, 0);

        constructor() {
            this.$world = new world2d.World2D(this.$image.graphics);
            Global.world2d = this.$world;

            let count: number = 1;

            // const a: TestWorld2dStableCircle = new TestWorld2dStableCircle();
            // const b: TestWorld2dStableRectangle = new TestWorld2dStableRectangle();

            for (let i = 0; i < count; i++) {
                new TestWorld2dCircle().transform.moveTo(200, 200);
            }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRectangle();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRectangle2();
            // }

            // for (let i = 0; i < count; i++) {
            //     const x = new TestWorld2dTriangle();
            //     x.transform.rigidbody.target = circle.transform;
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dTriangle2();
            // }

            for (let i = 0; i < count; i++) {
                const triangle = new TestWorld2dRightTriangle();
                triangle.transform.moveTo(400, 200);
                triangle.transform.setRotation(60);
            }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRightTriangle2();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dPolygonRectangle();
            // }

            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dPolygonRectangle2();
            // }

            for (let i = 0; i < count; i++) {
                const polygon = new TestWorld2dPolygon();
                polygon.transform.moveTo(350, 450);
                polygon.transform.setRotation(20);
            }

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
            world2d.Physics.raycast(new Vector2D(400, 300), this.$direction, 250, CollisionLayerEnum.DEFAULT);
        }
    }
}