
declare module suncom {
    /**
     * 调试模式，主要用于控制LOG的打印
     */
    enum DebugMode {
        /**
         * 任意
         */
        ANY = 0x01,

        /**
         * 调试信息
         */
        DEBUG = 0x02,

        /**
         * 工程模式
         */
        ENGINEER = 0x04,

        /**
         * 框架
         */
        ENGINE = 0x08,

        /**
         * 原生
         */
        NATIVE = 0x10,

        /**
         * 网络
         */
        NETWORK = 0x20,

        /**
         * 网络心跳
         */
        NETWORK_HEARTBEAT = 0x40,

        /**
         * 普通
         */
        NORMAL = 0x80
    }

    /**
     * 环境模式，主要用于代码的版本控制
     */
    enum EnvMode {
        /**
         * 开发环境
         */
        DEVELOP = 0,

        /**
         * 调试模式
         */
        DEBUG,

        /**
         * 网页版
         */
        WEB
    }

    /**
     * 事件优先级
     */
    enum EventPriorityEnum {
        /**
         * 最低
         */
        LAZY = 0,

        /**
         * 低（默认）
         */
        LOW,

        /**
         * 中
         */
        MID,

        /**
         * 高
         */
        HIGH,

        /**
         * 框架级别
         */
        FWL,

        /**
         * 引擎级别
         */
        EGL,

        /**
         * 系统级别
         */
        OSL
    }

    /**
     * 日志类型枚举
     */
    enum LogTypeEnum {
        /**
         * 普通日志
         */
        VERBOSE,

        /**
         * 警告日志
         */
        WARN,

        /**
         * 错误日志
         */
        ERROR,

        /**
         * 文件日志
         */
        LOG2F
    }

    /**
     * 自定义事件系统中的事件信息
     */
    interface IEventInfo {
    }

    /**
     * 自定义事件接口
     */
    interface IEventSystem {

        /**
         * 取消当前正在派发的事件
         */
        dispatchCancel(): void;

        /**
         * 事件派发
         * @args[]: 参数列表，允许为任意类型的数据
         * @cancelable: 事件是否允许被中断，默认为false
         */
        dispatchEvent(type: string, args?: any, cancelable?: boolean): void;

        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为：EventPriorityEnum.LOW
         */
        addEventListener(type: string, method: Function, caller: Object, receiveOnce?: boolean, priority?: EventPriorityEnum): void;

        /**
         * 移除事件
         */
        removeEventListener(type: string, method: Function, caller: Object): void;
    }

    /**
     * 回调执行器接口
     */
    interface IHandler {
        /**
         * 回调对象
         */
        readonly caller: Object;

        /**
         * 回调方法
         */
        readonly method: Function;

        /**
         * 执行回调
         */
        run(): any;

        /**
         * 执行回调，同时携带额外的参数
         * @args 参数列表，允许为任意类型的数据
         */
        runWith(args: any): any;
    }

    /**
     * 哈希表接口，通常用于作为一个大量数据的集合，用于快速获取数据集中的某条数据
     */
    interface IHashMap<T> {
        /**
         * 数据源（请勿直接操作其中的数据）
         */
        source: T[];

        /**
         * 添加数据
         */
        put(data: T): T;

        /**
         * 移除数据
         */
        remove(data: T): T;

        /**
         * 根据键值返回数据
         */
        getByValue(key: string, value: any): T;

        /**
         * 根据主键值快速返回数据
         */
        getByPrimaryValue(value: number | string): T;

        /**
         * 根据键值移除数据
         */
        removeByValue(key: string, value: any): T;

        /**
         * 根据主键值移除数据
         */
        removeByPrimaryValue(value: number | string): T;

        /**
         * 为每个数据执行方法（谨慎在此方法中新增或移除数据）
         * 若method的返回值为true，则会中断遍历
         */
        forEach(method: (data: T) => any): void;
    }

    /**
     * EventSystem 自定义事件系统
     */
    class EventSystem implements IEventSystem {
        /**
         * 事件对象集合（内置属性，请勿操作）
         * 为避免注册与注销对正在派发的事件列表产生干扰：
         * NOTE: 每个列表首个元素为布尔类型，默认为 false
         * NOTE: 若该列表的事件类型正在派发，则其值为 true
         */
        private $events: { [type: string]: Array<boolean | IEventInfo> };

        /**
         * 己执行的一次性事件对象列表（内置属性，请勿操作）
         */
        private $onceList: IEventInfo[];

        /**
         * 事件是否己取消（内置属性，请勿操作）
         */
        private $isCanceled: boolean;

        /**
         * 取消当前正在派发的事件
         */
        dispatchCancel(): void;

        /**
         * 事件派发
         * @args: 参数列表，允许为任意类型的数据
         * @cancelable: 事件是否允许被中断，默认为false
         */
        dispatchEvent(type: string, args?: any, cancelable?: boolean): void;

        /**
         * 事件注册
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 事件优先级，优先级高的先被执行，默认为：EventPriorityEnum.LOW
         */
        addEventListener(type: string, method: Function, caller: Object, receiveOnce?: boolean, priority?: EventPriorityEnum): void;

        /**
         * 移除事件
         */
        removeEventListener(type: string, method: Function, caller: Object): void;
    }

    /**
     * 事件处理器
     */
    class Handler implements IHandler {

        /**
         * 执行处理器
         */
        run(): any;

        /**
         * 执行处理器，携带额外的参数
         * @args 参数列表，允许为任意类型的数据
         */
        runWith(args: any): any;

        /**
         * 回调对象
         */
        readonly caller: Object;

        /**
         * 回调方法
         */
        readonly method: Function;

        /**
         * 创建Handler的简单工厂方法
         */
        static create(caller: Object, method: Function, args?: any[]): IHandler;
    }

    /**
     * 哈希表接口，通常用于作为一个大量数据的集合，用于快速获取数据集中的某条数据
     */
    class HashMap<T> implements IHashMap<T> {
        /**
         * 数据源（请勿直接操作其中的数据）
         */
        source: T[];

        /**
         * @primaryKey: 指定主键字段名，哈希表会使用主键值来作为数据索引，所以请确保主键值是恒值
         */
        constructor(primaryKey: number | string);

        /**
         * 添加数据
         */
        put(data: T): T;

        /**
         * 移除数据
         */
        remove(data: T): T;

        /**
         * 根据键值返回数据
         */
        getByValue(key: string, value: any): T;

        /**
         * 根据主键值快速返回数据
         */
        getByPrimaryValue(value: number | string): T;

        /**
         * 根据键值移除数据
         */
        removeByValue(key: string, value: any): T;

        /**
         * 根据主键值移除数据
         */
        removeByPrimaryValue(value: number | string): T;

        /**
         * 为每个数据执行方法（谨慎在此方法中新增或移除数据）
         * 若method返回true，则会中断遍历
         */
        forEach(method: (data: T) => any): void;
    }

    /**
     * 常用库（纯JS方法）
     */
    namespace Common {

        /**
         * 获取全局唯一的哈希值
         */
        function createHashId(): number;

        /**
         * 获取类名
         * @cls: 指定类型
         */
        function getClassName(cls: any): string;

        /**
         * 返回对象的类名
         */
        function getQualifiedClassName(obj: any): string;

        /**
         * 返回某对象上的方法名
         * @caller: 默认为：null
         */
        function getMethodName(method: Function, caller?: Object): string;

        /**
         * 将枚举转化成字符串
         */
        function convertEnumToString(value: number, oEnum: any): string;

        /**
         * 判断是否为数字
         */
        function isNumber(str: string | number): boolean;

        /**
         * 判断字符串是否为空
         */
        function isStringInvalidOrEmpty(str: string | number): boolean;

        /**
         * 格式化字符串
         */
        function formatString(str: string, args: any[]): string;

        /**
         * 将value限制于min和max之间
         */
        function clamp(value: number, min: number, max: number): number;

        /**
         * 返回近似值
         * @n: 需要保留小数位数，默认为0
         * 1. 因各个平台实现的版本可能不一致，故自定义了此方法
         */
        function round(value: number, n?: number): number;

        /**
         * 返回>=min且<max的随机整数
         */
        function random(min: number, max: number): number;

        /**
         * 将参数转化为 Date
         * @date: 任何格式的时间参数，可以为字符串或时间戳
         * 支持的格式说明：
         * 1. Date对象
         * 2. 时间戳
         * 3. hh:mm:ss
         * 4. yyyy-MM-dd hh:mm:ss
         */
        function convertToDate(date: string | number | Date): Date;

        /**
         * 时间累加
         * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
         * @increment： 增量，可为负
         * @arg2: 时间参数
         */
        function dateAdd(datepart: string, increment: number, time: string | number | Date): number;

        /**
         * 计算时间差
         * @datepart: yy, MM, ww, dd, hh, mm, ss, ms
         */
        function dateDiff(datepart: string, date: string | number | Date, date2: string | number | Date): number;

        /**
         * 格式化时间，支持：yy-MM-dd hh:mm:ss MS|ms
         */
        function formatDate(str: string, time: string | number | Date): string;

        /**
         * 返回MD5加密后的串
         */
        function md5(str: string): string;

        /**
         * 获取文件名（不包括后缀名）
         */
        function getFileName(path: string): string;

        /**
         * 获取文件的扩展名
         */
        function getFileExtension(path: string): string;

        /**
         * 替换扩展名，并返回新的路径
         */
        function replacePathExtension(path: string, newExt: string): string;

        /**
         * 生成HTTP签名
         * @key: 密钥
         * @sign: 忽略签名字段，默认为："sign"
         */
        function createHttpSign(params: Object, key: string, sign?: string): string;

        /**
         * 从数组中查找数据
         * @array: 数据源
         * @method: 查询规则，返回true表示与规则匹配
         * @out: 若为null，则只返回查询到的第一条数据，否则将以数组的形式返回查询到的所有数据
         */
        function findFromArray<T>(array: T[], method: (data: T) => boolean, out?: T[]): T | T[];

        /**
         * 将数据从数组中移除
         */
        function removeItemFromArray<T>(item: T, array: T[]): void;

        /**
         * 将数据从数组中移除
         */
        function removeItemsFromArray<T>(items: T[], array: T[]): void;

        /**
         * 比较版本号
         * 若当前版本低于参数版本，返回 -1
         * 若当前版本高于参数版本，返回 1
         * 否则返回 0
         */
        function compareVersion(ver: string): number;
    }

    /**
     * 伪数据库服务
     * 说明：
     * 1. 用于快速存储或读取数据，数据仅保存在内存中
     */
    namespace DBService {

        /**
         * 获取数据
         */
        function get(name: number): any;

        /**
         * 存储数据
         * @name: 若小于0，则存储的数据不可通过get方法获取
         */
        function put(name: number, data: any): any;

        /**
         * 是否存在
         */
        function exist(name: number): boolean;

        /**
         * 删除数据
         */
        function drop(name: number): void;
    }

    /**
     * 全局常量或变量
     */
    namespace Global {
        /**
         * 运行环境
         */
        let envMode: EnvMode;

        /**
         * 调试模式
         */
        let debugMode: DebugMode;

        /**
         * 设计分辨率
         */
        const WIDTH: number;

        /**
         * 设计分辨率
         */
        const HEIGHT: number;

        /**
         * 实际分辨率
         */
        let width: number;

        /**
         * 实际分辨率
         */
        let height: number;

        /**
         * 游戏版本
         */
        let VERSION: string;
    }

    /**
     * 日志接口
     */
    namespace Logger {

        /**
         * 普通日志
         */
        function log(mod: DebugMode, ...args: any[]): void;

        /**
         * 警告日志
         */
        function warn(mod: DebugMode, ...args: any[]): void;

        /**
         * 错误日志
         */
        function error(mod: DebugMode, ...args: any[]): void;

        /**
         * 文件日志
         */
        function log2f(mod: DebugMode, ...args: any[]): void;
    }

    /**
     * 命令定义
     */
    namespace NotifyKey {
        /**
         * 输出打印日志 { text: string }
         * 说明：
         * 1. 此事件仅在Global.debugMode为DebugMode.DEBUG时才会被派发
         */
        const DEBUG_PRINT: string;
    }

    /**
     * 对象池
     */
    namespace Pool {

        /**
         * 根据标识从池中获取对象，获取失败时返回null
         * @sign: 对象标识
         */
        function getItem(sign: string): any;

        /**
         * 根据标识从池中获取对象，获取失败时将创建新的对象
         * @sign: 对象标识
         * @cls: 对象类型，支持Laya.Prefab
         * @args: 构造函数参数列表，若cls为Laya.Prefab，则args应当为字符串
         */
        function getItemByClass(sign: string, cls: any, args?: any): any;

        /**
         * 根据标识回收对象
         */
        function recover(sign: string, item: any): void;

        /**
         * 清缓指定标识下的所有己缓存对象
         */
        function clear(sign: string): void;
    }

    /**
     * 线性同余发生器
     */
    namespace Random {

        /**
         * 指定随机种子
         */
        function seed(value: number): void;

        /**
         * 返回一个随机数
         */
        function random(): number;
    }
}