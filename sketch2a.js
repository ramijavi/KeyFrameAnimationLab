var keyFrames; 
var frames;
var counter;
var controlPoints;

function setup()
{
    //frameRate(24);
    
    keyFrames = [];
    counter = 0;
    
    controlPoints = [[200,-300],[200,700],[800,950],[20,540],[170,0],[120,800]];
    
    keyFrames.push(new keyFrame(100, 200, 45));
    keyFrames.push(new keyFrame(300, 200, 45));
    keyFrames.push(new keyFrame(200, 50, 45));
    
    createCanvas(500, 500);
    
    frames = tweenFrames(keyFrames[0], keyFrames[1], controlPoints[0], controlPoints[1]);
    
    let tempFrames = tweenFrames(keyFrames[1], keyFrames[2], controlPoints[2], controlPoints[3]);
    
    for(i=0; i<tempFrames.length; i++){
        frames.push(tempFrames[i]);
    }
    
    tempFrames = tweenFrames(keyFrames[2], keyFrames[0], controlPoints[4], controlPoints[5]);
    
    for(i=0; i<tempFrames.length; i++){
        frames.push(tempFrames[i]);
    }
}

function draw()
{   
    
    background(255);
    
    for(i=0;i<keyFrames.length;i++){
        let tempPos = keyFrames[i].getPosition();
        noFill();
        circle(tempPos[0], tempPos[1], 20);
    }
    
    fill(20, 160, 200);
    circle(frames[counter].x, frames[counter].y, 20);
    
    if (counter < frames.length-1){
        counter++;
    } else {
        counter = 0;
    }
}

function tweenFrames(keyFrame1, keyFrame2, controlP1, controlP2){

    var temp1;
    var temp2;
    temp1 = keyFrame1.getPosition();
    temp2 = keyFrame2.getPosition();
    
    let coefficent = 1/keyFrame1.getFrameNum();
    let frames = [];
    
    for(i=0;i<keyFrame1.getFrameNum();i++){
        let tempX = curvePoint(controlP1[0], temp1[0], temp2[0], controlP2[0], coefficent*(i+1));
        let tempY = curvePoint(controlP1[1], temp1[1], temp2[1], controlP2[1], coefficent*(i+1));
        frames.push(createVector(tempX, tempY));   
    }
    
    return frames;
} 

class keyFrame{
    
    constructor(x, y, frame){
        this.positionX = x;
        this.positionY = y;
        this.frameNum = frame;
    }
    
    getPosition(){
        return [this.positionX, this.positionY];
    }
    
    getFrameNum(){
        return this.frameNum;
    }
}
