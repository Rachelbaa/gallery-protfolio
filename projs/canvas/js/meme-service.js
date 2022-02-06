'use strict'
var gMeme = {
    // selectedImgId: 0,
    // selectedLineIdx: 0,
    lines: [{
    // txt: 'I never eat Falafel',
    // size: 20,
    // align: 'left',
    // color: 'red'
    }]
};

var gSavedMeme  = [];

function getCurrImage(imageId) {
    return `./img/meme-img-square/${imageId}.jpg`    
}

function drawText(text, x, y, fontS, colorT, colorS) {
    gCtx.lineWidth = '3.9';
    gCtx.strokeStyle = colorS;
    gCtx.font = `${fontS}px sans-serif`;
    gCtx.textAlign = 'center';
    gCtx.strokeText(text, x, y);
    gCtx.fillStyle = colorT;
    gCtx.fillText(text, x, y);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function getCurrgMeme(memeId) {
    for (let i = 0; i < gSavedMeme.length ; i++) {
       if (gSavedMeme[i].selectedImgId === memeId) {
           gMeme = gSavedMeme[i];
       }
    }
}

function findIndex(id) {
    for (let i = 0; i < gSavedMeme.length; i++) {
        if (gSavedMeme[i].selectedImgId === id) {
            return i
        }
    }
}
