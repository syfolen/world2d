
class TestPhysical {

    private $image: Laya.Image = new Laya.Image();
    private $world: world2d.IWorld2D;

    private $direction: world2d.IVector2D = new world2d.Vector2D(1, 0);

    constructor() {
        this.$world = new world2d.World2D(this.$image.graphics);
        Global.world2d = this.$world;

        // new test.TestWorld2dCircle().transform.moveTo(200, 200);

        // const triangle = new test.TestWorld2dRightTriangle();
        // triangle.transform.moveTo(400, 150);
        // triangle.transform.setRotation(60);

        // const polygon = new test.TestWorld2dPolygon();
        // polygon.transform.moveTo(350, 450);
        // polygon.transform.setRotation(20);

        Laya.stage.addChild(this.$image);
        world2d.DrawAPI2D.graphics = this.$image.graphics;

        Laya.timer.frameLoop(1, this, this.$onEnterFrame);
    }

    private $onEnterFrame(): void {
        world2d.DrawAPI2D.clear();
        this.$world.update(Laya.timer.delta / 1000);

        // this.$direction.rotate(Math.PI / 180);
        // world2d.Physics2D.raycast(new world2d.Vector2D(380, 320), this.$direction, 250, world2d.CollisionLayerEnum.DEFAULT);

        const s1: world2d.ISegment2D = new world2d.Segment2D();
        s1.assign(new world2d.Vector2D(100, 50), new world2d.Vector2D(100, 100));
        world2d.DrawAPI2D.drawLine(s1.a, s1.b, "#FF0000");

        const s2: world2d.ISegment2D = new world2d.Segment2D();
        s2.assign(new world2d.Vector2D(100, 150), new world2d.Vector2D(100, 200));
        world2d.DrawAPI2D.drawLine(s2.a, s2.b, "#FF0000");

        const out: world2d.ICrossInfo2D = {
            p: new world2d.Vector2D(0, 0),
            ok: false
        };
        if (world2d.CollisionResolution2D.line2Line(s1.ab, s1.a, s1.b, s2.ab, s2.a, s2.b, out) === true) {
            world2d.DrawAPI2D.drawLine(s1.a, s1.b, "#00FF00");
        }
        else {
            world2d.DrawAPI2D.drawLine(s1.a, s1.b, "#FF0000");
        }
    }
}