/** 
    @ Name : Kingwell Javascript Library 
    @ Author :kingwell 
    @ Date : 2012-8-22 
    @ Email : jinhua.leng##gmail.com 
    @ Version : 1.2 
    @ Update : http://kingwell-leng.iteye.com/blog/1570768 
    功能： 
    1:  $ID选择 
    2： 事件绑定，事件移除，获取事件目标 
    3： 阻止冒泡，阻止默认事件 
    4： 显示隐藏 
    5： 去除HTML 
    6： 去除首尾空格 
    7： 获取URL参数 
    8： Cookie操作，设置，删除，获取 
    9： 清除所有Cookie 
    10：表格排序 
    11: 动态转入Javascript 
    12: 封装Ajax 
    13：将HTML编码 
    调用方法： 
    KW.x(); 
     */  
    (function () {  
        if (!window.KW) {  
            window.KW = {};  
        };  
        window.KW = {  
            version : "1.2",  
            $ : function () { //$()函数  
				doument.write('1111');
            },  
            /*-------------------- 事件处理 --------------------*/  
            addEvent : function () { //-----添加事件;  
                 alert(2222);
            },  
            
              
        };  
          
    })();