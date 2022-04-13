var gElCanvas;
var gCtx;

var gImgs = []

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: []
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
        y: gElCanvas.height / 2, size: 20,
        align: 'left',
        color: 'blue',
        isMarked: false
    }

    gMeme.lines.push(line)

    renderMeme()




}