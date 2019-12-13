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

function None(this_selector) {
    var selected = $(".selected");
    //選択状態が無かったら終了
    if ($(selected).length < 1) return;
    console.assert($(selected).length === 1, "選択状態が複数存在します。");

    console.log($(selected).attr("class"));

    $(this_selector).removeClass();
    $(this_selector).addClass($(selected).attr("class"));
    $(this_selector).css("color", $(selected).attr("color"));
    $(selected).removeClass();
    $(selected).addClass("cell none");
    $(this_selector).removeClass("selected");
}

$(".cell").click(function () {
    if ($(this).hasClass("white")) White($(this));
    if ($(this).hasClass("none")) None($(this));
});

function Next() {
    /*
     * Whiteの白さ+25%,Blackの白さ-25%
     * 一時的になんか変数作って色を最後に適応しよう
     * 0%=>-25%, 25%=>0%, 50%=>50%, 75%=>100%, 100%=>125%
     */
    /*
     * white属性のものと接していたら+25%
     * black属性のものと接していたら-25%
     */
    /*
     * 0以下だったら0%,100%以上だったら100%に変える
     * 0%{color:#000000},25%{color:#404040},50%{color:#808080},75%{color:#BFBFBF},100%{color:#FFFFFF}
     */

    /*
     * 全てのセルのクラスをcellクラスのみにする
     * 0%, 25%はblack属性
     * 75%,100%はwhite属性をつける
     * 50%はnone属性をつける
     */
    do {
        var black = $("#cell-" + Math.floor(Math.random() * 15) + "-" + Math.floor(Math.random() * 15));
    } while ($(black).attr("class") !== "cell none");
    $(black).addClass("black");
    $(black).removeClass("none");
    $(black).text("B");
}


