
window.onload = function () {
    mj.app.toTip();
    mj.app.toBanner();
    mj.app.toSel();
    mj.app.toRun();
};

//命名空间
var mj = {};


//工具
mj.tools = {};
//根据类名获取元素
mj.tools.getByClass = function (parentObj, claName) {
    var achild = parentObj.getElementsByTagName('*');
    var arr = [];
    for (var i = 0; i < achild.length; i++) {
        if (achild[i].className == claName) {
            arr.push(achild[i]);
        }
    }
    return arr;
};
//获取对象的透明度
mj.tools.getStyle = function (obj, attr) {
    if (obj.currentStyle) {//ie
        return obj.currentStyle[attr];
    } else {//非id
        return getComputedStyle(obj, false)[attr];
    }
};




//组件
mj.ui = {};

//对象光标移入移出时的组件
mj.ui.textChange = function (obj, str) {

    obj.onfocus = function () {
        if (this.value == str) {
            this.value = '';
        }
    };
    obj.onblur = function () {
        if (this.value == '') {
            this.value = str;
        }
    };
};
//对象淡入
mj.ui.fadeIn = function (obj) {
    clearInterval(obj.timer);
    var iCur = mj.tools.getStyle(obj, 'opacity');
    if (iCur == 1) {
        return false;
    }

    var value = 0;
    obj.timer = setInterval(function () {
        var iSpeed = 5;
        if (value == 100) {
            clearInterval(obj.timer);
        } else {
            value += iSpeed;
            obj.style.opacity = value / 100;
            obj.style.filter = 'alpha(opacity=' + value + ')';
        }
    }, 30);
};
//对象淡出
mj.ui.fadeOut = function (obj) {
    clearInterval(obj.timer);
    var iCur = mj.tools.getStyle(obj, 'opacity');
    if (iCur == 0) {
        return false;
    }

    var value = 100;
    obj.timer = setInterval(function () {
        var iSpeed = 5;
        if (value == 0) {
            clearInterval(obj.timer);
        } else {
            value -= iSpeed;
            obj.style.opacity = value / 100;
            obj.style.filter = 'alpha(opacity=' + value + ')';
        }
    }, 30);
};
//向左移动到指定值
mj.ui.moveLeft = function (obj, nowl, newl) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var iSpeed = (newl - nowl) / 10;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (newl == nowl) {
            clearInterval(obj.timer);
        } else {
            nowl += iSpeed;
            obj.style.left = nowl + 'px';
        }
    }, 30);
};




//应用
mj.app = {};

//搜索框移入移出效果
mj.app.toTip = function () {
    var oSearch1 = document.getElementById('search1');
    var oSearch2 = document.getElementById('search2');

    mj.ui.textChange(oSearch1, 'Search website');
    mj.ui.textChange(oSearch2, 'Search website');

};
//banner淡入淡出效果
mj.app.toBanner = function () {
    var oAd = document.getElementById('ad');
    var aLi = oAd.getElementsByTagName('li');
    //一个定时器，每隔一段时间让li都淡出，让第1个..第2个..第3个淡入，鼠标滑入时定时器停止，滑出时定时器再开启
    var oPrevBg = mj.tools.getByClass(oAd, 'prev_bg')[0];
    var oNextBg = mj.tools.getByClass(oAd, 'next_bg')[0];

    var oPrev = mj.tools.getByClass(oAd, 'prev')[0];
    var oNext = mj.tools.getByClass(oAd, 'next')[0];
    var timer = setInterval(autoDo, 3000);
    var iNow = 0;
    function autoDo() {
        if (iNow == aLi.length - 1) {
            iNow = 0;
        } else {
            iNow++;
        }

        for (var i = 0; i < aLi.length; i++) {
            mj.ui.fadeOut(aLi[i]);
        }
        mj.ui.fadeIn(aLi[iNow]);
    }

    function autoDoPrev() {
        if (iNow == 0) {
            iNow = aLi.length - 1;
        } else {
            iNow--;
        }

        for (var i = 0; i < aLi.length; i++) {
            mj.ui.fadeOut(aLi[i]);
        }
        mj.ui.fadeIn(aLi[iNow]);
    }

    //给左右两边的加上滑入显示按钮的事件
    //同时加上事件，防止页面抖动
    oPrevBg.onmouseover = oPrev.onmouseover = function () {
        oPrev.style.display = "block";
        clearInterval(timer);
    };
    oPrevBg.onmouseout = oPrev.onmouseout = function () {
        oPrev.style.display = "none";
        timer = setInterval(autoDo, 3000);
    };
    oNextBg.onmouseover = oNext.onmouseover = function () {
        oNext.style.display = "block";
        clearInterval(timer);
    };
    oNextBg.onmouseout = oNext.onmouseout = function () {
        oNext.style.display = "none";
        timer = setInterval(autoDo, 3000);
    };
    //给按钮添加点击切换事件
    oPrev.onclick = function () {
        autoDoPrev();
    };
    oNext.onclick = function () {
        autoDo();
    };
    //为下拉添加点击事件
    //var oOutDiv = document.getElementById('main_right_top');
    //var oUls = oOutDiv.getElementsByTagName('ul');
    //var oDds = oOutDiv.getElementsByTagName('dd');
    //var clicknum = 0;
    //for (var i = 0; i < oDds.length; i++) {//循环为每个dd添加点击事件
    //    oDds[i].onclick = function () {
    //        clicknum++;
    //        if (clicknum == 1) {
    //            for (var j = 0; j < oUls.length; j++) {
    //                oUls[j].style.display = 'none';
    //            }
    //            this.getElementsByTagName('ul')[0].style.display = 'block';
    //        } else if (clicknum == 2) {
    //            this.getElementsByTagName('ul')[0].style.display = 'none';
    //            clicknum = 0;
    //        }


    //    };
    //}
    //下拉框的点击事件
    mj.app.toSel = function () {
        var oOutDiv = document.getElementById('main_right_top');
        var oUls = oOutDiv.getElementsByTagName('ul');
        var oDds = oOutDiv.getElementsByTagName('dd');
        var oH2s = oOutDiv.getElementsByTagName('h2');

        for (var i = 0; i < oDds.length; i++) {
            oDds[i].index = i;
            oDds[i].onclick = function (ev) {

                var _this = this;
                //循环让所有的ul先隐藏，让选中的显示
                for (var j = 0; j < oUls.length; j++) {
                    oUls[j].style.display = "none";
                }

                oUls[this.index].style.display = 'block';
                //ev.cancelBubble = true;//是否禁止当前对象dd的点击事件向上传递而触发到document的点击事件
                ///////////////////////////////////////////////////////
                if (ev) //如果存在ev则是非ie，使用下面阻止冒泡，兼容写法
                    ev.stopPropagation();
                else//ie中如下阻止冒泡
                    window.event.cancelBubble = true;
                ///////////////////////////////////////////////////////
                document.onclick = function () {
                    oUls[_this.index].style.display = "none";
                };

            };
        }

        for (var i = 0; i < oUls.length; i++) {
            oUls[i].index = i;
            (function (ul) {  //()();闭包的写法
                var aLi = ul.getElementsByTagName('li');
                for (var j = 0; j < aLi.length; j++) {
                    aLi[j].onclick = function (ev) {
                        oH2s[this.parentNode.index].innerHTML = this.innerHTML;
                        this.parentNode.style.display = "none";
                        //此处需阻止li的点击事件冒泡而触发到dd的点击事件
                        if (ev) //如果存在ev则是非ie，使用下面阻止冒泡
                            ev.stopPropagation();
                        else//ie中如下阻止冒泡
                            window.event.cancelBubble = true;
                    };
                }
            })(oUls[i]);
        }

    };

    //轮播图左右无缝切换
    mj.app.toRun = function () {
        var oRun = document.getElementById('footer_nav_left');
        var oUl = oRun.getElementsByTagName('ul')[0];
        var oLi = oUl.getElementsByTagName('li');
        var oPrev = mj.tools.getByClass(oRun, 'footer_nav_btn_left')[0];
        var oNext = mj.tools.getByClass(oRun, 'footer_nav_btn_right')[0];

        var iNow = 0;
        oUl.innerHTML += oUl.innerHTML;
        oUl.style.width = oLi.length * oLi[0].offsetWidth + 'px';

        oPrev.onclick = function () {


            if (iNow == 0) {
                iNow = oLi.length / 2;
                oUl.style.left = -oUl.offsetWidth / 2 +32 + 'px';
            }

            mj.ui.moveLeft(oUl, -iNow * oLi[0].offsetWidth, -(iNow - 1) * oLi[0].offsetWidth + 32);

            iNow--;
        };

        oNext.onclick = function () {
            if (iNow == oLi.length / 2) {
                iNow = 0;
                oUl.style.left = 32;
            }

            mj.ui.moveLeft(oUl, -(iNow * oLi[0].offsetWidth), -(iNow + 1) * oLi[0].offsetWidth + 32);

            iNow++;
        };

    };

};
//
