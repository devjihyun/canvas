const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const linewidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // context = brush 역할

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = linewidth.value;

let isPainting = false;
let isFilling = false;

function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    } // isPainting = ture 일 경우 그리기
    ctx.moveTo(event.offsetX, event.offsetY); // isPainting 아닐 경우 브러쉬만 움직이기
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    ctx.beginPath();  // 새로운 path로 시작하게 하기
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if(isFilling) {
        isFilling = false
        modeBtn.innerText = "Fill Mode"
    } else {
        isFilling = true
        modeBtn.innerText = "Draw Mode"
    }
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, 800, 800);
    }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

linewidth.addEventListener("change", onLineWidthChange);

color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click",
onColorClick));

modeBtn.addEventListener("click", onModeClick);