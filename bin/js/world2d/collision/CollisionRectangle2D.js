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
     * 矩型碰撞区域（效率中等）
     */
    var CollisionRectangle2D = /** @class */ (function (_super) {
        __extends(CollisionRectangle2D, _super);
        function CollisionRectangle2D() {
            var _this = _super.call(this, world2d.CollisionShapEnum2D.RECTANGLE) || this;
            /**
             * 项点数据，当矩型与圆和多边型发生碰撞时，需要使用顶点数据
             */
            _this.vertexs = [];
            /**
             * 线段数据
             */
            _this.segments = [];
            // 初始化顶点数据
            for (var i = 0; i < 4; i++) {
                _this.vertexs.push(new world2d.Vector2D(0, 0));
                _this.segments.push(new world2d.Vector2D(0, 0));
            }
            return _this;
        }
        /**
         * 更新矩型区域
         */
        CollisionRectangle2D.prototype.updateBounds = function (left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        };
        /**
         * 准备顶点数据（为矩型计算顶点信息）
         */
        CollisionRectangle2D.prototype.prepareVertexs = function () {
            this.vertexs[0].assign(this.left, this.bottom);
            this.vertexs[1].assign(this.right, this.bottom);
            this.vertexs[2].assign(this.right, this.top);
            this.vertexs[3].assign(this.left, this.top);
        };
        /**
         * 准备线段数据（为多边形计算每条边的信息）
         */
        CollisionRectangle2D.prototype.prepareSegments = function () {
            for (var i = 0; i < this.vertexs.length; i++) {
                var a = this.vertexs[i];
                var b = i > 0 ? this.vertexs[i - 1] : this.vertexs[this.vertexs.length - 1];
                this.segments[i].assign(a.x - b.x, a.y - b.y);
            }
        };
        return CollisionRectangle2D;
    }(world2d.Collision2D));
    world2d.CollisionRectangle2D = CollisionRectangle2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=CollisionRectangle2D.js.map