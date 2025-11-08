let express = require('express');

let app = express();
app.listen(1234, function() {
    console.log('server is listening on http://localhost:1234')
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let sketchLinks = [];

app.post('/uploadSketch', uploadSketchPostRequestHandler);
function uploadSketchPostRequestHandler(req, res){
    console.log('got uploadsketch post request');

    let link = req.body.sketchEmbedLink;
    console.log('link: ', link);

    sketchLinks.push(link);
    console.log('how many sketch links do we have?', sketchLinks.length);
    res.send('got it!');
}

app.get('/', myGalleryPageRequestHandler);
function myGalleryPageRequestHandler(req,res) {

    let galleryHtml = "<head><link rel='stylesheet' type='text/css' href='gallery.css'></head>"
    galleryHtml += "<body>"

    galleryHtmop += "<h1>sketch museum</h1>";
    galleryHtml += "<div id='sketchGalleryDiv'>"

        for (let i=0; i < sketchLinks.length; i++) {
            galleryHtml += sketchLinks[i];
        }
    galleryHtml += "</div>"
    galleryHtml += "</body>"
    
    res.send(galleryHtml);
}

app.use(express.static('public'));