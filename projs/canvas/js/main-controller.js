'use strict'
var gElCanvas;
var gCtx;
var seeEl = ['gallary-container','memeGalary-container','memeAditor-container'];
var filterImage = '';

function onInit() {
    gElCanvas = document.querySelector('#my-canvas');
    var elContainer = document.querySelector('.canvas-container');
    gCtx = gElCanvas.getContext('2d');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    console.log('test 5:', elContainer.offsetWidth);
    console.log('test 555:', elContainer.offsetHeight);
    renderImages();
    onSelectNav(0);
}


function renderImages() {
    var images = gImg;
    let imageInput = document.querySelector('#img-search'); 
    filterImage = imageInput.value;
    var strHTML = images.map(function (image) {
        if (filterImage ==='') {
            return `
            <div class="img-box">
              <img class="img-${image.id} image" src="${image.url}" onclick="setCurrImage(${image.id})" alt="card image">
            </div>`
        }else {
            for (let i = 0; i < image.keywords.length; i++) {
                if (imageInput.value.substring(0,3) === image.keywords[i].substring(0,3)) {
                    return `
                    <div class="img-box">
                      <img class="img-${image.id} image" src="${image.url}" onclick="setCurrImage(${image.id})" alt="card image">
                    </div>`
                }
            }
        }
            
    })
    document.querySelector('.images-container').innerHTML = strHTML.join('')
}

function onSelectNav(navIndx) {
    onShowElememt(seeEl[navIndx])
}

function onShowElememt(showEl) {
  for (let i = 0; i < seeEl.length; i++) {
   if (seeEl[i] === showEl) {
       let el = document.querySelector(`.${showEl}`);
       el.style.display = (showEl === seeEl[2]) ? 'flex' : 'block';
   }else {
       let el = document.querySelector(`.${seeEl[i]}`);
       el.style.display = 'none';
   }
  }
  onCleanCanvas();
}


