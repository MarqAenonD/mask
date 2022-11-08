//https://teachablemachine.withgoogle.com/models/g_tQdQ1m-/

Webcam.set({
    width:350,
    height:300,
    img_format : "png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_url) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_url + "'>"
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XdlxurzPm/model.json", modelLoaded);

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function modelLoaded() {
    console.log("model loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "the machine thinks you have a: " + prediction_1 + ".";
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        prediction_1 = results[0].label;
        speak();
        if (results[0].label == "mask on") {
            document.getElementById("quote").innerHTML = "thank you for wearing your mask!"
        }
        if (results[0].label == "mask off") {
            document.getElementById("quote").innerHTML = "please wear your mask for others safety!"
        }
    }
}