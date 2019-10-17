var world2d;
(function (world2d) {
    var World2DIniClass = /** @class */ (function () {
        function World2DIniClass() {
            this.$image = new Laya.Image();
            this.$direction = new world2d.Vector2D(1, 0);
            this.$world = new world2d.World2D(this.$image.graphics);
            Global.world2d = this.$world;
            var count = 1;
            // const a: TestWorld2dStableCircle = new TestWorld2dStableCircle();
            // const b: TestWorld2dStableRectangle = new TestWorld2dStableRectangle();
            var circle = null;
            for (var i = 0; i < count; i++) {
                circle = new world2d.TestWorld2dCircle();
            }
            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRectangle();
            // }
            // for (let i = 0; i < count; i++) {
            //     new TestWorld2dRectangle2();
            // }
            for (var i = 0; i < count; i++) {
                var x = new world2d.TestWorld2dTriangle();
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
            world2d.DrawAPI2D.graphics = this.$image.graphics;
            Laya.timer.frameLoop(1, this, this.$onEnterFrame);
        }
        World2DIniClass.prototype.$onEnterFrame = function () {
            world2d.DrawAPI2D.clear();
            this.$world.update(Laya.timer.delta / 1000);
            this.$direction.rotate(Math.PI / 180);
            world2d.Physics.raycast(new world2d.Vector2D(500, 300), this.$direction, 300, world2d.CollisionLayerEnum.ALL);
        };
        return World2DIniClass;
    }());
    world2d.World2DIniClass = World2DIniClass;
})(world2d || (world2d = {}));
//# sourceMappingURL=World2DInitClass.js.map