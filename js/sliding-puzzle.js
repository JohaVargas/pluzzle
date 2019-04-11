$(function () {

    ///////
    
    
    var numberOfPieces = 12,
aspect = "3:4",
aspectW = parseInt(aspect.split(":")[0]),
aspectH = parseInt(aspect.split(":")[1]),
container = $("#puzzle"),
imgContainer = container.find("figure"),
img = imgContainer.find("img"),
path = img.attr("src"),
piece = $("<div/>"),
pieceW = Math.floor(img.width() / aspectW),
pieceH = Math.floor(img.height() / aspectH),
idCounter = 0,
positions = [],
empty = {
top: 0,
left: 0,
bottom: pieceH,
right: pieceW
},
previous = {},
timer,
currentTime = {},
timerDisplay = container.find("#time").find("span");
    
    
    for (var x = 0, y = aspectH; x < y; x++) {
for (var a = 0, b = aspectW; a < b; a++) {
var top = pieceH * x,
left = pieceW * a;
piece.clone()
.attr("id", idCounter++)
.css({
width: pieceW,
height: pieceH,
position: "absolute",
top: top,
left: left,
backgroundImage: ["url(", path,
")"].join(""),
backgroundPosition: [
"-", pieceW * a, "px ",
"-", pieceH * x, "px"
].join("")
}).appendTo(imgContainer);
positions.push({ top: top, left: left });
}
}

        //remove original image
    img.remove();

    //remove first piece from board
    container.find("#0").remove();

    //remove first item in positions array
    positions.shift();
    
    $("#start").on("click", function (e) {
var pieces = imgContainer.children();
function shuffle(array) {
var i = array.length;
if (i === 0) {
return false;
}
while (--i) {
var j = Math.floor(Math.random() * (i + 1)),
tempi = array[i],
tempj = array[j];
array[i] = tempj;
array[j] = tempi;
}
}
shuffle(pieces);
$.each(pieces, function (i) {
pieces.eq(i).css(positions[i]);
});
pieces.appendTo(imgContainer);
empty.top = 0;
empty.left = 0;
container.find("#ui").find("p").not("#time").remove();


    pieces.appendTo(imgContainer).draggable("destroy");
if (timer) {
clearInterval(timer);
timerDisplay.text("00:00:00");
}
timer = setInterval(updateTime, 1000);
currentTime.seconds = 0;
currentTime.minutes = 0;
currentTime.hours = 0;
pieces.draggable({
containment: "parent",
grid: [pieceW, pieceH],
start: function (e, ui) {
},
drag: function (e, ui) {
},
stop: function (e, ui) {
}
});
        });
    
    var current = getPosition(ui.helper);
if (current.left === empty.left) {
ui.helper.draggable("option", "axis", "y");
} else if (current.top === empty.top) {
ui.helper.draggable("option", "axis", "x");
} else {
ui.helper.trigger("mouseup");
return false;
}
if (current.bottom < empty.top ||
current.top > empty.bottom ||
current.left > empty.right ||
current.right < empty.left) {
ui.helper.trigger("mouseup");
return false;
}
previous.top = current.top;
previous.left = current.left;
    
    
    
    var current = getPosition(ui.helper);
ui.helper.draggable("option", "revert", false);
if (current.top === empty.top && current.left === empty.left)
{
ui.helper.trigger("mouseup");
return false;
}
if (current.top > empty.bottom ||
current.bottom < empty.top ||
current.left > empty.right ||
current.right < empty.left) {
ui.helper.trigger("mouseup")
.css({
top: previous.top,
left: previous.left
});
return false;
}

    
    var current = getPosition(ui.helper);
if (current.top === empty.top && current.left === empty.left)
{
empty.top = previous.top;
empty.left = previous.left;
empty.bottom = previous.top + pieceH;
empty.right = previous.left + pieceW;
}

    
    function getPosition(el) {
return {
top: parseInt(el.css("top")),
bottom: parseInt(el.css("top")) + pieceH,
left: parseInt(el.css("left")),
right: parseInt(el.css("left")) + pieceW
}
}

    function updateTime() {
if (currentTime.hours === 23 && currentTime.minutes === 59
&&
    currentTime.seconds === 59) {
clearInterval(timer);
} else if (currentTime.minutes === 59 &&
currentTime.seconds === 59) {
currentTime.hours++;
currentTime.minutes = 0;
currentTime.seconds = 0;
} else if (currentTime.seconds === 59) {
currentTime.minutes++;
currentTime.seconds = 0;
} else {
currentTime.seconds++;
}
newHours = (currentTime.hours <= 9) ? "0" +
currentTime.hours :
currentTime.hours;
newMins = (currentTime.minutes <= 9) ? "0" +
currentTime.minutes :
currentTime.minutes;
newSecs = (currentTime.seconds <= 9) ? "0" +
currentTime.seconds :
currentTime.seconds;
timerDisplay.text([
newHours, ":", newMins, ":", newSecs
].join(""));
}


    
    
    
    
    });



