var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var world2d;
(function (world2d) {
    var TestWorld2dPolygonRectangle = /** @class */ (function (_super) {
        __extends(TestWorld2dPolygonRectangle, _super);
        function TestWorld2dPolygonRectangle() {
            return _super.call(this, world2d.CollisionLayerEnum.POLYGON) || this;
        }
        TestWorld2dPolygonRectangle.prototype.$createCollider = function () {
            return new world2d.ColliderPolygon2D(this.$posX, this.$posY, [
                new world2d.Vector2D(-this.$width * 0.5, -this.$height * 0.5),
                new world2d.Vector2D(-this.$width * 0.5, this.$height * 0.5),
                new world2d.Vector2D(this.$width * 0.5, this.$height * 0.5),
                new world2d.Vector2D(this.$width * 0.5, -this.$height * 0.5)
            ]);
        };
        TestWorld2dPolygonRectangle.prototype.$createCollision = function () {
            return new world2d.CollisionPolygon2D(this.$collider);
        };
        return TestWorld2dPolygonRectangle;
    }(world2d.TestWorld2dShap));
    world2d.TestWorld2dPolygonRectangle = TestWorld2dPolygonRectangle;
})(world2d || (world2d = {}));
//# sourceMappingURL=TestWorld2dPolygonRectangle.js.map