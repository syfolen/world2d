
module world2d {

    export interface ICollisionDetector {
        /**
         * 层级a
         */
        a: CollisionLayerEnum;

        /**
         * 层级b
         */
        b: CollisionLayerEnum;
    }
}