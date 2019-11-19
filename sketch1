var keyFrames; 
var frames;
var counter;

function setup()
{
    //frameRate(24);
    
    keyFrames = [];
    counter = 0;
    
    keyFrames.push(new keyFrame(100, 200, 25));
    keyFrames.push(new keyFrame(300, 200, 25));
    keyFrames.push(new keyFrame(200, 50, 25));
    
    createCanvas(500, 500);
    
    frames = tweenFrames(keyFrames[0], keyFrames[1]);
    
    let tempFrames = tweenFrames(keyFrames[1], keyFrames[2]);
    
    for(i=0; i<tempFrames.length; i++){
        frames.push(tempFrames[i]);
    }
    
    tempFrames = tweenFrames(keyFrames[2], keyFrames[0]);
    
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

function tweenFrames(keyFrame1, keyFrame2){

    var tempPos;
    tempPos = keyFrame1.getPosition();
    let v1 = createVector(tempPos[0], tempPos[1]);
    tempPos = keyFrame2.getPosition();
    let v2 = createVector(tempPos[0], tempPos[1]);
    
    let coefficent = 1/keyFrame1.getFrameNum();
    let frames = [];
    
    for(i=0;i<keyFrame1.getFrameNum();i++){
        frames.push(p5.Vector.lerp(v1, v2, coefficent*(i+1)));   
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
