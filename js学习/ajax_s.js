//js��utf-8����notepad++��鿴�����������ʾ�����룬�½�һ���ı���notepad++��Ϊbg2312�ٷŽ���
    function validate() {
        var find = document.getElementById("search").value;
        var classkey = document.getElementById("key").value;
        if (find==""){
            alert("��������������");
        }else {
            //1������XMLHttpRequest����
            //2����Ҫ���IE����������������������Ĳ�ͬ��ʽд��ͬ�Ĵ���
            if (window.XMLHttpRequest) {
                //���FF,Mozilar,Opera,Safari,IE7,IE8
                xmlhttp = new XMLHttpRequest();
                //����ĳЩ�����bug
                if (xmlhttp.overrideMimeType) {
                    xmlhttp.overrideMimeType("text/xml");
                }
            } else if (window.ActiveXObject) {
                //���IE6���µ������
                var activexName = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP", ""];
                for (var i = 0; i < activexName.length; i++) {
                    try {
                        //ȡ��һ���ؼ����ƴ���,��������ɹ���ֹͣ,��֮�׳��쳣
                        xmlhttp = new ActiveXObject(activexName[i]);
                        break;
                    } catch (e) {
                    }
                }
            }

            //��Ҫȷ��xmlhttp�����Ƿ�ɹ�
            if (!xmlhttp) {
                alert("XMLHTTPRequest����ʧ��!");
                return;
            } else {
                //alert(xmlhttp);
            }

            //ע��ص�������ע��ע��ص������ǲ��ܼ�����,���˻�Ѻ�����ֵ���ظ�onreadystatechange
            xmlhttp.onreadystatechange = callback;
            //����������Ϣ
            //��һ��������ʾhttp����ʽ,֧������http������ʽ,��Ҫʹ��get��post
            //�ڶ���������ʾ�����url��ַ,get��ʽ����Ĳ���Ҳ��urlKh
            //�����������ʾ�����첽����ͬ����ʽ����,true��ʾ�첽
            xmlhttp.open("POST", "http://api.zhongyuedu.com/test/sou.php", true);
            //�������ݱ�ʾ�ͷ������˽���
            //ͬ����ʽ��,send���������ڷ����������ݻ������ִ����
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("find=" + find + "&keyw=" + classkey);

            //�첽��ʽ��,send��仰�������ִ��
            //POST��ʽ����Ĵ���
            //xmlhttp.open("POST","servlet/CheckUserName",true);
            //POST��ʽ��Ҫ�Լ�����http������ͷ
            //xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            //POST��ʽ��������
            //xmlhttp.send("userName="+userName);
        }
    }

    //�ص�����
    function callback() {
        //�ж϶����״̬�ǽ������
        if (xmlhttp.readyState == 4) {
            //�ж�http�Ľ����Ƿ�ɹ�
            if (xmlhttp.status == 200) {
                //��ȡ�������˷��ص�����
                //��ȡ������������Ĵ��ı�����
                var resultS = xmlhttp.responseText;
                //console.log(resultS);
                if (resultS.length == 2) {
                    alert("������ƥ����");
                }
                //var resultS1 = JSON.parse(resultS);
                var resultSS = JSON.parse(xmlhttp.responseText);
                var l = resultSS.length;
                //var resultSS =eval('(' + resultS + ')');      //������˫����һ��
                //var resultSS =eval("("+resultS + ")");
                //��������ʾ��ҳ����
                //console.log(resultSS[0].title);
                //console.log(resultSS.length);
                //var showResult = document.getElementById("result");
                //����Ԫ�ؽڵ��html����
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