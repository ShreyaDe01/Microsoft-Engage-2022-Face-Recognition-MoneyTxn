$(document).ready(function(){
    async function face(){
        //load the models
        document.getElementById('progress').innerHTML = "Wait! Face verification processing....";
        console.log("running face detection")
        const MODEL_URL = '/models' //model directory
        
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL) 
        await faceapi.loadFaceLandmarkModel(MODEL_URL) // model to detect face landmark
        await faceapi.loadFaceRecognitionModel(MODEL_URL) //model to Recognise Face
        await faceapi.loadFaceExpressionModel(MODEL_URL) //model to detect face expression
        
        console.log("loaded models")
        
        //----------------------------------------------------------

        const input = document.getElementById("imgoutput");
        console.log(input)
        //const detection = await faceapi.detectSingleFace(input)
        //const detectionWithLandmarks = await faceapi.detectSingleFace(input).withFaceLandmarks()
        const result = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()
        if(result.length == 0){
            alert("No face detected! Capture again");
        }
        document.getElementById('progress').innerHTML = "Wait! Face verification processing....";
        const displaySize = { width: input.width, height: input.height }
        
        // resize the overlay canvas to the input dimensions
        const canvas = document.getElementById('reflay')
        canvas.style.backgound = input.src;
        document.getElementById('progress').innerHTML = "Wait! Face verification processing....";
        faceapi.matchDimensions(canvas, displaySize)
            
        /* Display detected face bounding boxes */
        const detections = await faceapi.detectAllFaces(input)
        // resize the detected boxes in case your displayed image has a different size than the original
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        // draw detections into the canvas
        faceapi.draw.drawDetections(canvas, resizedDetections)
        
        console.log("boxes drawn")
        document.getElementById('progress').innerHTML = "Wait! Face verification processing....";
        const queryimg = document.getElementById("queryimg")
        console.log("get second image")
        const singleResult = await faceapi
        .detectSingleFace(queryimg)
        .withFaceLandmarks()
        .withFaceDescriptor()
        console.log(singleResult)
        console.log("compare both images")
        document.getElementById('progress').innerHTML = "Wait! Face verification processing....";
        // create FaceMatcher with automatically assigned labels
        // from the detection results for the reference image
        const faceMatcher = new faceapi.FaceMatcher(result)
        console.log(singleResult)
        if (singleResult) {
            const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor)
            console.log(bestMatch.toString())
            alert("Face verified and transaction successful!");
            
            location.replace("../public/dashboard.html")
        }
        else{
            alert("Face not matched! Transaction failed!")
            location.replace("../public/dashboard.html")
        }
        }
    document.getElementById("stopCam").onclick = function () {
        stream.getTracks().forEach(track => track.stop())
        face()
    }
})