noseX=0;
noseY=0;
difference=0;
rightWristX=0;
leftWristX=0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(250, 200);

    canvas = createCanvas(550, 500);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX=results[0].pose.nose.x+80;
        noseY=results[0].pose.nose.y+50;
        console.log("noseX = " + noseX + "noseY = " + noseY); 
        
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWristX = " + leftWristX + " rightWristX = "+ rightWristX + " difference = " + difference);

    }
}

function modelLoaded()
{
    console.log('poseNet foi inicializado!');
}

function draw()
{
    document.getElementById("square_side").innerHTML= "Largura e altura serão = " + difference +"px";
    background('#0057e7');
    fill('#b7fff1');
    stroke('#b7fff1');
    square(noseX, noseY, difference);
}