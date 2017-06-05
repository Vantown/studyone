//Firefox44.0，如果再来一局功能用location.reload()实现，则必须带上这两句话
//document.getElementById("hit").disabled = false;
//document.getElementById("stand").disabled = false;

var counter = 0; //发牌次数
var winner = ""; //胜利者 player1 - 电脑/player2 - 玩家
var hasStood = false; //标记玩家是否已经不要牌

//所有的牌
var cards = [
"club01", "club02", "club03", "club04", "club05", "club06", "club07", 
"club08", "club09", "club10", "club11", "club12", "club13", "diamond01", 
"diamond02", "diamond03", "diamond04", "diamond05", "diamond06", "diamond07",
"diamond08", "diamond09", "diamond10", "diamond11", "diamond12", "diamond13", 
"heart01", "heart02", "heart03", "heart04", "heart05", "heart06", "heart07", 
"heart08", "heart09", "heart10", "heart11", "heart12", "heart13", 
"spade01", "spade02", "spade03", "spade04", "spade05", "spade06", "spade07", 
"spade08", "spade09", "spade10", "spade11", "spade12", "spade13"];

//生成随机数
var getRand = function (begin, end) {
    return Math.floor(Math.random() * (end - begin)) + begin;
}

//洗牌
var rand, tmp;
for (var i = 0; i < 1000; i++) {
    rand = getRand(1, 52);
    tmp = cards[0];
    cards[0] = cards[rand];
    cards[rand] = tmp;
}

//玩家手牌
var cards1 = [getNewCard(), getNewCard()];
var cards2 = [getNewCard(), getNewCard()];

var table = document.getElementById("tableboard");
table.rows[0].cells[1].innerHTML = "<img src=\"resource\\cardback.png\" />";
table.rows[0].cells[2].innerHTML = "<img src=\"resource\\" + cards1[1] + ".jpg\" />";
table.rows[1].cells[1].innerHTML = "<img src=\"resource\\" + cards2[0] + ".jpg\" />";
table.rows[1].cells[2].innerHTML = "<img src=\"resource\\" + cards2[1] + ".jpg\" />";
showScore();

//玩家再要一张牌
function hit() {
    getNewCard("player2");
    if(checkIfBust("player2")) {
        document.getElementById("bulletin").innerHTML = "你爆了 (You BUST!)";
        document.getElementById("hit").disabled = true;
        document.getElementById("stand").disabled = true;
        winner = "player1";
    }
    showScore();
}

//玩家选择不要了
function stand() {
    hasStood = true;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    table.rows[0].cells[1].innerHTML = "<img src=\"resource\\" + cards1[0] + ".jpg\" />";
    //电脑开始要牌
    while (calcResult("player1") < 17) {
        getNewCard("player1");
        if(checkIfBust("player1")) {
            document.getElementById("bulletin").innerHTML = "电脑爆了 (Computer BUST!)";
            document.getElementById("hit").disabled = true;
            document.getElementById("stand").disabled = true;
            winner = "player2";
        }
    }
    //如两名玩家都未爆掉，则以分数高者为胜
    if (winner == "") {
        var result1 = calcResult("player1");
        var result2 = calcResult("player2");
        if (result1 == result2) {
            document.getElementById("bulletin").innerHTML = "平局 (PUSH!)";
        } else if (result1 > result2) {
            document.getElementById("bulletin").innerHTML = "你输了 (You LOSE)";
        } else if (result1 < result2) {
            document.getElementById("bulletin").innerHTML = "你赢了 (You WIN!)";
        }
    }
    showScore();
}

//获取一张新牌
function getNewCard(player) {
    var card = cards[counter++];
    if (player == "player1") {
        var len = cards1.length;
        cards1[len] = card;
        table.rows[0].cells[len + 1].innerHTML = 
            "<img src=\"resource\\" + cards1[len] + ".jpg\" />";
    } else if (player == "player2") {
        var len = cards2.length;
        cards2[len] = card;
        table.rows[1].cells[len + 1].innerHTML = 
            "<img src=\"resource\\" + cards2[len] + ".jpg\" />";
    }
    return card;
}

//判断当前情况是否爆掉
function checkIfBust(player) {
    var result = 0;
    if (player == "player1") {
        for (var i = 0; i < cards1.length; i++) {
            //parseInt一定要指定10进制，否则IE8下报错
            var c = parseInt(cards1[i].substr(cards1[i].length - 2), "10");
            if (c > 10) {
                c = 10;
            }
            result += c;
        }
        if (result > 21) {
            return true;
        } else {
            return false;
        }
    } else if (player == "player2") {
        for (var i = 0; i < cards2.length; i++) {
            var c = parseInt(cards2[i].substr(cards2[i].length - 2), "10");
            if (c > 10) {
                c = 10;
            }
            result += c;
        }
        if (result > 21) {
            return true;
        } else {
            return false;
        }
    }
}

//计算一名玩家的得分分数
function calcResult(player) {
    var result = 0;
    var countOfA = 0;
    if (player == "player1") {
        for (var i = 0; i < cards1.length; i++) {
            var c = parseInt(cards1[i].substr(cards1[i].length - 2), "10");
            if (c > 10) {
                c = 10;
            } else if (c == 1) {
                countOfA++;
            }
            result += c;
        }
        for (var i = 0; i < countOfA; i++) {
            if (result + 10 <= 21) {
                result += 10;
            } else {
                break;
            }
        }
    } else {
        for (var i = 0; i < cards2.length; i++) {
            var c = parseInt(cards2[i].substr(cards2[i].length - 2), "10");
            if (c > 10) {
                c = 10;
            } else if (c == 1) {
                countOfA++;
            }
            result += c;
        }
        for (var i = 0; i < countOfA; i++) {
            if (result + 10 <= 21) {
                result += 10;
            } else {
                break;
            }
        }
    }
    return result;
}

function showScore() {
    var result1 = calcResult("player1");
    var result2 = calcResult("player2");
    document.getElementById("score").innerHTML = 
        "[Computer : You = " + (hasStood == true ? result1 : "?") + " : " + result2 + "]";
}

function restart() {
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    counter = 0; //发牌次数
    winner = ""; //胜利者 player1 - 电脑/player2 - 玩家
    hasStood = false; //标记玩家是否已经不要牌
    cards = [
    "club01", "club02", "club03", "club04", "club05", "club06", "club07", 
    "club08", "club09", "club10", "club11", "club12", "club13", "diamond01", 
    "diamond02", "diamond03", "diamond04", "diamond05", "diamond06", "diamond07",
    "diamond08", "diamond09", "diamond10", "diamond11", "diamond12", "diamond13", 
    "heart01", "heart02", "heart03", "heart04", "heart05", "heart06", "heart07", 
    "heart08", "heart09", "heart10", "heart11", "heart12", "heart13", 
    "spade01", "spade02", "spade03", "spade04", "spade05", "spade06", "spade07", 
    "spade08", "spade09", "spade10", "spade11", "spade12", "spade13"];
    //洗牌
    for (var i = 0; i < 1000; i++) {
        rand = getRand(1, 52);
        tmp = cards[0];
        cards[0] = cards[rand];
        cards[rand] = tmp;
    }
    //玩家手牌
    cards1 = [getNewCard(), getNewCard()];
    cards2 = [getNewCard(), getNewCard()];
    table.rows[0].cells[1].innerHTML = "<img src=\"resource\\cardback.png\" />";
    table.rows[0].cells[2].innerHTML = "<img src=\"resource\\" + cards1[1] + ".jpg\" />";
    table.rows[1].cells[1].innerHTML = "<img src=\"resource\\" + cards2[0] + ".jpg\" />";
    table.rows[1].cells[2].innerHTML = "<img src=\"resource\\" + cards2[1] + ".jpg\" />";
    //清空牌桌
    for (var i = 3; i < table.rows[0].cells.length; i++) {
        table.rows[0].cells[i].innerHTML = "";
        table.rows[1].cells[i].innerHTML = "";
    }
    showScore();
    document.getElementById("bulletin").innerHTML = "请做出选择 (Please make a choice.)";
}

/*
//播放背景音乐 - Chrome46.0.2490.80m有效，Firefox44.0无效
var mp3snd = "./bgm.ogg";
var bkcolor = "000000";
if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
    document.write('<bgsound src="' + mp3snd + '" loop="-1">');
} else if (navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
    document.write('<object data="' + mp3snd + '" type="application/x-mplayer2" width="0" height="0">');
    document.write('<param name="filename" value="' + mp3snd + '">');
    document.write('<param name="autostart" value="1">');
    document.write('<param name="playcount" value="infinite">');
    document.write('</object>');
} else {
    document.write('<audio src="' + mp3snd + '" autoplay="autoplay" loop="loop">');
    document.write('<object data="' + mp3snd + '" type="application/x-mplayer2" width="0" height="0">');
    document.write('<param name="filename" value="' + mp3snd + '">');
    document.write('<param name="autostart" value="1">');
    document.write('<embed height="2" width="2" src="' + mp3snd + '" pluginspage="http://www.apple.com/quicktime/download/" type="video/quicktime" controller="false" controls="false" autoplay="true" autostart="true" loop="true" bgcolor="#' + bkcolor + '"><br>');
    document.write('</embed></object>');
    document.write('</audio>');
}*/