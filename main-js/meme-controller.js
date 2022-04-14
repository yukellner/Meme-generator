var gCtx;
var gY = [50, 200, 400]
var gI = 0
var gUploadedUrl;
var gResSearch;


function init() {
    gElCanvas = document.querySelector('#my-canvas');
    gCtx = gElCanvas.getContext('2d');
    document.querySelector('.gallery').style.display = 'block'
    document.querySelector('.meme-editor').style.display = 'none'
    createImgs()
    addListeners()

    renderGallery()
    //renderMeme()

    // const showmimg = getimg(idx)


    // window.addEventListener('resize', resizeCanvas)
    //     drawText('Nothing like a good stretch ', 0, 225)
    //     window.addEventListener('resize', () => {
    //         resizeCanvas()
    //             // Debouncing?..
    //         drawText('Nothing like a good stretch ', 0, 225)
    //     })


    //     drawImg()


    // click on canvas
}



function renderMeme() {

    const selectedImg = getSelectedImg()
    console.log('selectedImg', selectedImg)
    drawImg(selectedImg)

    setTimeout(function () {
        drawText()

    }, 10);


}

function onDownload(){
    
    

        let canvasImage = document.getElementById('my-canvas').toDataURL('image/png');
        
        // this can be used to download any image from webpage to local disk
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            let a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = 'image_name.png';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.remove();
          };
          xhr.open('GET', canvasImage); // This is to download the canvas Image
          xhr.send();
    
      
}

function onSearch(){
    var searchKey = document.querySelector('.search-inpt').value
    if(!searchKey) return
        
        
     
        

    var elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = ''
    gResSearch = undefined
    // console.log('gResSearch',gResSearch)
    gResSearch = []
    
    gImgs.forEach(img => {
        img.keywords.find(key => {
            if(key === searchKey) gResSearch.push(img)
            console.log('gResSearch',gResSearch)
        })

    })

    if(!gResSearch[0]) gResSearch = null

    renderGallery()
}

function toggleMenu() {
    var navBar = document.querySelector('.nav-bar')
    navBar.classList.toggle("menu-open");
}

function renderGallery() {

    

    if(gResSearch) var imgs = gResSearch
    else var imgs = getGimgs()

    console.log('gResSearch',gResSearch)
    console.log('getGimgs()',getGimgs())

    var elGallery = document.querySelector('.gallery')

    imgs.forEach(img => {

        elGallery.innerHTML += `<img src="${img.url}" id="${img.id}" onclick="selectImg(this)" alt="" class="image-gallery">`

    })





    // <img src="/imgs/1.jpg" id="1" onclick="selectImg(this)" alt="" class="image-gallery">

}

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        createCircle(center)
        renderCanvas()
    })
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    //  gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos)


    const memes = getGmemes()

    const currText = memes.lines.find(memeLine => {
        const textPos = getTextLineSize(memeLine)

        if (pos.x > textPos.x && pos.x < textPos.x + textPos.width && pos.y > textPos.y && pos.y < textPos.y + textPos.height) memeLine.isMarked = true
        else memeLine.isMarked = false

        renderMeme()
    })






    // if (!isCircleClicked(pos)) return
    // setCircleDrag(true)
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'


}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft,
    //         y: ev.pageY - ev.target.offsetTop
    //     }
    // }
    return pos
}

function showGalery() {
    document.querySelector('.gallery-real').style.display = 'block'
    document.querySelector('.meme-editor').style.display = 'none'

}

function hideGallery() {
    document.querySelector('.gallery-real').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'block'
}

function onAddText() {
    elInpt = document.querySelector('.meme-text')
    addLine(elInpt.value)
}


function drawText(txt, x = gElCanvas.width / 2) {
    gCtx.shadowColor = "black";
    // gCtx.fillText(txt, x, y);
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    // gCtx.lineWidth = 2;
    //gCtx.font = '50px ariel';

    var memes = getGmemes()

    console.log('memes', memes)

    console.log('gCtx', gCtx)

    memes.lines.forEach(memeLine => {


        gCtx.font = `${memeLine.size}px serif`;
        gCtx.strokeStyle = memeLine.color;
        if (memeLine.isMarked === true) {
            console.log('gCtx.measureText(memeLine.txt).width', +gCtx.measureText(memeLine.txt).width)
            const textPos = getTextLineSize(memeLine)
            gCtx.strokeRect(textPos.x, textPos.y, textPos.width, textPos.height);


        }


        gCtx.fillStyle = memeLine.color;
        gCtx.shadowColor = "yellow";
        gCtx.fillText(memeLine.txt, x, memeLine.y);
        // gCtx.fillRect( x, memeLine.y, width, height).
        gCtx.strokeText(memeLine.txt, x, memeLine.y);

    })

    if (gI === 2) gI = 0
    else gI++



}
function getTextLineSize(memeLine) {
    const textPos = {
        x: gElCanvas.width / 2 - +gCtx.measureText(memeLine.txt).width / 2,
        y: memeLine.y - 15,
        width: +gCtx.measureText(memeLine.txt).width,
        height: 30
    }

    return textPos


}

function selectImg(image) {

    hideGallery()


    markSelectedImg(image)
    renderMeme()

}

function drawImg(image) {

    var elUploadImg = document.querySelector('.upload-img')
    //elUploadImg.style.display = 'none'

    var elImg = document.querySelector('.hidden-img')
    // console.log('gUploadedUrl', gUploadedUrl)

    if (image.id === 19) elImg.src = gUploadedUrl
    else elImg.src = `/imgs/${image.id}.jpg`
    // 


    console.log('elImg', elImg)

    setTimeout(function () {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);

    }, 1);





}

function drawImg2() {
    var img = new Image();
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    };
}

function onMoveText(btn) {


    var dif = 0

    if (btn.innerHTML === '⬆️') dif = -10
    else dif = 10

    var markedLine = getMarkedText()
    markedLine.y = markedLine.y + dif
    renderMeme()

}

function onDelete() {
    var markedLine = getMarkedText()
    var memes = getGmemes()
    var idx = memes.lines.findIndex(memeLine => memeLine === markedLine)
    memes.lines.splice(idx, 1)
    renderMeme()
}

function onChangeFontSize(btn) {

    if (btn.innerHTML === 'A+') dif = 5
    else dif = -5


    var markedLine = getMarkedText()
    markedLine.size = markedLine.size + dif
    renderMeme()



}

function getMarkedText() {
    var memes = getGmemes()
    const markedLine = memes.lines.find(memeLine => {
        return memeLine.isMarked === true
    })
    return markedLine

}

function onColorTextChange(inpt) {
    var markedLine = getMarkedText()
    markedLine.color = inpt.value


    renderMeme()




}