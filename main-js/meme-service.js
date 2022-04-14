var gElCanvas;
var gCtx;

const STORAGE_KEY = 'memesDB'


var gImgs = []

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: []
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
  }

function createImgs() {

    for (var i = 1; i < 19; i++) {

        var curImg = {
            id: i,
            url: `imgs/${i}.jpg`,
            keywords: ['funny', 'cat']
        }

        gImgs.push(curImg)


    }

    gImgs[2].keywords.push('yellow')

    renderGallery()

}

function getGimgs() {
    return gImgs
}

function isTextClicked(clickedPos) {


    const textClicked = gMeme.lines.find(memeLine => {

        const linePos = getTextLineSize(memeLine)



        // if(memeLine.y+)

    })


    const { pos } = gCircle
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCircle.size
}


function getGmemes() {
    return gMeme
}


function getSelectedImg() {

    const idx = gMeme.selectedImgId
    const currImg = gImgs.find(img => {

        if (img.id === idx) return img


    })

    return currImg
}

function markSelectedImg(image) {



    gMeme.selectedImgId = +image.id




}

function addLine(txt) {


    var line = {

        txt: txt,
        y: gElCanvas.height / 2, 
        x: gElCanvas.width / 2,
        size: 20,
        align: 'left',
        color: 'blue',
        isMarked: false,
        isDrag: false
    }

    gMeme.lines.push(line)

    renderMeme()




}