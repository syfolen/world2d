/**
 * @license world2d (c) 2013 Binfeng Sun <christon.sun@qq.com>
 * Released under the MIT License
 * https://blog.csdn.net/syfolen
 * https://github.com/syfolen/world2d
 * export
 */
module world2d {

    /**
     * 2D世界
     * 此类主要实现2D世界的碰撞
     * export
     */
    export class World2D implements IWorld2D {

        /**
         * 调试模式
         * export
         */
        static DEBUG: boolean = false;

        /**
         * 对象的碰撞层级发生了变化
         */
        static TRANSFORM_LAYER_CHANGED: string = "world2d.TRANSFORM_LAYER_CHANGED";

        /**
         * 单例对象
         * export
         */
        static inst: IWorld2D;

        /**
         * 层级关系
         */
        private $detectors: Array<Array<boolean>> = [];

        /**
         * 碰撞关系
         */
        private $contacts: Array<ICollisionContact2D> = [];

        /**
         * 世界中的对象
         */
        private $transforms: Array<ITransform2D> = [];

        /**
         * export
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
         * export
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
         * export
         */
        addTransform(transform: ITransform2D, layer: CollisionLayerEnum = CollisionLayerEnum.DEFAULT): void {
            transform.layer = layer;
            transform.addEventListener(World2D.TRANSFORM_LAYER_CHANGED, this.$onTransformLayerChanged, this);
            for (let i: number = 0; i < this.$transforms.length; i++) {
                const transform2: ITransform2D = this.$transforms[i];
                if (this.$shouldCollide(transform.layer, transform2.layer) === true) {
                    const contact: ICollisionContact2D = new CollisionContact2D(transform, transform2);
                    this.$contacts.push(contact);
                }
            }
            this.$transforms.push(transform);
        }

        /**
         * 移除对象
         * export
         */
        removeTransform(transform: ITransform2D): void {
            const index: number = this.$transforms.indexOf(transform);
            if (index < 0) {
                return;
            }
			transform.disabled();
            this.$transforms.splice(index, 1);
            transform.removeEventListener(World2D.TRANSFORM_LAYER_CHANGED, this.$onTransformLayerChanged, this);
            for (let i: number = this.$contacts.length - 1; i > -1; i--) {
                const contact: ICollisionContact2D = this.$contacts[i];
                if (contact.a === transform || contact.b === transform) {
                    if (contact.touching === true) {
                        contact.doCollide(CollisionType.COLLISION_EXIT);
                    }
                    this.$contacts.splice(i, 1);
                }
            }
        }

        /**
         * 对象的碰撞层级发生了变化
         */
        private $onTransformLayerChanged(transform: ITransform2D): void {
            this.removeTransform(transform);
            this.addTransform(transform, transform.layer);
        }

        /**
         * 添加探测器
         * export
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
        get transforms(): Array<ITransform2D> {
            return this.$transforms;
        }
    }
}