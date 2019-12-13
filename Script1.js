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


