
module world2d {

    export namespace DrawAPI2D {

        export let graphics: Laya.Graphics;

        export function clear(): void {
            DrawAPI2D.graphics.clear();
        }

        export function draw(transforms: ITransform2D[]): void {
            // 绘制坐标系
            // DrawAPI2D.graphics.drawLine(Global.WIDTH * 0.5, 0, Global.WIDTH * 0.5, Global.WIDTH, "#FF0000");
            // DrawAPI2D.graphics.drawLine(0, Global.HEIGHT * 0.5, Global.WIDTH, Global.HEIGHT * 0.5, "#FF0000");

            // 绘制所有包围盒
            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                const bounds: IBounds = transform.collision.bounds;
                DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, "#FF0000");
            }

            // 绘制所有对撞机
            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    const collision: ICollisionCircle2D = transform.collision as ICollisionCircle2D;
                    DrawAPI2D.drawCircle(transform.x, transform.y, collision.radius, "#FF0000");
                }
                else if (transform.collision.shap === CollisionShapEnum2D.POLYGON) {
                    const collision: ICollisionPolygon2D = transform.collision as ICollisionPolygon2D;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, "#FF0000");
                }
                else {
                    const collision: ICollisionRectangle2D = transform.collision as ICollisionRectangle2D;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, "#FF0000");
                }
            }

            // 绘制所有碰撞体
            for (let i: number = 0; i < transforms.length; i++) {
                const transform: ITransform2D = transforms[i];
                const lineColor: string = transform.hitNum === 0 ? "#0000FF" : "#00FF00";
                if (transform.collision.shap === CollisionShapEnum2D.CIRCLE) {
                    const collision: ICollisionCircle2D = transform.collision as ICollisionCircle2D;
                    DrawAPI2D.drawCircle(transform.x, transform.y, collision.radius, lineColor);
                }
                else if (transform.collision.shap === CollisionShapEnum2D.POLYGON) {
                    const collision: ICollisionPolygon2D = transform.collision as ICollisionPolygon2D;
                    DrawAPI2D.drawPolygon(0, 0, collision.vertexs, lineColor);
                }
                else {
                    const bounds: IBounds = transform.collision.bounds;
                    DrawAPI2D.drawRect(bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top, lineColor);
                }
            }
        }

        export function drawLine(a: IPoint2D, b: IVector2D, lineColor: string): void {
            DrawAPI2D.graphics.drawLine(a.x, a.y, b.x, b.y, lineColor);
        }

        export function drawNormal(a: IVector2D, lineColor: string): void {
            const normal: IVector2D = a.copy().normalize().mul(1000);
            DrawAPI2D.graphics.drawLine(a.x, a.y, -a.x, -a.y, lineColor);
        }

        export function drawRect(x: number, y: number, width: number, height: number, lineColor: string): void {
            DrawAPI2D.graphics.drawRect(x, y, width, height, void 0, lineColor);
        }

        export function drawCircle(x: number, y: number, radius: number, lineColor: string): void {
            DrawAPI2D.graphics.drawCircle(x, y, radius, void 0, lineColor);
        }

        export function drawPolygon(x: number, y: number, vertexs: IVector2D[], lineColor: string): void {
            for (let i: number = 0; i < vertexs.length; i++) {
                const a: IVector2D = vertexs[i];
                const b: IVector2D = i === 0 ? vertexs[vertexs.length - 1] : vertexs[i - 1];
                DrawAPI2D.graphics.drawLine(a.x + x, a.y + y, b.x + x, b.y + y, lineColor);
            }
        }
    }
}
