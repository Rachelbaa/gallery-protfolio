'use strict'
// import mainService from './main-service'
var textDirection = 205;
var onMouseDown = false;


function onSetMouseDown() {
    onMouseDown = true;
}

function onSetMouseUp() {
    onMouseDown = false;

}

function setCurrImage(imgId) {
    if (!gMeme.selectedImgId) {
        onSelectNav(2)
    }
    // console.log('rachellllllll');
    var img = new Image()
    gMeme.selectedImgId = imgId;
    var imgSrc = getCurrImage(imgId);
    img.src = imgSrc;
    var elContainer = document.querySelector('.canvas-container');
    img.width = elContainer.offsetWidth;
    img.height = elContainer.offsetHeight;
    gCtx.drawImage(img, 0, 0, img.width, img.height);
}

function setCurrmeme(memeId) {
    console.log('memeId',memeId);
    onSelectNav(2);
    getCurrgMeme(memeId);
    renderCanvas()
    let currIndx = findIndex(memeId);
    gSavedMeme.splice(currIndx,1);
}

function renderCanvas() {
    setCurrImage(gMeme.selectedImgId);
    for (let j = 0; j < gMeme.lines.length - 1; j++) {
        let currText = gMeme.lines[j].txt;
        let x = gMeme.lines[j].x;
        let y = gMeme.lines[j].y;
        let currFont = gMeme.lines[j].font;
        let currColor = gMeme.lines[j].color;
        let currScolor = gMeme.lines[j].colorS;
        drawText(currText, x, y, currFont, currColor, currScolor);
    }
}


function renderSavedMeme() {
    var savedMemes = gSavedMeme;
        var strHTML = savedMemes.map(function (meme) {
            return `
            <div class="meme-box">
              <img class="img-${meme.selectedImgId} meme" src="./img/meme-img-square/${meme.selectedImgId}.jpg" onclick="setCurrmeme(${meme.selectedImgId})" alt="card meme">
            </div>`
        })
    document.querySelector('.savedMemes-container').innerHTML = strHTML.join('');
    onCleanCanvas()
}

function getCurrText(ev) {
    onMouseDown = false;
    for (let i = 0; i < gMeme.lines.length - 1; i++) {
        let currF = gMeme.lines[i].font;
        let currSize = currF / 2;
        let textLength = gMeme.lines[i].size * currSize;
        let endX = gMeme.lines[i].x + (textLength / 2);
        let startX = gMeme.lines[i].x - (textLength / 2);
        let endY = gMeme.lines[i].y;
        let startY = endY - currF / 0.8;
        let someThing =false;
        if (ev.offsetX < endX && ev.offsetX > startX && ev.offsetY < endY && ev.offsetY > startY) {
            gMeme.selectedLineIdx = i;
            renderCanvas()
            let elTextInput = document.querySelector('#text');
            elTextInput.value = gMeme.lines[i].txt;
            drawRect(gMeme.lines[i].x, endY);
            someThing = true; 
            return;
        } else if (i === gMeme.lines.length-2 && someThing === false) {
            onMouseDown = false;
            gMeme.selectedLineIdx = null;
            renderCanvas()
            return;
        }
    }
}



function moveCurrText(ev) {
    const { offsetX, offsetY } = ev;
    if (onMouseDown && gMeme.selectedLineIdx !== null) {
        gMeme.lines[gMeme.selectedLineIdx].x = offsetX;
        gMeme.lines[gMeme.selectedLineIdx].y = offsetY;
        renderCanvas()
        drawRect(gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y);
    }
}

function onDrawText(el) {
    if (el.key === 'Enter') {
        let elTextInput = document.querySelector('#text');
        let textSize = elTextInput.value.length;
        let linesL = gMeme.lines.length - 1;
        let gM = gMeme.lines[linesL];
        if (gMeme.lines[gMeme.selectedLineIdx]?.txt) {
            gMeme.lines[gMeme.selectedLineIdx].txt = elTextInput.value;
            gMeme.lines[gMeme.selectedLineIdx].size = textSize;
            renderCanvas()
            drawRect(gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y);
            return;
        }
        gM.txt = elTextInput.value;
        gM.size = textSize;
        gM.align = 'center';
        gM.font = 30;
        gM.color = 'white';
        gM.colorS = 'black';
        gM.x = textDirection;
        if (linesL === 0) {
            gM.y = 50
        } else if (linesL === 1) {
            gM.y = 350
        } else {
            gM.y = 200
        }
        drawText(elTextInput.value, textDirection, gM.y, gM.font, gM.color, gM.colorS);
        gMeme.lines.push({});
        elTextInput.value = '';
        el.target.placeholder = `text ${linesL + 2} (Press ENTER)`
    }
}



function drawRect(x, y) {
    gCtx.beginPath();
    let currF = gMeme.lines[gMeme.selectedLineIdx].font;
    let currSize = currF / 1.7;
    let startY = currF / 1.2;
    let endY = currF / 0.9;
    let textLength = gMeme.lines[gMeme.selectedLineIdx].size * currSize;
    gCtx.rect(x - (textLength / 2), y - startY, textLength, endY);
    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}


function onGetDirection(textAlign) {
    gMeme.lines[gMeme.selectedLineIdx].align = textAlign
    let textD;
    if (gMeme.lines[gMeme.selectedLineIdx].align === 'center') {
        textD = 205;
    } else if (gMeme.lines[gMeme.selectedLineIdx].align === 'left') {
        textD = gMeme.lines[gMeme.selectedLineIdx].size > 7 ? 100 : 50;
    } else if (gMeme.lines[gMeme.selectedLineIdx].align === 'right') {
        textD = gMeme.lines[gMeme.selectedLineIdx].size > 7 ? 320 : 360;
    }
    gMeme.lines[gMeme.selectedLineIdx].x = textD;
    renderCanvas()
    drawRect(gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y);
}

function onChangeFont(fontA) {
    if (fontA === 'big') {
        gMeme.lines[gMeme.selectedLineIdx].font += 5;
    } else {
        gMeme.lines[gMeme.selectedLineIdx].font -= 5;
    }
    renderCanvas()
    drawRect(gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y);
}

function onChangeColor() {
    let currColor = document.querySelector('#colorT');
    gMeme.lines[gMeme.selectedLineIdx].color = currColor.value
    renderCanvas()
}


function onChangeColorS() {
    let currColor = document.querySelector('#colorS');
    gMeme.lines[gMeme.selectedLineIdx].colorS = currColor.value
    renderCanvas()
}


function onMove(elUD) {
    var currTextIndx = gMeme.selectedLineIdx
    if (currTextIndx === null) {
        return;
    }
    if (elUD === 'up') {
        gMeme.lines[currTextIndx].y -= 10;
    } else {
        gMeme.lines[currTextIndx].y += 10;
    }
    renderCanvas()
    drawRect(gMeme.lines[currTextIndx].x, gMeme.lines[currTextIndx].y);
}


function onNextText() {
    gMeme.selectedLineIdx += 1;
    let nextText = gMeme.selectedLineIdx;
    if (nextText === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
        nextText = 0;
    }
    renderCanvas()
    drawRect(gMeme.lines[nextText].x, gMeme.lines[nextText].y);
}

function onDeleteText() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    let elTextInput = document.querySelector('#text');
    elTextInput.value = '';
    elTextInput.placeholder = `text ${gMeme.lines.length} (Press ENTER)`
    renderCanvas()
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_meme';
}

function onSaveCanvas() {
    gSavedMeme.push({ ...gMeme });
    renderSavedMeme()
    onSelectNav(0);
}


function onCleanCanvas()  {
    clearCanvas()
    gMeme = {
        lines: [{}]
    };
    let elTextInput = document.querySelector('#text');
    elTextInput.value = '';
    elTextInput.placeholder = `text 1 (Press ENTER)`
}

