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
     * 多边型碰撞区域（效率最低）
     */
    var CollisionPolygon2D = /** @class */ (function (_super) {
        __extends(CollisionPolygon2D, _super);
        /**
         * 仅适用于多边型碰撞体
         */
        function CollisionPolygon2D(collider) {
            var _this = _super.call(this, world2d.CollisionShapEnum2D.POLYGON) || this;
            /**
             * 顶点数据
             */
            _this.vertexs = [];
            /**
             * 线段数据
             */
            _this.segments = [];
            for (var i = 0; i < collider.vertexs.length; i++) {
                var vertex = collider.vertexs[i];
                // 复制所有顶点信息作为碰撞数据
                _this.vertexs.push(new world2d.Vector2D(collider.x + vertex.x, collider.y + vertex.y));
                // 初始化线段数据
                _this.segments.push(new world2d.Vector2D(0, 0));
            }
            return _this;
        }
        /**
         * 更新顶点数据
         */
        CollisionPolygon2D.prototype.updateVertexs = function (x, y, vertexs) {
            for (var i = 0; i < vertexs.length; i++) {
                this.vertexs[i].x = x + vertexs[i].x;
                this.vertexs[i].y = y + vertexs[i].y;
            }
        };
        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        CollisionPolygon2D.prototype.prepareSegments = function () {
            for (var i = 0; i < this.vertexs.length; i++) {
                var a = this.vertexs[i];
                var b = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                this.segments[i].assign(a.x - b.x, a.y - b.y);
            }
        };
        return CollisionPolygon2D;
    }(world2d.Collision2D));
    world2d.CollisionPolygon2D = CollisionPolygon2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=CollisionPolygon2D.js.map