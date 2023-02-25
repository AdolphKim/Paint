const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d"); // 붓
const lineWidth = document.querySelector("#line-width");
const clearButton = document.querySelector("#clear");
const lineColor = document.querySelector("#line-color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.getElementById("mode-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveButton = document.getElementById("save");
canvas.width =800;
canvas.height = 800;
ctx.lineCap = "round";
ctx.lineWidth = lineWidth.value;
/*
const colors =[
    "#ff3838",
    "#ffb8b8",
    "#1abc9c",
    "#2ecc71",
    "#8e44ad",
    "#d35400",
    "#95a5a6"
]
var startX = 0;
var startY = 0;
function onMousemove(event){
    ctx.beginPath()
    const color = colors[Math.floor(Math.random() * colors.length)]
    ctx.moveTo(startX,startY);
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX,event.offsetY)
    ctx.stroke();
}

function onClick(event){
    startX = event.offsetX;
    startY = event.offsetY;
}
canvas.addEventListener("mousemove",onMousemove);
canvas.addEventListener("click",onClick);
*/ 

let isPainting = false;
let isFilling = false;
function onMousemove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY);
    ctx.beginPath();
}
function onMousedown(event){
    isPainting = true;
}
function onMouseup(event){
    isPainting = false;
}
function changeLinewidth(event){
    ctx.beginPath();
    ctx.lineWidth = event.target.value;
}
function clear(event){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.beginPath()
}
function changeLinecolor(event){
    changeColor(event.target.value);
}
function onColorClick(event){
    changeColor(event.target.dataset.color)
    lineColor.value = event.target.dataset.color;
}
function changeColor(color){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function onModeClick(event){
    if(isFilling){
        isFilling =false;
        modeBtn.innerText ="Fill";
        ctx.beginPath();
    }
    else{
        isFilling =true;
        modeBtn.innerText = "Draw";
    }
}
function onCanvasClick(event){
    if(isFilling){
        ctx.fillRect(0,0,800,800);
    }
    
}
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file)
    const image = new Image();
    image.src =url;
    image.onload = function(){
        ctx.drawImage(image,0,0,800,800);
    }

}

function onDoubleClick(event){
    const text = textInput.value;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.font= "68px serif";
    ctx.fillText(text,event.offsetX,event.offsetY);
    ctx.restore();
}

function onSaveClick(event){
    const url = canvas.toDataURL();
    const a = document.createElement("a")
    a.href = url
    a.download = "myDrawing.png"
    a.click();
}
canvas.addEventListener("mousemove",onMousemove)
canvas.addEventListener("click",onCanvasClick);
window.addEventListener("mousedown",onMousedown)
window.addEventListener("mouseup",onMouseup);
lineWidth.addEventListener("change",changeLinewidth)
clearButton.addEventListener("click",clear)
lineColor.addEventListener("change",changeLinecolor)
colorOptions.forEach(color => color.addEventListener("click",onColorClick));
modeBtn.addEventListener("click",onModeClick);
fileInput.addEventListener("change",onFileChange);
canvas.addEventListener("dblclick",onDoubleClick);
saveButton.addEventListener("click",onSaveClick);