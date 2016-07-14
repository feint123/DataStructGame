/**
 * Created by root on 16-5-20.
 */
function drawGrid(){
    var gridSize=getGridSize();

    context.save();
    context.strokeStyle='#00d1db';
    for(var i=0;i<columns+1;i++){
        context.moveTo(initPlace.x+i*gridSize,initPlace.y);
        context.lineTo(initPlace.x+i*gridSize,canvas.height-initPlace.y);
    }
    for(var i=0;i<rows+1;i++){
        context.moveTo(initPlace.x,initPlace.y+i*gridSize);
        context.lineTo(canvas.width-initPlace.x,initPlace.y+i*gridSize);
    }
    context.stroke();
    context.restore();
}
function drawCircle(gridLoc,mode,color){
    context.save();
    context.beginPath();
    context.strokeStyle=color|'#000';
    context.fillStyle=color|'#000';
    context.arc(initPlace.x+(gridLoc.c+0.5)*gridSize,initPlace.y+(gridLoc.r+0.5)*gridSize,
    gridSize/2,0,Math.PI*2,true);
    if(mode=='s'){
        context.stroke();
    }else {
        context.fill();
    }
    context.restore();
}
function drawText(text,gridLoc){
    context.save();
    context.fillStyle="#fff";
    context.fillText(text,initPlace.x+(gridLoc.c+0.5)*gridSize,initPlace.y+(gridLoc.r+0.5)*gridSize,
        gridSize);
    context.restore();
}
function drawBufferCircle(center,radius){
    context.save();
    context.fillStyle='rgba(0,200,0,0.3)';
    context.strokeStyle='rgb(200,0,0)';
    context.beginPath();
    context.arc(center.x,center.y,radius,0,Math.PI*2,false);
    context.stroke();
    context.fill();
    context.restore();
}