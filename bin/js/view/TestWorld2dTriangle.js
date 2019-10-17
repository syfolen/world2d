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
    var TestWorld2dTriangle = /** @class */ (function (_super) {
        __extends(TestWorld2dTriangle, _super);
        function TestWorld2dTriangle() {
            return _super.call(this, world2d.CollisionLayerEnum.POLYGON) || this;
        }
        TestWorld2dTriangle.prototype.$createCollider = function () {
            return new world2d.ColliderPolygon2D([
                // new Vector2D(-this.$width * 0.5, this.$height * 0.5),
                // new Vector2D(-this.$width * 0.5, this.$height * 0.5 - 15),
                // new Vector2D(this.$width * 0.5, -this.$height * 0.5)
                new world2d.Vector2D(0, -10),
                new world2d.Vector2D(0, 10),
                new world2d.Vector2D(50, 0)
            ]);
        };
        TestWorld2dTriangle.prototype.$createRigidbody = function () {
            var rigidbody = new world2d.Rigidbody2D();
            rigidbody.torque = 10;
            rigidbody.moveSpeed = 20;
            return rigidbody;
        };
        TestWorld2dTriangle.prototype.$onEnterFrame = function () {
        };
        TestWorld2dTriangle.prototype.$createCollision = function () {
            return new world2d.CollisionPolygon2D(this.$collider);
        };
        return TestWorld2dTriangle;
    }(world2d.TestWorld2dShap));
    world2d.TestWorld2dTriangle = TestWorld2dTriangle;
})(world2d || (world2d = {}));
//# sourceMappingURL=TestWorld2dTriangle.js.map