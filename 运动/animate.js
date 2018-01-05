//运动类  运动元素id，目标位置，匀速运动速度,运动间隔时间(毫秒)
function animate(id, target, speed, jiange) {
    this.obj = document.getElementById(id);
    this.curentX = this.obj.offsetLeft;
    this.curentY = this.obj.offsetTop;
    this.curentOpacity = this.getOpacity();
    this.target = parseFloat(target);
    this.jiange = parseFloat(jiange);
    this.speed = parseFloat(speed);
}
//X轴匀速运动方法
animate.prototype.doXMove = function() {
        var _this = this;
        clearInterval(timer);
        var timer = setInterval(function() {
            if (_this.curentX >= _this.target) { //向左移动
                if (_this.obj.offsetLeft <= _this.target) { //向左运动到达终点
                    _this.curentX = _this.target;
                    clearInterval(timer);
                } else {
                    _this.curentX -= _this.speed;
                }
            } else if (_this.curentX < _this.target) { //向右移动

                if (_this.obj.offsetLeft >= _this.target) { //向右运动到达终点
                    _this.curentX = _this.target;
                    clearInterval(timer);
                } else {
                    _this.curentX += _this.speed;
                }
            }
            _this.obj.style.left = _this.curentX + 'px';
        }, _this.jiange);
    }
    //Y轴匀速运动方法
animate.prototype.doYMove = function() {
        var _this = this;
        clearInterval(timer);
        var timer = setInterval(function() {
            if (_this.curentY >= _this.target) { //向上移动
                if (_this.obj.offsetTop <= _this.target) { //向上运动到达终点
                    _this.curentY = _this.target;
                    clearInterval(timer);
                } else {
                    _this.curentY -= _this.speed;
                }
            } else if (_this.curentY < _this.target) { //向下移动

                if (_this.obj.offsetTop >= _this.target) { //向下运动到达终点
                    _this.curentY = _this.target;
                    clearInterval(timer);
                } else {
                    _this.curentY += _this.speed;
                }
            }
            _this.obj.style.top = _this.curentY + 'px';
        }, _this.jiange);
    }
    //淡入淡出
animate.prototype.doOpacityChange = function() {
        var _this = this;
        clearInterval(timer);
        var timer = setInterval(function() {
            if (_this.curentOpacity >= _this.target) { //淡出
                if (_this.getOpacity() <= _this.target) {
                    _this.curentOpacity = _this.target;
                    clearInterval(timer);
                } else {
                    _this.curentOpacity -= _this.speed;
                }
            } else { //淡入
                if (_this.getOpacity() >= _this.target) {
                    _this.curentOpacity = _this.target;
                    clearInterval(timer);
                } else {
                    _this.curentOpacity += _this.speed;
                }
            }
            _this.obj.style.filter = 'alpha(opacity=' + _this.curentOpacity + ')';
            _this.obj.style.opacity = _this.curentOpacity * 0.01;
        }, _this.jiange);
    }
    //获取元素当前的透明度，返回0到100的整数
animate.prototype.getOpacity = function() {
        var opacityValue = 0;
        //此处第一次执行时this.obj.style不能获取到obj的透明度
        if (window.getComputedStyle) { //标准浏览器
            opacityValue = parseFloat(getComputedStyle(this.obj).opacity) * 100;
        } else { //非标准浏览器
            var reg = /\d+/;
            opacityValue = parseFloat(this.obj.currentStyle.filter.match(reg)[0]);
        }
        return opacityValue;
    }
    //根据id获取元素当前的透明度，返回0到100的整数，相当于animate类的静态方法
animate.prototype.getOpacityById = function(id) {
    var newobj = document.getElementById(id);
    var opacityValue = 0;
    if (window.getComputedStyle) { //标准浏览器
        opacityValue = parseFloat(getComputedStyle(newobj).opacity) * 100;
    } else { //非标准浏览器
        var reg = /\d+/;
        opacityValue = parseFloat(newobj.currentStyle.filter.match(reg)[0]);
    }
    return opacityValue;
}