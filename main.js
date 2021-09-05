prediction1="";
prediction2="";

Webcam.set({
    width: 350,
    height: 300,
    Image_format:'png',
    png_quality: 90

});

camera=document.getElementById("camera");
Webcam.attach(camera);

function take_snap(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src=' "+data_uri+"'>";
    });
    
}

console.log("ml5 version",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/OUSTtcred/model.json',modelloaded);

function modelloaded (){
    console.log("Model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    var speak_1="The first prediction is"+prediction1;
    var speak_2="And the second prediction is"+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speak_1+speak_2);
    synth.speak(utterthis);
}

function check(){
    var img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}

function gotResult(error,result){
    if (error){
        console.error(error);
    }

    else{
        console.log(result);
        prediction1=result[0].label;
        prediction2=result[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction1;
        document.getElementById("result_emotion_name2").innerHTML=prediction2;
        speak();
        if (prediction1=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }

        if (prediction1=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548";
        }

        if (prediction1=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        
        //pediction2

        if (prediction2=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }

        if (prediction2=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548";
        }

        if (prediction2=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
    }
}