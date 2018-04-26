



//用到的共用方法的提取
(function() {
    pubjs = new publicJS();
})();



function publicJS() {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    String.prototype.colorHex = function() {
        var that = this;
        if (/^(rgb|RGB)/.test(that)) {
            var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = that;
            }
            return strHex;
        } else if (reg.test(that)) {
            var aNum = that.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return that;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return that;
        }
    };

};

//检查输入值中是否有特殊字符
publicJS.prototype.checkAllInput = function() {

    var aInput = $('input[type="text"],textarea');
    var intres = 0;
    var res = true;
    for (var i = 0; i < aInput.length; i++) {
        if (typeof arguments[0]=="string" && arguments[0].indexOf(aInput.get(i).id)>=0) {//排除不需要验证的inputid
            continue;
        } else {
            if (aInput.get(i).value != '' && new RegExp(/[\!\#\$\！\|\%\^\&\￥\*\_\+\=\{\}\\\【\】\、\<\>\、\《\》\@\;\；\"\“\'\‘\。\)<>?]/gi).test(aInput.get(i).value)) {
                alert("输入格式不正确:---" + aInput.get(i).value);
                return false;
            } else {
                //单独验证某字段长度
                //var oinp = document.getElementById('PROBLEMCONTENT');
                //oinp.partype = 'valmaxlength';
                //oinp.parvalue = '10';
                //return pubjs.checkAllInput('id1,id2',oinp);
                var rres = false;
                var ss = false;
                var str = '';//可防止多次弹出超过长度的提示
                for (var j = 0; j <= arguments.length; j++) {
                    if (arguments.length > 0 &&(typeof arguments[j]!='string')&&arguments[j]&&arguments[j].id == aInput.get(i).id) {
                        if (arguments[j].partype == 'valmaxlength') { //自定义验证输入长度
                            if (arguments[j].value.length > parseInt(arguments[j].parvalue)) {
                                str = "输入长度超限:---" + arguments[j].value;
                                res = false;
                                intres += 1;
                            } else {
                                str = '';
                                rres = true;
                                res = true;
                            }
                        }
                    } else {
                        if (rres == false) {
                            if (aInput.get(i).value.length > 50) {
                                str = '输入长度超限:---' + aInput.get(i).value;
                                res = false;
                            }
                        }
                    }
                }
                if (res == false && str != '') {
                    intres += 1;
                    alert(str);
                }
            }
            
        }
        
    }
    if (intres > 0) {
        res = false;
    }
    return res;
}

//添加蒙版和加载等待图片(此方法需载入一个opacity的样式类和等待的动态图片)
//.opacity {
//    position: absolute;
//    left: 0;
//    top: 0;
//    background: url('../images/5-121204193R5-50.gif') no-repeat center black;
//    opacity: 0.5;
//    filter: alpha(Opacity=50);
//    -moz-opacity: 0.5;
//}
//需要加载等待图片的元素js对象
publicJS.prototype.showLoading = function(obj) {
    if (obj) {
        var width = obj.clientWidth;
        var height = obj.clientHeight;
        var str = "<div class='opacity' style='width:" + width + "px;height:" + height + "px'></div>";
        $(obj).append(str);
    }
}

//搜索框显示默认值,光标进入时显示空
//输入框id，默认值
publicJS.prototype.showDefaultValue = function(inputid, defaultValue) {
        $('#' + inputid).on('focus', function() {
            if ($(this).val() == defaultValue) {
                $(this).val("");
            } else {

            }
        });
        $('#' + inputid).on('blur', function() {
            if ($(this).val() == "") {
                $(this).val(defaultValue);
            } else {

            }
        });
    }
    /** 日期比较大小 2001-01-01格式 date1大于date2返回1，否则返回-1 **/
publicJS.prototype.compareDate = function(strDate1, strDate2) {
    //var date1 = new Date(strDate1.replace(/\-/g, "\/"));
    //var date2 = new Date(strDate2.replace(/\-/g, "\/"));
    //return date1 - date2;
    var dateAStr = strDate1;
    var arrA = dateAStr.split("-");
    var dateA = new Date(arrA[0], arrA[1], arrA[2]);
    var dateAT = dateA.getTime();
    var dateBStr = strDate2;
    var arrB = dateBStr.split("-");
    var dateB = new Date(arrB[0], arrB[1], arrB[2]);
    var dateBT = dateB.getTime();
    if (dateAT > dateBT) {
        return 1;
    } else {
        return -1;
    }
}

//获取当前时间 2017-01-01 00:00:00
publicJS.prototype.getNowDate = function(diff) {
    var diffseconds = 0;
    if(typeof diff=='number'){
        diffseconds = diff*24*60*60*1000;
    }
    var odate = new Date();
    var seconds = odate.getTime()+diffseconds;
    odate.setTime(seconds);
    var year = odate.getFullYear();
    var mon = odate.getMonth() + 1;
    if (mon <= 9) {
        mon = '0' + mon;
    }
    var day = odate.getDate();
    if (day <= 9) {
        day = '0' + day;
    }
    var hour = odate.getHours();
    if (hour <= 9) {
        hour = '0' + hour;
    }
    var min = odate.getMinutes();
    if (min <= 9) {
        min = '0' + min;
    }
    var sec = odate.getSeconds();
    if (sec <= 9) {
        sec = '0' + sec;
    }
    return year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec;
}

//绑定事件处理函数
publicJS.prototype.bind = function(obj, evname, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evname, fn, false);
    } else {
        obj.attachEvent('on' + evname, function() {
            fn.call(obj);
        });
    }
}


//标签切换
//pid---要切换元素的父级标签id
//classname---点击后添加的样式类名
//fn---点击li时执行的函数，fn中this指向所点击的li元素,---非必需
//pars---向方法fn中传入的参数，---非必需
publicJS.prototype.changeTab = function(pid, classname, fn, pars) {
    var oparent = document.getElementById(pid);
    //console.log(oparent);
    var achild = oparent.children;
    //console.log(achild);
    for (var i = 0; i < achild.length; i++) {
        achild[i].onclick = function(ev) {
            var evt = ev || event;
            var oTarget = evt.target||evt .srcElement;//ie8不支持target
            var allli = oTarget.parentNode.children;
            for (var j = 0; j < allli.length; j++) {
                allli[j].removeAttribute('class');
            }
            oTarget.className = classname;
            if (typeof fn == 'function') {
                fn.call(oTarget, pars); //此处可把pars放到fn的arguments中
            } else {
                //console.log('传入值不是方法');
            }
        }
    }
}

//js Table导出Excel(兼容IE10/11,谷歌，火狐，不兼容Win10 Edge浏览器)
//tableid ----  table标签的
//filename ----- 导出文件的名(不带.xls后缀名)
publicJS.prototype.ExportExcel = function(tableid, filename) {
    var idTmr;

    function getExplorer() {
        var explorer = window.navigator.userAgent;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
            return 'ie';
        }
        //Edge(win10默认浏览器)
        else if (explorer.indexOf("Edge") >= 0) {
            return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
            return 'Firefox';
        }
        //Chrome
        else if (explorer.indexOf("Chrome") >= 0) {
            return 'Chrome';
        }
        //Opera
        else if (explorer.indexOf("Opera") >= 0) {
            return 'Opera';
        }
        //Safari
        else if (explorer.indexOf("Safari") >= 0) {
            return 'Safari';
        }
        //ie/Edge
        else {
            return 'ie';
        }
    };

    function method5(tableid, filename) { //整个表格拷贝到EXCEL中
        var explorer = getExplorer();
        if (explorer == 'ie') {
            var curTbl = document.getElementById(tableid);
            var oXL = new ActiveXObject("Excel.Application");

            //创建AX对象excel
            var oWB = oXL.Workbooks.Add();
            //获取workbook对象
            var xlsheet = oWB.Worksheets(1);
            //激活当前sheet
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            //把表格中的内容移到TextRange中
            sel.select;
            //全选TextRange中内容
            sel.execCommand("Copy");
            //复制TextRange中内容
            xlsheet.Paste();
            //粘贴到活动的EXCEL中
            oXL.Visible = true;
            //设置excel可见属性

            try {
                var fname = oXL.Application.GetSaveAsFilename((filename ? filename+ ".xls" : '下载.xls') , "Excel Spreadsheets (*.xls), *.xls");
            } catch (e) {
                print("Nested catch caught " + e);
            } finally {
                oWB.SaveAs(fname);

                oWB.Close(savechanges = false);
                //xls.visible = false;
                oXL.Quit();
                oXL = null;
                //结束excel进程，退出完成
                //window.setInterval("Cleanup();",1);
                idTmr = window.setInterval("Cleanup();", 1);
            }
        } else {
            tableToExcel(tableid, (filename ? filename+'.xls' : '下载.xls'), explorer);
        }
    }

    function Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
    }

    /*
        template ： 定义文档的类型，相当于html页面中顶部的<!DOCTYPE> 声明。（个人理解，不确定）
        encodeURIComponent:解码
        unescape() 函数：对通过 escape() 编码的字符串进行解码。
        window.btoa(window.encodeURIComponent(str)):支持汉字进行解码。
        \w ：匹配包括下划线的任何单词字符。等价于’[A-Za-z0-9_]’
        replace()方法：用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
        {(\w+)}：匹配所有 {1个或更多字符} 形式的字符串；此处匹配输出内容是 “worksheet”
        正则中的() ：是为了提取匹配的字符串。表达式中有几个()就有几个相应的匹配字符串。
        讲解(/{(\w+)}/g, function(m, p) { return c[p]; } ：
            /{(\w+)}/g 匹配出所有形式为“{worksheet}”的字符串；
            function参数：  m  正则所匹配到的内容，即“worksheet”；
                            p  正则表达式中分组的内容,即“(\w+)”分组中匹配到的内容，为“worksheet”；
            c ：为object，见下图3
            c[p] : 为“worksheet”

    */
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            // 下面这段函数作用是：将template中的变量替换为页面内容ctx获取到的值
            format = function(s, c) {
                return s.replace(/{(\w+)}/g,
                    function(m, p) {
                        return c[p];
                    }
                )
            };
        return function(table, name, explorer) {

            if (!table.nodeType) {
                table = document.getElementById(table);
                //setStyleToObj(table);
            }
            // 获取表单的名字和表单查询的内容
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
            // format()函数：通过格式操作使任意类型的数据转换成一个字符串
            // base64()：进行编码
            if (explorer == 'Firefox') //火狐
            {
                window.location.href = uri + base64(format(template, ctx));
            } else {
                //修改如下更改文件名
                var alink = document.createElement('a');
                alink.href = uri + base64(format(template, ctx))
                alink.download = name;
                alink.click();
                alink = null;
            }

        }
    })();
    //最后调用函数
    method5(tableid, filename);
};

//将对象下级设置style，不能设置当前对象的样式(颜色值有兼容问题)
publicJS.prototype.setStyleToObj = function(obj) {
    if (obj.children) {
        for (var i = 0; i < obj.children.length; i++) {
            var styles = getCurrentStyle(obj.children[i]);
            for (var item in styles) {
                if (styles[item] != '') {
                    if (item == 'backgroundColor' || item == 'color' || item == 'borderColor') {
                        //console.log(item + '----' + styles[item].colorHex());
                        obj.children[i].style[item] = styles[item].colorHex();
                    } else {
                        obj.children[i].style[item] = styles[item];
                    }
                }
            }
            setStyleToObj(obj.children[i]);
        }
    } else {
        return;
    }
};
//获取元素的最终样式的集合
publicJS.prototype.getCurrentStyle = function(obj) {
    var res = null;
    if (obj.currentStyle) {
        res = obj.currentStyle;
    } else if (window.getComputedStyle) {
        res = getComputedStyle(obj);
    } else {
        res = obj.style;
    }
    return res;
};










/**************************************div拖动方法（不使用）***************************************/
//3个div 鼠标按下div，移动的div，限制div
function winOpen(clickid, moveid, wrapid) {
    this.clickObj = document.getElementById(clickid);
    this.moveObj = document.getElementById(moveid);
    this.limitObj = document.getElementById(wrapid);
    this.disX = 0;
    this.disY = 0;
    var _this = this;
    if (this.clickObj) {
        this.clickObj.onmousedown = function() {
            _this.fnDown();
        }
    }
}

winOpen.prototype.fnDown = function(ev) {
    var ev = ev || event;
    //此处this指向winOpen对象
    this.disX = ev.clientX - this.moveObj.offsetLeft;
    this.disY = ev.clientY - this.moveObj.offsetTop;
    if (this.clickObj.setCapture) { //设置全局捕获
        this.clickObj.setCapture();
    }
    var _this = this;
    document.onmousemove = function() {
        _this.fnMove();
    }
    document.onmouseup = function() {
        _this.fnUp();
    }
    ev.stopPropagation();
    ev.cancleBubble = true;
    return false;
}

winOpen.prototype.fnMove = function(ev) {
    var ev = ev || event;
    var disL = ev.clientX - this.disX;
    var disT = ev.clientY - this.disY;

    if (disL < 0) {
        disL = 0;
    } else if (disL > this.limitObj.clientWidth - this.moveObj.clientWidth) {
        if (this.limitObj.clientWidth - this.moveObj.clientWidth < 0) {
            disL = 0;
        } else {
            disL = this.limitObj.clientWidth - this.moveObj.clientWidth;
        }

    }
    if (disT < 0) {
        disT = 0;
    } else if (disT > this.limitObj.clientHeight - this.moveObj.clientHeight) {
        if (this.limitObj.clientHeight - this.moveObj.clientHeight < 0) {
            disT = 0;
        } else {
            disT = this.limitObj.clientHeight - this.moveObj.clientHeight;
        }
    }
    this.moveObj.style.left = disL + 'px';
    this.moveObj.style.top = disT + 'px';
    ev.preventDefault();
}

winOpen.prototype.fnUp = function() {
    document.onmousemove = document.onmouseup = null;
    if (this.clickObj.releaseCapture) {
        this.clickObj.releaseCapture();
    }
}

winOpen.prototype.close = function(id) {
    document.getElementById(id).style.display = 'none';
}

/**************************************div拖动方法结束***************************************/

publicJS.prototype.initDrag = function(clickid, moveid, wrapid) {
    return new winOpen(clickid, moveid, wrapid);
};

//继承
function childPublicJS() {
    publicJS.call(this);
}
for (var i in publicJS.prototype) {
    childPublicJS.prototype[i] = publicJS.prototype[i];
}



/******************************************导出wordjs片段**********************************************/
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

// var saveAs = saveAs || (function(view) {
// 	"use strict";
// 	// IE <10 is explicitly unsupported
// 	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
// 		return;
// 	}
// 	var
// 		  doc = view.document
// 		  // only get URL when necessary in case Blob.js hasn't overridden it yet
// 		, get_URL = function() {
// 			return view.URL || view.webkitURL || view;
// 		}
// 		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
// 		, can_use_save_link = "download" in save_link
// 		, click = function(node) {
// 			var event = new MouseEvent("click");
// 			node.dispatchEvent(event);
// 		}
// 		, is_safari = /constructor/i.test(view.HTMLElement)
// 		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
// 		, throw_outside = function(ex) {
// 			(view.setImmediate || view.setTimeout)(function() {
// 				throw ex;
// 			}, 0);
// 		}
// 		, force_saveable_type = "application/octet-stream"
// 		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
// 		, arbitrary_revoke_timeout = 1000 * 40 // in ms
// 		, revoke = function(file) {
// 			var revoker = function() {
// 				if (typeof file === "string") { // file is an object URL
// 					get_URL().revokeObjectURL(file);
// 				} else { // file is a File
// 					file.remove();
// 				}
// 			};
// 			setTimeout(revoker, arbitrary_revoke_timeout);
// 		}
// 		, dispatch = function(filesaver, event_types, event) {
// 			event_types = [].concat(event_types);
// 			var i = event_types.length;
// 			while (i--) {
// 				var listener = filesaver["on" + event_types[i]];
// 				if (typeof listener === "function") {
// 					try {
// 						listener.call(filesaver, event || filesaver);
// 					} catch (ex) {
// 						throw_outside(ex);
// 					}
// 				}
// 			}
// 		}
// 		, auto_bom = function(blob) {
// 			// prepend BOM for UTF-8 XML and text/* types (including HTML)
// 			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
// 			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
// 				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
// 			}
// 			return blob;
// 		}
// 		, FileSaver = function(blob, name, no_auto_bom) {
// 			if (!no_auto_bom) {
// 				blob = auto_bom(blob);
// 			}
// 			// First try a.download, then web filesystem, then object URLs
// 			var
// 				  filesaver = this
// 				, type = blob.type
// 				, force = type === force_saveable_type
// 				, object_url
// 				, dispatch_all = function() {
// 					dispatch(filesaver, "writestart progress write writeend".split(" "));
// 				}
// 				// on any filesys errors revert to saving with object URLs
// 				, fs_error = function() {
// 					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
// 						// Safari doesn't allow downloading of blob urls
// 						var reader = new FileReader();
// 						reader.onloadend = function() {
// 							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
// 							var popup = view.open(url, '_blank');
// 							if(!popup) view.location.href = url;
// 							url=undefined; // release reference before dispatching
// 							filesaver.readyState = filesaver.DONE;
// 							dispatch_all();
// 						};
// 						reader.readAsDataURL(blob);
// 						filesaver.readyState = filesaver.INIT;
// 						return;
// 					}
// 					// don't create more object URLs than needed
// 					if (!object_url) {
// 						object_url = get_URL().createObjectURL(blob);
// 					}
// 					if (force) {
// 						view.location.href = object_url;
// 					} else {
// 						var opened = view.open(object_url, "_blank");
// 						if (!opened) {
// 							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
// 							view.location.href = object_url;
// 						}
// 					}
// 					filesaver.readyState = filesaver.DONE;
// 					dispatch_all();
// 					revoke(object_url);
// 				}
// 			;
// 			filesaver.readyState = filesaver.INIT;

// 			if (can_use_save_link) {
// 				object_url = get_URL().createObjectURL(blob);
// 				setTimeout(function() {
// 					save_link.href = object_url;
// 					save_link.download = name;
// 					click(save_link);
// 					dispatch_all();
// 					revoke(object_url);
// 					filesaver.readyState = filesaver.DONE;
// 				});
// 				return;
// 			}

// 			fs_error();
// 		}
// 		, FS_proto = FileSaver.prototype
// 		, saveAs = function(blob, name, no_auto_bom) {
// 			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
// 		}
// 	;
// 	// IE 10+ (native saveAs)
// 	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
// 		return function(blob, name, no_auto_bom) {
// 			name = name || blob.name || "download";

// 			if (!no_auto_bom) {
// 				blob = auto_bom(blob);
// 			}
// 			return navigator.msSaveOrOpenBlob(blob, name);
// 		};
// 	}

// 	FS_proto.abort = function(){};
// 	FS_proto.readyState = FS_proto.INIT = 0;
// 	FS_proto.WRITING = 1;
// 	FS_proto.DONE = 2;

// 	FS_proto.error =
// 	FS_proto.onwritestart =
// 	FS_proto.onprogress =
// 	FS_proto.onwrite =
// 	FS_proto.onabort =
// 	FS_proto.onerror =
// 	FS_proto.onwriteend =
// 		null;

// 	return saveAs;
// }(
// 	   typeof self !== "undefined" && self
// 	|| typeof window !== "undefined" && window
// 	|| this.content
// ));
// // `self` is undefined in Firefox for Android content script context
// // while `this` is nsIContentFrameMessageManager
// // with an attribute `content` that corresponds to the window

// if (typeof module !== "undefined" && module.exports) {
//   module.exports.saveAs = saveAs;
// } else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
//   define([], function() {
//     return saveAs;
//   });
// }


/******************************************导出wordjs片段结束**********************************************/

/***************************************************jq导出wordjs******************************************************/
// if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
//     (function($) {
//         $.fn.wordExport = function(fileName) {
//             fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
//             var static = {
//                 mhtml: {
//                     top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
//                     head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
//                     body: "<body>_body_</body>"
//                 }
//             };
//             var options = {
//                 maxWidth: 624
//             };
//             // Clone selected element before manipulating it
//             var markup = $(this).clone();

//             // Remove hidden elements from the output
//             markup.each(function() {
//                 var self = $(this);
//                 if (self.is(':hidden'))
//                     self.remove();
//             });

//             // Embed all images using Data URLs
//             var images = Array();
//             var img = markup.find('img');
//             for (var i = 0; i < img.length; i++) {
//                 // Calculate dimensions of output image
//                 var w = Math.min(img[i].width, options.maxWidth);
//                 var h = img[i].height * (w / img[i].width);
//                 // Create canvas for converting image to data URL
//                 var canvas = document.createElement("CANVAS");
//                 canvas.width = w;
//                 canvas.height = h;
//                 // Draw image to canvas
//                 var context = canvas.getContext('2d');
//                 context.drawImage(img[i], 0, 0, w, h);
//                 // Get data URL encoding of image
//                 var uri = canvas.toDataURL("image/png");
//                 $(img[i]).attr("src", img[i].src);
//                 img[i].width = w;
//                 img[i].height = h;
//                 // Save encoded image to array
//                 images[i] = {
//                     type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
//                     encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
//                     location: $(img[i]).attr("src"),
//                     data: uri.substring(uri.indexOf(",") + 1)
//                 };
//             }

//             // Prepare bottom of mhtml file with image data
//             var mhtmlBottom = "\n";
//             for (var i = 0; i < images.length; i++) {
//                 mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
//                 mhtmlBottom += "Content-Location: " + images[i].location + "\n";
//                 mhtmlBottom += "Content-Type: " + images[i].type + "\n";
//                 mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
//                 mhtmlBottom += images[i].data + "\n\n";
//             }
//             mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

//             //TODO: load css from included stylesheet
//             var styles = "";

//             // Aggregate parts of the file together
//             var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;

//             // Create a Blob with the file contents
//             var blob = new Blob([fileContent], {
//                 type: "application/msword;charset=utf-8"
//             });
//             saveAs(blob, fileName + ".doc");
//         };
//     })(jQuery);
// } else {
//     if (typeof jQuery === "undefined") {
//         console.error("jQuery Word Export: missing dependency (jQuery)");
//     }
//     if (typeof saveAs === "undefined") {
//         console.error("jQuery Word Export: missing dependency (FileSaver.js)");
//     }
// }

/*********************************************jq导出wordjs结束******************************************/

