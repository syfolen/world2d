
module world2d {

    export abstract class Helper2D {
        /**
         * PI
         */
        static PI: number = Math.PI;

        /**
         * 2PI
         */
        static PI2: number = Math.PI * 2;

        /**
         * 角度换算为弧度
         */
        static d2a(d: number): number {
            return d * Math.PI / 180;
        }

        /**
         * 弧度换算为角度
         */
        static a2d(a: number): number {
            return a * 180 / Math.PI;
        }

        /**
         * 获取较小值
         */
        static min(a: number, b: number): number {
            return a < b ? a : b;
        }

        /**
         * 获取较大值
         */
        static max(a: number, b: number): number {
            return a > b ? a : b;
        }

        /**
         * 获取绝对值
         */
        static abs(a: number): number {
            if (a < 0) {
                return -a;
            }
            return a;
        }
    }
}