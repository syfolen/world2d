var world2d;
(function (world2d) {
    /**
     * 线段
     */
    var Segment2D = /** @class */ (function () {
        function Segment2D() {
            /**
             * 线段起点
             */
            this.a = new world2d.Vector2D(0, 0);
            /**
             * 线段终点
             */
            this.b = new world2d.Vector2D(0, 0);
            /**
             * 线段方向
             */
            this.ab = new world2d.Vector2D(0, 0);
        }
        return Segment2D;
    }());
    world2d.Segment2D = Segment2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=Segment2D.js.map