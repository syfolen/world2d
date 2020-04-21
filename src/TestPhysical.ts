
class TestPhysical {

    private $image: Laya.Image = new Laya.Image();
    private $world: world2d.IWorld2D;

    private $direction: world2d.IVector2D = new world2d.Vector2D(1, 0);

    constructor() {
        this.$world = new world2d.World2D(this.$image.graphics);
        Global.world2d = this.$world;

        new test.TestWorld2dCircle().transform.moveTo(200, 200);

        const triangle = new test.TestWorld2dRightTriangle();
        triangle.transform.moveTo(400, 150);
        triangle.transform.setRotation(60);

        const polygon = new test.TestWorld2dPolygon();
        polygon.transform.moveTo(350, 450);
        polygon.transform.setRotation(20);

        Laya.stage.addChild(this.$image);
        world2d.DrawAPI2D.graphics = this.$image.graphics;

        Laya.timer.frameLoop(1, this, this.$onEnterFrame);
    }

    private $onEnterFrame(): void {
        world2d.DrawAPI2D.clear();
        this.$world.update(Laya.timer.delta / 1000);

        this.$direction.rotate(Math.PI / 180 * 0.5);
        world2d.Physics2D.raycast(new world2d.Vector2D(380, 320), this.$direction, 250, world2d.CollisionLayerEnum.DEFAULT);
    }
}