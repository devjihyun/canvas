const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const linewidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // context = brush 역할

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width =  CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = linewidth.value;
ctx.lineCap = "round";

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
        modeBtn.innerText = "🪣 Fill"
    } else {
        isFilling = true
        modeBtn.innerText = "🖌 Draw"
    }
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onResetClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "🪣 Fill"
}

function onFileChange(event) {
    const file = event.target.files[0];
    const  url = URL.createObjectURL(file);
    const image = new Image(); // <img src="">
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onDoubleClick(event) {
    const text = textInput.value;
    if(text !== "") {
        ctx.save(); // 현재 상태 저장
        const text = textInput.value;
        ctx.lineWidth = 1;
        ctx.font = "48px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        // ctx.strokeText(text, event.offsetX, event.offsetY);
        ctx.restore(); // 저장해뒀던 버전으로 되돌리기
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
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
resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);