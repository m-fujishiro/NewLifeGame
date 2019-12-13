// JavaScript source code
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
        $(".board").append($("<div>", { class: "cell none", id: "cell-" + i + "-" + j}));
    }
}
for (let i = 0; i < 2; i++) {
    let white = $("#cell-" + Math.floor(Math.random() * 15) + "-" + Math.floor(Math.random() * 15));
    $(white).addClass("white");
    $(white).removeClass("none");
}
{
    let black = $("#cell-" + Math.floor(Math.random() * 15) + "-" + Math.floor(Math.random() * 15));
    $(black).addClass("black");
    $(black).removeClass("none");
}

function White(this_selector) {
    //選択状態を取得する
    var isSelected = $(this_selector).hasClass("selected");
    //全部のselected属性を消す
    $(".selected").removeClass("selected");
    // $(this)にisSelectedがfalseならaddClassする
    if (!isSelected) $(this_selector).addClass("selected");
}

//二回目以降色が変わらない
//むしろ何故か一回目は色が変わってしまう、のか？
function None(this_selector) {
    var selected = $(".selected");
    //選択状態が無かったら終了
    if ($(selected).length < 1) return;
    console.assert($(selected).length === 1, "選択状態が複数存在します。");
    $(this_selector).removeClass();
    $(this_selector).addClass($(selected).attr("class"));
    var old_color = $(this_selector).css("background-color");
    $(this_selector).css("background-color", $(selected).css("background-color"));
    $(selected).removeClass();
    $(selected).addClass("cell none");
    $(selected).css("background-color", old_color);
    $(this_selector).removeClass("selected");
}

$(".cell").click(function () {
    if ($(this).hasClass("white")) White($(this));
    else if ($(this).hasClass("none")) None($(this));
});

function Next() {
    /*
     * Whiteの白さ+25%,Blackの白さ-25%
     * 一時的になんか変数作って色を最後に適応しよう
     * 0%=>-25%, 25%=>0%, 50%=>50%, 75%=>100%, 100%=>125%
     */
    var white_value = Array(15);
    for (let i = 0; i < 15; i++) {
        white_value[i] = Array(15);
        for (let j = 0; j < 15; j++) {
            let color = $("#cell-" + i + "-" + j).css("background-color");
            switch (color) {
                case "rgb(0, 0, 0)": white_value[i][j] = -25; break;
                case "rgb(64, 64, 64)": white_value[i][j] = 0; break;
                case "rgb(128, 128, 128)": white_value[i][j] = 50; break;
                case "rgb(191, 191, 191)": white_value[i][j] = 100; break;
                case "rgb(255, 255, 255)": white_value[i][j] = 125; break;
                default: console.log(color); white_value[i][j] = 50; break;
            }
        }
    }
    /*
     * white属性のものと接していたら+25%
     * black属性のものと接していたら-25%
     */
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            if (i > 0) {
                if ($("#cell-" + (i - 1) + "-" + j).hasClass("white")) white_value[i][j] += 25;
                else if ($("#cell-" + (i - 1) + "-" + j).hasClass("black")) white_value[i][j] -= 25;
            }
            if (i + 1 < 15) {
                if ($("#cell-" + (i + 1) + "-" + j).hasClass("white")) white_value[i][j] += 25;
                else if ($("#cell-" + (i + 1) + "-" + j).hasClass("black")) white_value[i][j] -= 25;
            }
            if (j > 0) {
                if ($("#cell-" + i + "-" + (j - 1)).hasClass("white")) white_value[i][j] += 25;
                else if ($("#cell-" + i + "-" + (j - 1)).hasClass("black")) white_value[i][j] -= 25;
            }
            if (j + 1 < 15) {
                if ($("#cell-" + i + "-" + (j + 1)).hasClass("white")) white_value[i][j] += 25;
                else if ($("#cell-" + i + "-" + (j + 1)).hasClass("black")) white_value[i][j] -= 25;
            }

            /*
             * 0以下だったら0%,100%以上だったら100%に変える
             */
            if (white_value[i][j] < 0) white_value[i][j] = 0;
            else if (white_value[i][j] > 100) white_value[i][j] = 100;
        }
    }
    /*
     * セルのクラスをcellクラスのみにする
     *  0%, 25%はblack属性
     * 75%,100%はwhite属性をつける
     * 50%はnone属性をつける
     * 0%{background-color:#000000},25%{background-color:#404040},50%{background-color:#808080},75%{background-color:#BFBFBF},100%{background-color:#FFFFFF}
     */
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let selector = $("#cell-" + i + "-" + j);
            $(selector).removeClass();
            $(selector).addClass("cell");
            let class_name = white_value[i][j] > 50 ? "white" : white_value[i][j] < 50 ? "black" : "none";
            $(selector).addClass(class_name);
            let color = white_value[i][j] === 0 ? "#000000" : white_value[i][j] < 50 ? "#404040" :
                white_value[i][j] === 50 ? "#808080" : white_value[i][j] < 100 ? "#BFBFBF" : "#FFFFFF";
            $(selector).css("background-color", color);
        }
    }
    if ($(".none").length < 1) return;
    do {
        var black = $("#cell-" + Math.floor(Math.random() * 15) + "-" + Math.floor(Math.random() * 15));
    } while (!$(black).hasClass("none"));
    $(black).addClass("black");
    $(black).removeClass("none");
    $(black).text("B");
}


