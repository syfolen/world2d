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
     * 多边形对撞机
     */
    var ColliderPolygon2D = /** @class */ (function (_super) {
        __extends(ColliderPolygon2D, _super);
        /**
         * @vertexs: 原始顶点数据
         */
        function ColliderPolygon2D(x, y, vertexs) {
            var _this = _super.call(this, x, y, world2d.ColliderShapEnum2D.POLYGON) || this;
            _this.vertexs = vertexs;
            return _this;
        }
        /**
         * 变形
         */
        ColliderPolygon2D.prototype.scale = function (value) {
            for (var i = 0; i < this.vertexs.length; i++) {
                this.vertexs[i].mul(value);
            }
        };
        /**
         * 旋转
         */
        ColliderPolygon2D.prototype.rotate = function (angle) {
            for (var i = 0; i < this.vertexs.length; i++) {
                this.vertexs[i].rotate(angle);
            }
        };
        /**
         * 更新顶点数据
         * NOTE: 此更新并不会触发collision的刷新
         */
        ColliderPolygon2D.prototype.updateVertexs = function (vertexs) {
            for (var i = 0; i < vertexs.length; i++) {
                var vertex = vertexs[i];
                this.vertexs[i].assign(vertex.x, vertex.y);
            }
        };
        /**
         * 克隆
         */
        ColliderPolygon2D.prototype.clone = function () {
            var vertexs = [];
            for (var i = 0; i < this.vertexs.length; i++) {
                vertexs.push(this.vertexs[i].copy());
            }
            return new ColliderPolygon2D(this.x, this.y, vertexs);
        };
        return ColliderPolygon2D;
    }(world2d.Collider2D));
    world2d.ColliderPolygon2D = ColliderPolygon2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=ColliderPolygon2D.js.map