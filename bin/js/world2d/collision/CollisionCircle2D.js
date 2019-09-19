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
     * 圆形碰撞区域（效率最高）
     */
    var CollisionCircle2D = /** @class */ (function (_super) {
        __extends(CollisionCircle2D, _super);
        function CollisionCircle2D(radius) {
            var _this = _super.call(this, world2d.CollisionShapEnum2D.CIRCLE) || this;
            // 默认半径
            _this.radius = radius;
            return _this;
        }
        /**
         * 更新矩形区域
         */
        CollisionCircle2D.prototype.updateBounds = function () {
            this.bounds.updateBounds(this.x - this.radius, this.x + this.radius, this.y - this.radius, this.y + this.radius);
        };
        return CollisionCircle2D;
    }(world2d.Collision2D));
    world2d.CollisionCircle2D = CollisionCircle2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=CollisionCircle2D.js.map