<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="MixstationLibraryDMS.Web.DMSWeb.Main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="Css/main.css" rel="stylesheet" />
    <script src="JS/jquery-1.8.2.min.js"></script>
    <title></title>
    <style>
        .clear {
            zoom: 1;
        }

            .clear:after {
                content: "";
                display: block;
                clear: both;
            }

        form {
            width: 100%;
            font-size: 14px;
        }

        #main_head {
            background: url(images/headbg.jpg) no-repeat 0 0 #203f80;
            height: 60px;
        }

            #main_head div {
                height: 60px;
                line-height: 60px;
                color: white;
                text-align: right;
                margin-right: 20px;
            }

            #main_head span {
                display: inline-block;
                height: 17px;
                padding: 0 10px 0 30px;
                line-height: 17px;
            }

        #main_menu {
            background: url(images/menubg.png) repeat-x 0 0 #2b94f2;
            color: white;
            line-height: 34px;
        }

            #main_menu label, a, p {
                float: left;
                height: 34px;
                line-height: 34px;
                padding: 0 25px;
                text-decoration:none;
                color:white;
            }

            #main_menu i {
                float: left;
                font-style: normal;
            }

        #nav {
            padding: 0;
            margin: 0;
        }

            #nav div {
                text-decoration: none;
                display: block;
                height: 34px;
                float: left;
                cursor: pointer;
            }

            #nav div {
                position: relative;
            }

                #nav div ul {
                    position: absolute;
                    left: 0;
                    top: 34px;
                    color: white;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    background: #b4b4b4;
                    width: 100%;
                    display: none;
                }

                    #nav div ul li {
                        height: 35px;
                        text-align: center;
                        width: 100%;
                    }

                        #nav div ul li a {
                            width: 86%;
                            border-bottom: 1px solid #949494;
                            margin: 0 7%;
                            padding: 0;
                            text-decoration:none;
                            color:white;
                        }

        #main_content {
            width:100%;
        }
        #main_left {
            width:30%;
            float:left;
            border:1px solid red;
        }
        #main_right {
            width:65%;
            float:left;
            border:1px solid red;
        }
            #main_right iframe {
                width:100%;
                height:500px;
            }

    </style>
    <script type="text/javascript">
        window.onload = function () {
            var menuArray = JSON.parse($('#hid_menuJsons').val());
            initMenu(menuArray);
        };
        //初始化菜单
        function initMenu(arr) {
            //筛选出一级菜单和二级菜单
            var arr1 = new Array();
            var arr2 = new Array();
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].level == '1') {
                    arr1.push(arr[i]);
                } else if (arr[i].level == '2') {
                    arr2.push(arr[i]);
                }
            }
            for (var j = 0; j < arr1.length; j++) {

                html += '<div><a class="onceOrder" href="javascript://" onclick="redirectTo(\'' + arr1[j].src + '\');">' + arr1[j].name + '</a>';
                html += '<ul>';
                
                for (var m = 0; m < arr2.length; m++) {
                    if (arr2[m].parentCode == arr1[j].code) {
                        html += '<li><a href="javascript://" onclick="redirectTo(\''+arr2[m].src+'\');">'+arr2[m].name+'</a></li>';
                    }
                }
                html += "</ul></div><i>|</i>";
                
            }

            $('#nav').append($(html));


            //给一级菜单绑定点击事件
            var allA = $('#nav div a[class="onceOrder"]');
            for (var i = 0; i < allA.length; i++) {
                allA[i].onclick = showUl;
            }
        }

        //二级菜单显示和隐藏
        function showUl() {
            var _this = this;
            $('#nav').find('ul').each(function (index, e) {
                if ($(e).css('display') != 'none') {
                    $(e).slideUp();
                }
            });
            var oUl = $(_this).next('ul');
            if (oUl.css('display') == 'none') {
                oUl.slideDown();
            } else {
                oUl.slideUp();
            }
        };
        //二级菜单控制iframe跳转
        function redirectTo(url){
            if (url&&url!="undefined") {
                var bhjbh = $('#hid_bhjbh').val();
                if (bhjbh) {
                    url += (url.indexOf("?") > -1 ? "&" : "?") + "bhjbh=" + bhjbh;
                }
                $('#frameBody').attr('src', url);
                showUl();
            }
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hid_bhjbh" runat="server" />
        <asp:HiddenField ID="hid_menuJsons" runat="server" />
        <div id="main_head">
            <div class="clear">
                欢迎您<span style="background: url(images/user.png) no-repeat 10px 0;">额额</span>|<span style="background: url(images/help.png) no-repeat 10px 0;">帮助</span>|<span style="background: url(images/exit.png) no-repeat 10px 0; cursor: pointer;">退出</span>
            </div>
        </div>
        <div id="main_menu" class="clear">
            <label>今天是2017年5月12日，星期五</label><i>|</i>
            <a>首页</a><i>|</i>
            <div id="nav">
            </div>
        </div>
        <div id="main_content">

            <div id="main_left">
                <ul id="tree"></ul>
                <div id="showPhone"></div>
            </div>
            <div id="main_right">
                <iframe id="frameBody" src="index.aspx"></iframe>
            </div>
        </div>
    </form>
</body>
</html>
