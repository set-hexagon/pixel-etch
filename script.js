let boardSize = 64;
let pixelSize = 10;
const paletteColorSize = 20;

var mainColor = "white";

const colors = {
    red: "rgb(255, 0, 0)",
    darkRed: "rgb(139, 0, 0)",

    green: "rgb(0, 255, 0)",
    darkGreen: "rgb(0, 100, 0)",
    lime: "rgb(50, 205, 50)",

    blue: "rgb(0, 0, 255)",
    skyBlue: "rgb(135, 206, 235)",
    navy: "rgb(0, 0, 128)",
    cyan: "rgb(0, 255, 255)",

    yellow: "rgb(255, 255, 0)",
    gold: "rgb(255, 215, 0)",

    orange: "rgb(255, 165, 0)",
    darkOrange: "rgb(255, 140, 0)",

    purple: "rgb(128, 0, 128)",
    violet: "rgb(238, 130, 238)",
    indigo: "rgb(75, 0, 130)",

    pink: "rgb(255, 192, 203)",
    hotPink: "rgb(255, 105, 180)",

    brown: "rgb(139, 69, 19)",
    chocolate: "rgb(210, 105, 30)",
    tan: "rgb(210, 180, 140)",

    black: "rgb(0, 0, 0)",
    gray: "rgb(128, 128, 128)",
    lightGray: "rgb(211, 211, 211)",
    white: "rgb(255, 255, 255)",

    teal: "rgb(0, 128, 128)",
    turquoise: "rgb(64, 224, 208)",

    olive: "rgb(128, 128, 0)",
    maroon: "rgb(128, 0, 0)",

    coral: "rgb(255, 127, 80)",
    salmon: "rgb(250, 128, 114)",

    beige: "rgb(245, 245, 220)",
    mint: "rgb(152, 255, 152)"
};

const drawBoard = document.querySelector(".drawingBoard");
const colorPalette = document.querySelector(".colorPalette");

function setUpDrawingBoard() {
    // board width = width taken by the pixels + borders (n+1 borders)
    let boardWidth = pixelSize * boardSize + boardSize + 1;
    drawBoard.style.width = boardWidth+"px";

    for (let i = 0; i < boardSize; i++){
        for (let j = 0; j < boardSize; j++){
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.width = pixelSize+"px";
            pixel.style.height = pixelSize+"px";
            drawBoard.append(pixel);

            if (i == boardSize-1) pixel.classList.add("lastRow");
            if (j == boardSize-1) pixel.classList.add("lastColumn"); 
        }
    }
}

function removeDrawingBoard() {
    const pixels = document.querySelectorAll(".pixel");
    for (let pixel of pixels) {
        pixel.remove();
    }
}

function setUpColorPalette() {
    for (var color in colors) {
        const pxcolor = document.createElement("div");
        pxcolor.classList.add("color");
        pxcolor.style.width = paletteColorSize+"px";
        pxcolor.style.height = paletteColorSize+"px";
        pxcolor.style.backgroundColor = color;
        colorPalette.append(pxcolor);
    };
}

setUpDrawingBoard();
setUpColorPalette();

//drawing while draggin and clicking
let dragging = false;
drawBoard.addEventListener("mousedown", () => {
    dragging = true;
});

drawBoard.addEventListener("mouseup", () => {
    dragging = false;
});

function setPixelColor(pixel) {
    pixel.target.style.backgroundColor = mainColor;   
}

drawBoard.addEventListener("click", setPixelColor);
drawBoard.addEventListener("mousemove", pixel => {
    if (dragging) setPixelColor(pixel);
});


function resetBoard() {
    drawBoard.childNodes.forEach(pixel => {
        pixel.style.backgroundColor = "black";
    });
}

//changes primary color
colorPalette.addEventListener("click", (color) => {
    mainColor = color.target.style.backgroundColor;
});


// using user input to alter board size
const boardSizeInput = document.querySelector("#boardSize");
boardSizeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (Number.isInteger(+e.target.value)){
            boardSize = +e.target.value;
            removeDrawingBoard();
            setUpDrawingBoard();
        }
        else {
            console.error("enter valid input");
        }
    }
});

// using user input to alter pixel size
const pixelSizeInput = document.querySelector("#pixelSize");
pixelSizeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (Number.isInteger(+e.target.value)){
            pixelSize = +e.target.value;
            removeDrawingBoard();
            setUpDrawingBoard();
        }
        else {
            console.error("enter valid input");
        }
    }
});