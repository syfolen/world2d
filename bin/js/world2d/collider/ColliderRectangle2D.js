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
    var ColliderRectangle2D = /** @class */ (function (_super) {
        __extends(ColliderRectangle2D, _super);
        function ColliderRectangle2D(width, height) {
            var _this = _super.call(this, world2d.ColliderShapEnum2D.RECTANGLE) || this;
            _this.width = width;
            _this.height = height;
            return _this;
        }
        /**
         * 克隆
         */
        ColliderRectangle2D.prototype.clone = function () {
            return new ColliderRectangle2D(this.width, this.height);
        };
        return ColliderRectangle2D;
    }(world2d.Collider2D));
    world2d.ColliderRectangle2D = ColliderRectangle2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=ColliderRectangle2D.js.map