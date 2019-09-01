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
    var TestWorld2dCircle = /** @class */ (function (_super) {
        __extends(TestWorld2dCircle, _super);
        function TestWorld2dCircle() {
            return _super.call(this, world2d.CollisionLayerEnum.CIRCLE) || this;
        }
        TestWorld2dCircle.prototype.$createCollider = function () {
            return new world2d.ColliderCircle2D(this.$posX, this.$posY, this.$radius);
        };
        TestWorld2dCircle.prototype.$createCollision = function () {
            return new world2d.CollisionCircle2D(this.$radius);
        };
        TestWorld2dCircle.prototype.$onEnterFrame = function () {
            this.$transform.setRotation(this.$transform.getRotation() + this.$rotation);
            _super.prototype.$onEnterFrame.call(this);
        };
        return TestWorld2dCircle;
    }(world2d.TestWorld2dShap));
    world2d.TestWorld2dCircle = TestWorld2dCircle;
})(world2d || (world2d = {}));
//# sourceMappingURL=TestWorld2dCircle.js.map