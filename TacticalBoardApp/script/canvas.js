
const slider = document.getElementById("slider");
const slider2 = document.getElementById("slider2");
const canvasBox = document.getElementById("canvas");
const layout = document.getElementById("board-container");
const clearBtn = document.getElementById("clear");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const showColorPickerBtn = document.getElementById("color");
const refreshBtn = document.getElementById("refresh");
const drawBtn = document.getElementById("pencil");
let context = canvas.getContext('2d');
let navHight = nav.offsetHeight;
let restoreArray = [];
let index = -1;

slider.addEventListener("change", activeDrawing);
function activeDrawing(){
    let canvas = document.getElementById('canvas');
    if(slider.value == 2){
        let toolbarHight = toolbar.offsetHeight;
        let heightOffset = navHight + toolbarHight;
        canvas.style.zIndex = 1000;
        canvas.style.top = heightOffset + "px";
        canvas.style.display = "block";
    } else if (slider.value == 1) {
        canvas.style.zIndex = "";
        canvas.style.display = "none";
    }
}

//drawBtn.addEventListener("mousedown", drawing);
window.addEventListener("load", drawing);
function drawing(){
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    let toolbarHight = toolbar.offsetHeight;
    let heightOffset = navHight + toolbarHight;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e);
    }

    function finishedPosition(event){
        painting = false;
        ctx.beginPath();

        if(event.type != 'mouseout'){
            restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            index +=1;
            console.log(restoreArray);
        }
    }

    function draw(e){
        let drawColor = document.getElementById("drawColorPicker").value;
        let draw_color = drawColor;
        if(!painting) return;
        ctx.lineWidth = slider2.value * 2;
        ctx.lineCap = "round";

        ctx.lineTo(e.pageX, e.pageY - heightOffset);
        ctx.strokeStyle = draw_color;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.pageX, e.pageY - heightOffset);
    }
    
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
}

clearBtn.addEventListener("mousedown", clearCanvas);
function clearCanvas() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    restoreArray = [];
    index = -1;
  }

undoBtn.addEventListener("mousedown", undoLast);
function undoLast() {
    if ( index <= 0) {
        clearCanvas();
    }  else {   
        index -= 1;  
        context.putImageData(restoreArray[index], 0, 0);
        console.log(restoreArray)
    }
}
  
redoBtn.addEventListener("mousedown", redoLast);  
function redoLast() {
    if( index < 0){
        clearCanvas();
    } else if (index < restoreArray.length - 1) {
        index += 1;
        let redo = restoreArray[index];
        context.putImageData(redo, 0, 0);
    }
}

showColorPickerBtn.addEventListener("mousedown", showPicker);
function showPicker() {
    let colorPicker = document.getElementById("drawColorPicker");
    if ( colorPicker.style.display == "block"){
        colorPicker.style.display = "none";
        slider2.style.display = "none";
    } else {
        colorPicker.style.display = "block";
        slider2.style.display = "block";
    }
}

refreshBtn.addEventListener("mousedown", refreshPage);
function refreshPage(){
    location.reload();
}