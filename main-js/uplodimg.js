function preview_image(event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('output_image');
        output.src = reader.result;
        
        gUploadedUrl = reader.result
        
        var uploadedImg = {
            id: 19,
            url: reader.result,
            keywords: ['funny', 'cat']
        }
        
        var memes = getGmemes()
        memes.selectedImgId = 19
        
        
        var imgs = getGimgs()
        imgs.push(uploadedImg)
        var elIpmpt = document.querySelector('.upload-img')
        elIpmpt.style.display = 'none'

        console.log('elIpmpt',elIpmpt)
        
        renderMeme()
        
    }
    reader.readAsDataURL(event.target.files[0]);
}