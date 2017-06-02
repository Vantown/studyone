//js是utf-8，在notepad++里查看，想输出的提示不乱码，新建一个文本用notepad++改为bg2312再放进来
    function validate() {
        var find = document.getElementById("search").value;
        var classkey = document.getElementById("key").value;
        if (find==""){
            alert("请输入搜索内容");
        }else {
            //1、创建XMLHttpRequest对象
            //2、需要针对IE和其它浏览器建立这个对象的不同方式写不同的代码
            if (window.XMLHttpRequest) {
                //针对FF,Mozilar,Opera,Safari,IE7,IE8
                xmlhttp = new XMLHttpRequest();
                //修正某些浏览器bug
                if (xmlhttp.overrideMimeType) {
                    xmlhttp.overrideMimeType("text/xml");
                }
            } else if (window.ActiveXObject) {
                //针对IE6以下的浏览器
                var activexName = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP", ""];
                for (var i = 0; i < activexName.length; i++) {
                    try {
                        //取出一个控件名称创建,如果创建成功则停止,反之抛出异常
                        xmlhttp = new ActiveXObject(activexName[i]);
                        break;
                    } catch (e) {
                    }
                }
            }

            //需要确认xmlhttp创建是否成功
            if (!xmlhttp) {
                alert("XMLHTTPRequest创建失败!");
                return;
            } else {
                //alert(xmlhttp);
            }

            //注册回调函数。注意注册回调函数是不能加括号,加了会把函数的值返回给onreadystatechange
            xmlhttp.onreadystatechange = callback;
            //设置连接信息
            //第一个参数表示http请求方式,支持所有http的请求方式,主要使用get和post
            //第二个参数表示请求的url地址,get方式请求的参数也在urlKh
            //第三介参数表示采用异步还是同步方式交互,true表示异步
            xmlhttp.open("POST", "http://api.zhongyuedu.com/test/sou.php", true);
            //发送数据表示和服务器端交互
            //同步方式下,send这名话会在服务器端数据回来后才执行完
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("find=" + find + "&keyw=" + classkey);

            //异步方式下,send这句话立即完成执行
            //POST方式请求的代码
            //xmlhttp.open("POST","servlet/CheckUserName",true);
            //POST方式需要自己设置http的请求头
            //xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            //POST方式发送数据
            //xmlhttp.send("userName="+userName);
        }
    }

    //回调函数
    function callback() {
        //判断对象的状态是交互完成
        if (xmlhttp.readyState == 4) {
            //判断http的交互是否成功
            if (xmlhttp.status == 200) {
                //获取服务器端返回的数据
                //获取服务器端输出的纯文本数据
                var resultS = xmlhttp.responseText;
                //console.log(resultS);
                if (resultS.length == 2) {
                    alert("无搜索匹配结果");
                }
                //var resultS1 = JSON.parse(resultS);
                var resultSS = JSON.parse(xmlhttp.responseText);
                var l = resultSS.length;
                //var resultSS =eval('(' + resultS + ')');      //单引号双引号一样
                //var resultSS =eval("("+resultS + ")");
                //将数据显示在页面上
                //console.log(resultSS[0].title);
                //console.log(resultSS.length);
                //var showResult = document.getElementById("result");
                //设置元素节点的html内容
                //showResult.innerHTML = resultSS[0].title;

                for (i = 0; i < l; i++) {
                    var divresult = document.getElementById("result");
                    var urlresult = document.createElement("a");
                    divresult.appendChild(urlresult);
                    urlresult.href = resultSS[i].url;
                    urlresult.innerHTML = resultSS[i].title;
                    urlresult.style.display = "block";
                    urlresult.style.width = "100%";
                    urlresult.style.height = "30px";
                    urlresult.style.lineHeight = "30px";
                    urlresult.style.fontSize = ".8rem";
                    urlresult.style.color = "#000";
                    urlresult.style.textDecoration = "none";
                    urlresult.style.fontWeight = "Microsoft Yahei";
                    urlresult.style.whiteSpace = "nowrap";
                }
                document.getElementById('hideZ').style.display = "none";
            }
        }
    }