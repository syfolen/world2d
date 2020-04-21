
class TestShapCollide {

    private $image: Laya.Image = new Laya.Image();
    private $world: world2d.IWorld2D;

    constructor() {
        this.$world = new world2d.World2D(this.$image.graphics);
        Global.world2d = this.$world;

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
    }
}