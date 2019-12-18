//CSS样式 初始化
(function () {
    for (var i = 0; i < 100; i++) {
        $(".board").append("<li></li>");
        if (i < 10) {
            $(".board").children().eq(i).css({
                "margin-top": "2px"
            })
        }
        if (i % 10 == 0) {
            $(".board").children().eq(i).css({
                "margin-left": "2px"
            })
        }
    }
    for (var i = 0; i < 4; i++) {
        $(".corner").append("<div></div>");
    }
    for (var i = 0; i < 4; i++) {
        $(".corner").children().eq(i).css({
            transform: "rotate(" + (45 + 90 * i) + "deg)",
            height: Math.SQRT2 * 3 + "px",
            width: Math.SQRT2 * 6 + "px"
        });
    }
})();
//把扫雷排序存到数组中
let rank = [];
//生成随机数
let bull = [];
//game over
var gameover = 1;

function randomNum() {
    let x = Math.round(Math.random() * 99);
    for (var a = 0; a < bull.length; a++) {
        if (x == bull[a]) {
            x = randomNum();
        }
    }
    return x;
}
//生成炸弹
for (var p = 0; p < 10; p++) {
    bull.push(randomNum())
    rank[bull[p]] = '💣';
}
//生成数字
for (var p = 0; p < 100; p++) {
    if (rank[p] != '💣') {
        var x = 0;
        if (p % 10 != 0 && p - 11 >= 0 && rank[p - 11] == '💣') {
            x++;
        }
        if (p - 10 >= 0 && rank[p - 10] == '💣') {
            x++;
        }
        if ((p + 1) % 10 != 0 && p - 9 >= 0 && rank[p - 9] == '💣') {
            x++;
        }
        if (p % 10 != 0 && p - 1 >= 0 && rank[p - 1] == '💣') {
            x++;
        }
        if ((p + 1) % 10 && p + 1 < 100 && rank[p + 1] == '💣') {
            x++;
        }
        if ((p + 1) % 10 && p + 11 < 100 && rank[p + 11] == '💣') {
            x++;
        }
        if (p + 10 < 100 && rank[p + 10] == '💣') {
            x++;
        }
        if (p % 10 != 0 && p + 9 < 100 && rank[p + 9] == '💣') {
            x++;
        }
        //$("li")[p].innerText = x;
        if (x == 0) {
            x = "\xa0";
        }
        rank[p] = x;
    }
}

//数字为零时候显示周围数字 或者双击显示周围数字
function xxxx(p) {
    if (p % 10 != 0 && p - 11 >= 0 && ($("li")[p - 11].innerText == '')) {
        $("li")[p - 11].innerText = rank[p - 11];
        color(p - 11);
        $("li")[p - 11].style.background = "#f1f1f1";
        if (rank[p - 11] == 0) {
            xxxx(p - 11)
        }
    }
    if (p - 10 >= 0 && ($("li")[p - 10].innerText == '')) {
        $("li")[p - 10].innerText = rank[p - 10];
        color(p - 10);
        $("li")[p - 10].style.background = "#f1f1f1";
        if (rank[p - 10] == 0) {
            xxxx(p - 10)
        }
    }
    if ((p + 1) % 10 != 0 && p - 9 >= 0 && ($("li")[p - 9].innerText == '')) {
        $("li")[p - 9].innerText = rank[p - 9];
        color(p - 9);
        $("li")[p - 9].style.background = "#f1f1f1";
        if (rank[p - 9] == 0) {
            xxxx(p - 9)
        }
    }
    if (p % 10 != 0 && p - 1 >= 0 && ($("li")[p - 1].innerText == '')) {
        $("li")[p - 1].innerText = rank[p - 1];
        color(p - 1);
        $("li")[p - 1].style.background = "#f1f1f1";
        if (rank[p - 1] == 0) {
            xxxx(p - 1)
        }
    }
    if ((p + 1) % 10 != 0 && p + 1 < 100 && ($("li")[p + 1].innerText == '')) {
        $("li")[p + 1].innerText = rank[p + 1];
        color(p + 1);
        $("li")[p + 1].style.background = "#f1f1f1";
        if (rank[p + 1] == 0) {
            xxxx(p + 1)
        }
    }
    if (p % 10 != 0 && p + 9 < 100 && ($("li")[p + 9].innerText == '')) {
        $("li")[p + 9].innerText = rank[p + 9];
        color(p + 9);
        $("li")[p + 9].style.background = "#f1f1f1";
        if (rank[p + 9] == 0) {
            xxxx(p + 9)
        }
    }
    if (p + 10 < 100 && ($("li")[p + 10].innerText == '')) {
        $("li")[p + 10].innerText = rank[p + 10];
        color(p + 10);
        $("li")[p + 10].style.background = "#f1f1f1";
        if (rank[p + 10] == 0) {
            xxxx(p + 10)
        }
    }
    if ((p + 1) % 10 != 0 && p + 11 < 100 && ($("li")[p + 11].innerText == '')) {
        $("li")[p + 11].innerText = rank[p + 11];
        color(p + 11);
        $("li")[p + 11].style.background = "#f1f1f1";
        if (rank[p + 11] == 0) {
            xxxx(p + 11)
        }
    }

    return 1;
}

//游戏胜利判定
function yyyy() {
    let x = 0;
    for (var i = 0; i < 100; i++) {
        if ($(".board li")[i].innerText == "" || $(".board li")[i].innerText == "🚩") {
            x++;
        }
    }
    //console.log("x", x);

    if (x == 10) {
        $(".over")[0].innerText = "Good Game"
        $(".over").css("display", "block");
        $(".board li").unbind();
    }
}

//游戏进行中点击事件
function aaaa() {
    $(this)[0].innerText = rank[$(this).index()];
    color($(this).index());
    $("li")[$(this).index()].style.background = "#f1f1f1"
    if ($(this)[0].innerText == 0) {
        xxxx($(this).index())
    }

    yyyy();
}
//每个数字有自己的颜色  // 并且如果是雷的话则失败
function color(i) {

    if (rank[i] == 1) {
        $("li")[i].style.color = "lightskyblue";
    }
    if (rank[i] == 2) {
        $("li")[i].style.color = "lightgreen";
    }
    if (rank[i] == 3) {
        $("li")[i].style.color = "lightpink";
    }
    if (rank[i] == 4) {
        $("li")[i].style.color = "lightsalmon";
    }
    if (rank[i] == 5) {
        $("li")[i].style.color = "lightseagreen";
    }
    if (rank[i] == 6) {
        $("li")[i].style.color = "lightgrey";
    }
    if (rank[i] == 7) {
        $("li")[i].style.color = "lightcoral";
    }
    if (rank[i] == 8) {
        $("li")[i].style.color = "red";
    }
    if (rank[i] == '💣') {
        $(".over").css("display", "block");
        $(".board li").unbind();
    }

}

//周围旗子的数量
function flag(p) {
    var x = 0;
    if (p % 10 != 0 && p - 11 >= 0 && ($("li")[p - 11].innerText == '🚩')) {
        x++;
    }
    if (p - 10 >= 0 && ($("li")[p - 10].innerText == '🚩')) {
        x++;
    }
    if ((p + 1) % 10 != 0 && p - 9 >= 0 && ($("li")[p - 9].innerText == '🚩')) {
        x++;
    }
    if (p % 10 != 0 && p - 1 >= 0 && ($("li")[p - 1].innerText == '🚩')) {
        x++;
    }
    if ((p + 1) % 10 && p + 1 < 100 && ($("li")[p + 1].innerText == '🚩')) {
        x++;
    }
    if ((p + 1) % 10 && p + 11 < 100 && ($("li")[p + 11].innerText == '🚩')) {
        x++;
    }
    if (p + 10 < 100 && ($("li")[p + 10].innerText == '🚩')) {
        x++;
    }
    if (p % 10 != 0 && p + 9 < 100 && ($("li")[p + 9].innerText == '🚩')) {
        x++;
    }
    return x;
}

//左右键双击
function double() {
    var x = 0;
    var y = 0;
    $(".board li").mousedown(function (e) {
        var d = new Date();

        if (e.button == 2) {
            x = d.getTime();
        }
        if (e.button == 0) {
            y = d.getTime();
        }

        if (($(this)[0].innerText != "") && Math.abs(x - y) < 100) {

            if (flag($(this).index()) == $(this)[0].innerText) {
                xxxx($(this).index());
            }
            yyyy();
        }
    })
}

if ($(".board li").length > 0) {
    //鼠标离开与进入高亮提示
    $(".board li").mouseover(function () {
        $(this).css({
            background: "#f1f1f1"
        })
    })
    $(".board li").mouseout(function () {
        if ($(this)[0].innerText == "") {
            $(this).css({
                background: "#e0dfdf"
            })
        }

    })
    //点击方格
    $(".board li").on("click", aaaa);

    //在这里你就可以自己定义事件的函数啦
    document.oncontextmenu = function (e) {
        e.preventDefault();
    };
    //右键插旗子
    $(".board li").mouseup(function (e) {
        if (e.button == 2) {
            if ($(this)[0].innerText == "") {
                $(this)[0].innerText = "🚩";
                $(this).off("click", aaaa);
            } else if ($(this)[0].innerText == "🚩") {
                $(this)[0].innerText = "";
                $(this).on("click", aaaa);
            }
        }
    })

    //左右键双击
    double();
}

$(".again").mousedown(function () {
    $(".again").css("background", "#e0dfdf");
})
$(".again").mouseup(function () {
    $(".again").css("background", "#d1d0d0");
    window.location.reload();
})