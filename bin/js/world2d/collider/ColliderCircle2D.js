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
    /**
     * 圆形对撞机
     * export
     */
    var ColliderCircle2D = /** @class */ (function (_super) {
        __extends(ColliderCircle2D, _super);
        /**
         * export
         */
        function ColliderCircle2D(radius) {
            var _this = _super.call(this, world2d.ColliderShapEnum2D.CIRCLE) || this;
            _this.radius = radius;
            return _this;
        }
        /**
         * 克隆
         */
        ColliderCircle2D.prototype.clone = function () {
            return new ColliderCircle2D(this.radius);
        };
        return ColliderCircle2D;
    }(world2d.Collider2D));
    world2d.ColliderCircle2D = ColliderCircle2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=ColliderCircle2D.js.map