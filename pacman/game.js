<link rel="stylesheet" class="aplayer-secondary-style-marker" href="\assets\css\APlayer.min.css"><script src="\assets\js\APlayer.min.js" class="aplayer-secondary-script-marker"></script><script class="meting-secondary-script-marker" src="\assets\js\Meting.min.js"></script>'use strict';
/*
* 小型游戏引擎
*/

// requestAnimationFrame polyfill
if (!Date.now)
Date.now = function() { return new Date().getTime(); };
(function() {
    'use strict';
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame'] || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
            nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

function Game(id,params){
    var _ = this;
    var settings = {
        width:960,						//画布宽度
        height:640						//画布高度
    };
    Object.assign(_,settings,params);
    var $canvas = document.getElementById(id);
    $canvas.width = _.width;
    $canvas.height = _.height;
    var _context = $canvas.getContext('2d');	//画布上下文环境
    var _stages = [];							//布景对象队列
    var _events = {};							//事件集合
    var _index=0,								//当前布景索引
        _hander;  								//帧动画控制
    //活动对象构造
    var Item = function(params){
        this._params = params||{};
        this._id = 0;               //标志符
        this._stage = null;         //与所属布景绑定
        this._settings = {
            x:0,					//位置坐标:横坐标
            y:0,					//位置坐标:纵坐标
            width:20,				//宽
            height:20,				//高
            type:0,					//对象类型,0表示普通对象(不与地图绑定),1表示玩家控制对象,2表示程序控制对象
            color:'#F00',			//标识颜色
            status:1,				//对象状态,0表示未激活/结束,1表示正常,2表示暂停,3表示临时,4表示异常
            orientation:0,			//当前定位方向,0表示右,1表示下,2表示左,3表示上
            speed:0,				//移动速度
            //地图相关
            location:null,			//定位地图,Map对象
            coord:null,				//如果对象与地图绑定,需设置地图坐标;若不绑定,则设置位置坐标
            path:[],				//NPC自动行走的路径
            vector:null,			//目标坐标
            //布局相关
            frames:1,				//速度等级,内部计算器times多少帧变化一次
            times:0,				//刷新画布计数(用于循环动画状态判断)
            timeout:0,				//倒计时(用于过程动画状态判断)
            control:{},				//控制缓存,到达定位点时处理
            update:function(){}, 	//更新参数信息
            draw:function(){}		//绘制
        };
        Object.assign(this,this._settings,this._params);
    };
    Item.prototype.bind = function(eventType,callback){
        if(!_events[eventType]){
            _events[eventType] = {};
            $canvas.addEventListener(eventType,function(e){
                var position = _.getPosition(e);
                _stages[_index].items.forEach(function(item){
                    if(Math.abs(position.x-item.x)<item.width 2 2&&math.abs(position.y-item.y)<item.height 2){ var key="s" +_index+'i'+item._id; if(_events[eventtype][key]){ _events[eventtype][key](e); } }); e.preventdefault(); _events[eventtype]['s'+this._stage.index+'i'+this._id]="callback.bind(this);" 绑定作用域 }; 地图对象构造器 map="function(params){" this._params="params||{};" this._id="0;" 标志符 this._stage="null;" 与所属布景绑定 this._settings="{" x:0, 地图起点坐标 y:0, size:20, 地图单元的宽度 data:[], 地图数据 x_length:0, 二维数组x轴长度 y_length:0, 二维数组y轴长度 frames:1, 速度等级,内部计算器times多少帧变化一次 times:0, 刷新画布计数(用于循环动画状态判断) cache:false, 是否静态（如静态则设置缓存） update:function(){}, 更新地图数据 draw:function(){}, 绘制地图 object.assign(this,this._settings,this._params); 获取地图上某点的值 map.prototype.get="function(x,y){" if(this.data[y]&&typeof this.data[y][x]!="undefined" ){ return this.data[y][x]; -1; 设置地图上某点的值 map.prototype.set="function(x,y,value){" if(this.data[y]){ this.data[y][x]="value;" 地图坐标转画布坐标 map.prototype.coord2position="function(cx,cy){" { x:this.x+cx*this.size+this.size 2, y:this.y+cy*this.size+this.size 画布坐标转地图坐标 map.prototype.position2coord="function(x,y){" fx="Math.abs(x-this.x)%this.size-this.size/2;" fy="Math.abs(y-this.y)%this.size-this.size/2;" x:math.floor((x-this.x) this.size), y:math.floor((y-this.y) offset:math.sqrt(fx*fx+fy*fy) 寻址算法 map.prototype.finder="function(params){" defaults="{" map:null, start:{}, end:{}, type:'path' options="Object.assign({},defaults,params);" if(options.map[options.start.y][options.start.x]||options.map[options.end.y][options.end.x]){ 当起点或终点设置在墙上 []; finded="false;" result="[];" y_length="options.map.length;" x_length="options.map[0].length;" steps="Array(y_length).fill(0).map(()=">Array(x_length).fill(0));     //步骤的映射
        var _getValue = function(x,y){  //获取地图上的值
            if(options.map[y]&&typeof options.map[y][x]!='undefined'){
                return options.map[y][x];
            }
            return -1;
        };
        var _next = function(to){ //判定是否可走,可走放入列表
            var value = _getValue(to.x,to.y);
            if(value</item.width>