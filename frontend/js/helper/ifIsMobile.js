var detectMobile = () => {    
    if ( !!navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)) {
        return true;
    }
}

var scaleScreen = scale => {
    var metaForMobile = document.createElement('meta');
    metaForMobile.name = "viewport";
    metaForMobile.content = "width=device-width, maximum-scale=" + scale;
    document.getElementsByTagName("head")[0].appendChild(metaForMobile);
    console.log(document.getElementsByTagName("head")[0].lastChild);
}

var appendScaleMeta = () => {
    if (screen.width < 570) {
        scaleScreen(0.58);
    } else if ( 570 < screen.width && screen.width < 768){
        scaleScreen(0.7);
    } else {
        return;
    }
}
 export {detectMobile, appendScaleMeta};