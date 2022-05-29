const video = document.getElementById('video');
const canva = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
    audio: false,
    video: {
        width: 400, height: 300
    }
};

// Access webcam
async function init() {
try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
}
}

// Success
function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

// Load init
document.getElementById("capture_img").onclick = function(){
    init();

}
// Draw image
var context = canva.getContext('2d');

snap.addEventListener("click", function() {
    context.drawImage(video, 0, 0, 400, 300);
    const image = new Image();
    image.crossOrigin = "anonymous"
    //image.id = "pic";
    image.src = canva.toDataURL();
    
    document.getElementById("imgoutput").src = image.src

})