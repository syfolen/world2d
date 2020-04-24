
class TestPhysical {

    private $image: Laya.Image = new Laya.Image();
    private $world: world2d.IWorld2D;

    private $direction: world2d.IVector2D = new world2d.Vector2D(-1, 0);

    constructor() {
        this.$world = new world2d.World2D(this.$image.graphics);
        Global.world2d = this.$world;

        new test.TestWorld2dCircle().transform.moveTo(460, 230);

        // const triangle = new test.TestWorld2dRightTriangle();
        // triangle.transform.moveTo(400, 100);
        // triangle.transform.setRotation(60);

        // const polygon = new test.TestWorld2dPolygon();
        // polygon.transform.moveTo(350, 450);
        // polygon.transform.setRotation(20);

        // const rect = new test.TestWorld2dRectangle();
        // rect.transform.moveTo(150, 320);

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

        this.$direction.rotate(Math.PI / 180 * -0.5);

        const p: world2d.IVector2D = new world2d.Vector2D(380, 320);
        const type: world2d.RaycastTypeEnum = world2d.RaycastTypeEnum.ALL_CLOSEST;
        const layers: world2d.CollisionLayerEnum = world2d.CollisionLayerEnum.FISH;

        const array: world2d.IRaycastResult[] = world2d.Physics2D.raycast(p, this.$direction, 250, layers, type);
        if (array.length > 0 && (type === world2d.RaycastTypeEnum.CLOSEST || type === world2d.RaycastTypeEnum.ALL_CLOSEST)) {
            const res: world2d.IRaycastResult = array[0];
            world2d.DrawAPI2D.drawLine(p, res.p1, "#FFFFFF");
            world2d.DrawAPI2D.drawLine(res.p1, this.$direction.copy().normalize().mul(250).add(p), "#FF0000");
        }
        else {
            world2d.DrawAPI2D.drawLine(p, this.$direction.copy().normalize().mul(250).add(p), "#FF0000");
        }

        // if (world2d.Helper2D.r2d(this.$direction.angle()) < 45 || world2d.Helper2D.r2d(this.$direction.angle()) > 250) {
        //     this.$direction = new world2d.Vector2D(1, 0).rotate(world2d.Helper2D.d2r(45));
        // }

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