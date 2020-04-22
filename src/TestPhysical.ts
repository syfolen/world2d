
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

        new test.TestWorld2dStableCircle();
        
        new test.TestWorld2dStableRectangle();

        new test.TestWorld2dCircle();

        new test.TestWorld2dRectangle();

        new test.TestWorld2dRectangle2();

        new test.TestWorld2dTriangle();

        new test.TestWorld2dTriangle2();

        new test.TestWorld2dRightTriangle();

        new test.TestWorld2dRightTriangle2();

        new test.TestWorld2dPolygonRectangle();

        new test.TestWorld2dPolygonRectangle2();

        new test.TestWorld2dPolygon();

        new test.TestWorld2dPolygon2();

        Laya.stage.addChild(this.$image);
        world2d.DrawAPI2D.graphics = this.$image.graphics;

        Laya.timer.frameLoop(1, this, this.$onEnterFrame);
    }

    private $onEnterFrame(): void {
        world2d.DrawAPI2D.clear();
        this.$world.update(Laya.timer.delta / 1000);

        this.$direction.rotate(Math.PI / 180);
        world2d.Physics2D.raycast(new world2d.Vector2D(380, 320), this.$direction, 250, world2d.CollisionLayerEnum.FISH);

        // const s1: world2d.ISegment2D = new world2d.Segment2D();
        // s1.assign(new world2d.Vector2D(100, 100), new world2d.Vector2D(400, 100));
        // world2d.DrawAPI2D.drawLine(s1.a, s1.b, "#FF0000");

        // const s2: world2d.ISegment2D = new world2d.Segment2D();
        // s2.assign(new world2d.Vector2D(150, 50), new world2d.Vector2D(350, 150));
        // world2d.DrawAPI2D.drawLine(s2.a, s2.b, "#FF0000");

        // const out: world2d.ICrossInfo2D = {
        //     p: new world2d.Vector2D(0, 0),
        //     // p1: new world2d.Vector2D(0, 0),
        //     // p2: new world2d.Vector2D(0, 0),
        //     type: world2d.CrossTypeEnum.NONE
        // };
        // world2d.CollisionResolution2D.line2Line(s1.ab, s1.a, s1.b, s2.ab, s2.a, s2.b, out);
        // if (out.type === world2d.CrossTypeEnum.NONE) {
        //     world2d.DrawAPI2D.drawLine(s1.a, s1.b, "#FF0000");
        // }
        // else {
        //     world2d.DrawAPI2D.drawLine(s1.a, s1.b, "#0000FF");
        //     world2d.DrawAPI2D.drawLine(s2.a, s2.b, "#0000FF");
        //     world2d.DrawAPI2D.drawLine(new world2d.Vector2D(out.p.x - 10, out.p.y), new world2d.Vector2D(out.p.x + 10, out.p.y), "#FF00FF");
        //     world2d.DrawAPI2D.drawLine(new world2d.Vector2D(out.p.x, out.p.y - 10), new world2d.Vector2D(out.p.x, out.p.y + 10), "#FF00FF");
        // }
    }
}