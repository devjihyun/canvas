const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // context = brush

canvas.width = 800;
canvas.height = 800;
/*
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.fill();
*/

/*
ctx.fillRect(400, 500, 50, 180);
ctx.fillRect(600, 500, 50, 180);
ctx.lineWidth = 2;
ctx.fillRect(500, 580, 50, 100);
ctx.fillRect(400, 500, 200, 20);
ctx.fillRect(400, 680, 250, 10);
ctx.moveTo(400, 500);
ctx.lineTo(525, 350);
ctx.lineTo(650, 500);
ctx.fill();

ctx.beginPath();
ctx.fillRect(215, 200, 15, 100);
ctx.fillRect(350, 200, 15, 100);
ctx.fillRect(260, 200, 60, 200);

ctx.arc(290, 140, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "#fff";
ctx.arc(270, 130, 8, Math.PI, 2 * Math.PI);
ctx.arc(310, 130, 8, Math.PI, 2 * Math.PI);
ctx.fill();
*/

ctx.lineWidth = 2;

const colors = [
    "#cd84f1",
    "#ffcccc",
    "#ff4d4d",
    "#ffaf40",
    "#fffa65",
    "#32ff7e",
    "#e67e22",
    "#7efff5",
    "#18dcff"
]

function onMouseMove(event) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousemove", onMouseMove);