status="";
objects=[];
function setup()
{
canvas=createCanvas(550,420);
canvas.center();
video.hide();
}

function preload()
{
video=createVideo("video.mp4");

}

function draw()
{
    image(video,0,0,550,420);
if(status!="")
{
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++)
{
document.getElementById("status").innerHTML="Status : detected objects";
document.getElementById("NumberOfObjects").innerHTML="Number of objects : "+objects.length;
fill("#FF0000");
percent=floor(objects[i].confidence*100);
text(objects[i].label +""+percent+"%",objects[i].x,objects[i].y);
noFill();
stroke("#FF0000");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
}
}

function start()
{
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status : detecting objects";
}

function modelLoaded()
{
console.log("modelLoaded");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResult(error,results)
{
if(error)
{
console.error(error);

}
else {
console.log(results);
objects=results;
}

}
