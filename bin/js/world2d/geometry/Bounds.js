var world2d;
(function (world2d) {
    /**
     * 图形边界对象
     */
    var Bounds = /** @class */ (function () {
        function Bounds() {
        }
        /**
         * 更新边界数据
         */
        Bounds.prototype.updateBounds = function (left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        };
        return Bounds;
    }());
    world2d.Bounds = Bounds;
})(world2d || (world2d = {}));
//# sourceMappingURL=Bounds.js.map