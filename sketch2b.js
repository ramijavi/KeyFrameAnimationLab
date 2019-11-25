var keyFrames; 
var frames;
var counter;

function setup()
{
    //frameRate(24);
    
    keyFrames = [];
    counter = 0;
    
    keyFrames.push(new keyFrame(100, 200, 100));
    keyFrames.push(new keyFrame(300, 200, 100));
    keyFrames.push(new keyFrame(200, 50, 100));
    
    createCanvas(500, 500);
    
    frames = tweenFrames(keyFrames[0], keyFrames[1], 0, 0);
    
    let tempFrames = tweenFrames(keyFrames[1], keyFrames[2], 500, 1000);
    
    for(i=0; i<tempFrames.length; i++){
        frames.push(tempFrames[i]);
    }
    
    tempFrames = tweenFrames(keyFrames[2], keyFrames[0], 20, 500);
    
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

function tweenFrames(keyFrame1, keyFrame2, controlPoint1, controlPoint2){

    let tempPos1 = keyFrame1.getPosition();
    let v1 = createVector(tempPos1[0], tempPos1[1]);
    let tempPos2 = keyFrame2.getPosition();
    let v2 = createVector(tempPos2[0], tempPos2[1]);
    
    let coefficent = 1/keyFrame1.getFrameNum();
    let frames = [];
    
    let maxT = 0;
    let ts = [];
    
    for(i=0;i<keyFrame1.getFrameNum();i++){
        
        var t;
        
        if(tempPos1[0] < tempPos2[0]){
            t = curvePoint(controlPoint1, tempPos1[0], tempPos2[0], controlPoint2, coefficent*(i+1));
        } else {
            t = curvePoint(controlPoint1, tempPos2[0], tempPos1[0], controlPoint2, coefficent*(i+1));   
        }
        
        ts.push(t);
        
        if(t > maxT){
            maxT = t;
        }  
    }
    
    for(i=0;i<keyFrame1.getFrameNum();i++){
        frames.push(p5.Vector.lerp(v1, v2, ts[i]/maxT));
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
