
module world2d {

    /**
     * 2D世界
     * 此类主要实现2D世界的碰撞
     */
    export class World2D<T extends IEntity<any>> implements IWorld2D<T> {

        /**
         * 调试模式
         */
        static DEBUG: boolean = true;

        /**
         * 单例对象
         */
        static inst: IWorld2D<any>;

        /**
         * 层级关系
         */
        private $detectors: Array<Array<boolean>> = [];

        /**
         * 碰撞关系
         */
        private $contacts: Array<ICollisionContact2D<T>> = [];

        /**
         * 世界中的对象
         */
        private $transforms: Array<ITransform2D<T>> = [];

        /**
         * 碰撞分组，一经设置不可更改
         */
        constructor(graphics: Laya.Graphics) {
            // 保存世界对象为单例
            World2D.inst = this;
            // 世界绘制接口
            DrawAPI2D.graphics = graphics;
            // 默认层级中的所有元素都会相互碰撞
            this.addDetector(CollisionLayerEnum.DEFAULT, CollisionLayerEnum.DEFAULT);
        }

        /**
         * 实时物理计算
         */
        update(delta: number): void {
            // 世界数据转换
            for (let i: number = 0; i < this.$transforms.length; i++) {
                this.$transforms[i].transform(delta);
            }
            for (let i: number = 0; i < this.$contacts.length; i++) {
                this.$contacts[i].test();
            }
            // 绘制世界
            World2D.DEBUG === true && DrawAPI2D.draw(this.$transforms);
        }

        /**
         * 添加对象
         * @layer: 默认为 CollisionLayerEnum.DEFAULT
         */
        addTransform(transform: ITransform2D<T>, layer: CollisionLayerEnum = CollisionLayerEnum.DEFAULT): void {
            transform.layer = layer;
            for (let i: number = 0; i < this.$transforms.length; i++) {
                const transform2: ITransform2D<T> = this.$transforms[i];
                if (this.$shouldCollide(transform.layer, transform2.layer) === true) {
                    const contact: ICollisionContact2D<T> = new CollisionContact2D(transform, transform2);
                    this.$contacts.push(contact);
                }
            }
            this.$transforms.push(transform);
        }

        /**
         * 移除对象
         */
        removeTransform(transform: ITransform2D<T>): void {
            const index: number = this.$transforms.indexOf(transform);
            if (index < 0) {
                return;
            }
            this.$transforms.splice(index, 1);
            for (let i: number = this.$contacts.length - 1; i > -1; i--) {
                const contact: ICollisionContact2D<T> = this.$contacts[i];
                if (contact.a === transform || contact.b === transform) {
                    if (contact.touching === true) {
                        contact.doCollide(CollisionType.COLLISION_EXIT);
                    }
                    this.$contacts.splice(i, 1);
                }
            }
        }

        /**
         * 添加探测器
         */
        addDetector(a: CollisionLayerEnum, b: CollisionLayerEnum): void {
            if (a > b) {
                const t: CollisionLayerEnum = a;
                a = b;
                b = t;
            }
            if (this.$detectors[a] === void 0) {
                this.$detectors[a] = [];
            }
            this.$detectors[a][b] = true;
        }

        /**
         * 判断两个对象是否需要发生碰撞
         */
        private $shouldCollide(a: CollisionLayerEnum, b: CollisionLayerEnum): boolean {
            if (a > b) {
                const t: CollisionLayerEnum = a;
                a = b;
                b = t;
            }
            if (this.$detectors[a] !== void 0 && this.$detectors[a][b] === true) {
                return true;
            }
            return false;
        }

        /**
         * 获取对象集合
         */
        get transforms(): Array<ITransform2D<T>> {
            return this.$transforms;
        }
    }
}