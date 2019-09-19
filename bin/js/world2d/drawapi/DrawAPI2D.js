var world2d;
(function (world2d) {
    var DrawAPI2D = /** @class */ (function () {
        function DrawAPI2D() {
        }
        DrawAPI2D.clear = function () {
            DrawAPI2D.graphics.clear();
        };
        DrawAPI2D.draw = function (transforms) {
            // 绘制坐标系
            // DrawAPI2D.graphics.drawLine(Global.WIDTH * 0.5, 0, Global.WIDTH * 0.5, Global.WIDTH, "#FF0000");
            // DrawAPI2D.graphics.drawLine(0, Global.HEIGHT * 0.5, Global.WIDTH, Global.HEIGHT * 0.5, "#FF0000");
            // 绘制所有包围盒
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                var bounds = transform.collision.bounds;
                DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, "#FF0000");
            }
            // 绘制所有对撞机
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                if (transform.collision.shap === world2d.CollisionShapEnum2D.CIRCLE) {
                    var collision = transform.collision;
                    DrawAPI2D.drawCircle(transform.x, transform.y, collision.radius, "#FF0000");
                }
                else if (transform.collision.shap === world2d.CollisionShapEnum2D.POLYGON) {
                    var collision = transform.collision;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, "#FF0000");
                }
                else {
                    var collision = transform.collision;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, "#FF0000");
                }
            }
            // 绘制所有碰撞体
            for (var i = 0; i < transforms.length; i++) {
                var transform = transforms[i];
                var lineColor = transform.hitNum === 0 ? "#0000FF" : "#00FF00";
                if (transform.collision.shap === world2d.CollisionShapEnum2D.CIRCLE) {
                    var collision = transform.collision;
                    DrawAPI2D.drawCircle(transform.x, transform.y, collision.radius, lineColor);
                }
                else if (transform.collision.shap === world2d.CollisionShapEnum2D.POLYGON) {
                    var collision = transform.collision;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, lineColor);
                }
                else {
                    var bounds = transform.collision.bounds;
                    DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, lineColor);
                }
            }
        };
        DrawAPI2D.drawLine = function (a, b, lineColor) {
            DrawAPI2D.graphics.drawLine(a.x, a.y, b.x, b.y, lineColor);
        };
        DrawAPI2D.drawNormal = function (a, lineColor) {
            var normal = a.copy().normalize().mul(1000);
            DrawAPI2D.graphics.drawLine(a.x, a.y, -a.x, -a.y, lineColor);
        };
        DrawAPI2D.drawRect = function (x, y, width, height, lineColor) {
            DrawAPI2D.graphics.drawRect(x, y, width, height, void 0, lineColor);
        };
        DrawAPI2D.drawCircle = function (x, y, radius, lineColor) {
            DrawAPI2D.graphics.drawCircle(x, y, radius, void 0, lineColor);
        };
        DrawAPI2D.drawPolygon = function (x, y, vertexs, lineColor) {
            for (var i = 0; i < vertexs.length; i++) {
                var a = vertexs[i];
                var b = i === 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                DrawAPI2D.graphics.drawLine(a.x + x, a.y + y, b.x + x, b.y + y, lineColor);
            }
        };
        return DrawAPI2D;
    }());
    world2d.DrawAPI2D = DrawAPI2D;
})(world2d || (world2d = {}));
//# sourceMappingURL=DrawAPI2D.js.map