/**
 * Created by root on 16-5-13.
 */
//init some important variables
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
var setSpeed=document.getElementById('speed');
var setWidth=document.getElementById('width');
var setHeight=document.getElementById('height');
//init view
canvas.height=$(window).height()-$('.header').height();
canvas.width=$(window).width()-15;
$('.console-surface').height(canvas.height);
//defines Stack data structure
var Stack=function(){
    //this.stackArray=[];
    this.index=0;
}
Stack.prototype={
    init:function(){
        this.stackArray=[];
    },
    destory:function(){
        this.stackArray=null;
    },
    clear:function() {
        this.stackArray = [];
    },
    length:function(){
        return this.index;
    },
    push:function(value){
        this.stackArray[this.index]=value;
        this.index++;
    },
    pop:function(){
        if(this.stackArray[this.index-1]==null) return -1;
        else{
            var temp=this.stackArray[this.index-1];
            this.stackArray[this.index-1]=null;
            this.index--;
            return temp;
        }
    },
    top:function(){
        if(this.index==0) return null;
        return this.stackArray[this.index-1];
    }
}



//init all of useful variable
var mazeWidth=25; //columns of maze
var mazeHeight=25;//rows of maze
MAX_GRID_SIZE=45;//max size of every grid;
BARRIER_RATE=5;//the value is bigger and then less barriers
var coor = [];
var isFinish;
var startPoint;
var endPoint;
var dir;
var stack;
function init(){
    for (var i = 0; i < mazeHeight; i++) {
        coor[i] = new Array();
        for (var j = 0; j < mazeWidth; j++) {
            coor[i][j] = 0;
        }
    }

    mazeWidth=parseInt(setWidth.value);
    mazeHeight=parseInt(setHeight.value);

    //some controller
    isFinish=false;
    startPath=true;
    endPath=false;

    //init a stack to save path
    stack=new Stack();
    stack.init();
    startPoint={x:1,y:1};//start point
    endPoint={x:mazeWidth-2,y:mazeHeight-2};//end point
    dir={r:1,l:11,d:2,u:22,ur:3,rd:4,ru:5,dr:6};//some direction for draw final path
    drawSmallBall(startPoint);//draw the first point
    stack.push({x:startPoint.x,y:startPoint.y});//put the first point info to stack


    visualWidth=Math.floor(canvas.width/mazeWidth);
    visualHeight=Math.floor(canvas.height/mazeHeight);
    gridSize=visualHeight>visualWidth?visualWidth:visualHeight;
    gridSize=gridSize>MAX_GRID_SIZE?MAX_GRID_SIZE:gridSize;
    startX=canvas.width/2-gridSize*mazeWidth/ 2;
    startY=canvas.height/2-gridSize*mazeHeight/2;
}
function drawMaze() {
    drawBarriers()
    drawGrid();
}
function setLineBarrier(start,end,isVertical){
   for(var i=0;i<end;i++){
       if(isVertical){
           coor[i][start]=1;
       }else{
           coor[start][i]=1;
       }
   }
}
//create a Maze by randomly
function createRandomBarrier(){
    setLineBarrier(0,mazeHeight,true);
    setLineBarrier(mazeWidth-1,mazeHeight,true);
    setLineBarrier(0,mazeWidth-1,false);
    setLineBarrier(mazeHeight-1,mazeWidth,false);
    for(var i=1; i<mazeHeight-1; i++){
        for(var j=1; j<mazeWidth-1; j++){
                var rand = Math.ceil(Math.random() * BARRIER_RATE) % BARRIER_RATE;
                if (rand == 0) coor[i][j] = 1;
        }
    }
    coor[1][1]=-1;
    coor[mazeHeight-2][mazeWidth-2]=0;
}
//some variable will used at time of drawing view;
var visualWidth;
var visualHeight;
var gridSize;

var startX,
    startY;

function drawGrid(){
    for(var i=0; i<mazeHeight+1; i++){
        context.beginPath();
        context.moveTo(startX,startY+i*gridSize);
        context.lineTo(canvas.width-startX,startY+i*gridSize);
        context.stroke();
    }
    for(var j=0; j<mazeWidth+1; j++){
        context.beginPath();
        context.moveTo(startX+j*gridSize,startY);
        context.lineTo(startX+j*gridSize,canvas.height-startY);
        context.stroke();
    }
}
function drawBarriers(){
    for(var i=0; i<mazeHeight; i++){
        for(var j=0; j<mazeWidth; j++){
           if(coor[i][j]==1)drawBarrier({x:j,y:i});
        }

    }
}
function drawBarrier(loc){
    context.save();
    context.fillStyle="#2b2b2b";
    context.beginPath();
    context.fillRect(startX+loc.x*gridSize,startY+loc.y*gridSize,gridSize,gridSize);
    context.restore();
}
function drawSmallBall(loc,radius,color){
    context.save();
    var r=radius||gridSize*0.3
    context.fillStyle=color||"#1d5c91";
    context.beginPath();
    context.arc(startX+loc.x*gridSize+gridSize/2,startY+loc.y*gridSize+gridSize/2,
        r,0,Math.PI*2,true);
    context.fill();
    context.restore();
}
//start walk

//use stack to find a path to the end point and save the path in stack;
function walkToFinal(){
    //is this direction have barrier?no,go to;yes,search the other directions;
    if(coor[startPoint.y][startPoint.x+1]==0){
        startPoint.x++;
        stack.push({x:startPoint.x,y:startPoint.y});
    }else if(coor[startPoint.y+1][startPoint.x]==0){
        startPoint.y++;
        stack.push({x:startPoint.x,y:startPoint.y});
    }else if(coor[startPoint.y][startPoint.x-1]==0){
        startPoint.x--;
        console.log(startPoint.x);
        stack.push({x:startPoint.x,y:startPoint.y});
    }else if(coor[startPoint.y-1][startPoint.x]==0){
        startPoint.y--;
        stack.push({x:startPoint.x,y:startPoint.y});
    }else{//if can't find any path,then go back and look at some unknown path
        stack.pop();
        var temp=stack.top();
        if(temp!=null) {
            startPoint.x = temp.x;
            startPoint.y = temp.y;
        }else{ //if stack change to null that means,this maze does not have a useful path
            console.log('failed');
            isFinish=true;
        }
    }
    drawSmallBall(startPoint);
    coor[startPoint.y][startPoint.x]=-1;//we cannot walk to this point again
    if((startPoint.x==endPoint.x)&&(startPoint.y==endPoint.y)){//find the coorect path
        isFinish=true;
        drawFinalPath();
        //alert("**Success** find a route");
    }
}
//draw a line ,in fact is a small rectangle
function drawNodeLine(loc,isVertical){
    if(isVertical){
        context.fillRect(startX + loc.x * gridSize+0.25*gridSize,
            startY + loc.y * gridSize , gridSize*0.5, gridSize);
    }else {
        context.fillRect(startX + loc.x * gridSize,
            startY + loc.y * gridSize + 0.25 * gridSize, gridSize, gridSize * 0.5);
    }
}
//according with direction's information to draw different corner
function drawCorner(loc){
    //defined some offset for draw corners
    var vdeltaX= 0,
        vdeltaY= 0,
        hdeltaX= 0,
        hdeltaY=0;
        switch (loc.d) {
            //down to right or left to up
            case dir.dr:
                vdeltaX = gridSize / 4;
                hdeltaX = gridSize/4;
                hdeltaY=gridSize/4;
                break;
            //up to right or left to down
            case dir.ur:
                hdeltaX=gridSize/4;
                hdeltaY=gridSize/4;
                vdeltaX=gridSize/4;
                vdeltaY=gridSize/4;
                break;
            //right to up or down to left
            case dir.ru:
                vdeltaX=gridSize/4;
                hdeltaY=gridSize/4;
                break;
            //right to down or up to left
            case dir.rd:
                hdeltaY=gridSize/4;
                vdeltaX=gridSize/4;
                vdeltaY=gridSize/4;
                break;
        }
        context.fillRect(startX + loc.x * gridSize+vdeltaX,
            startY + loc.y * gridSize+vdeltaY, gridSize* 0.5, gridSize * 0.75);
        context.fillRect(startX + loc.x * gridSize+hdeltaX,
            startY + loc.y * gridSize + hdeltaY, gridSize* 0.75, gridSize * 0.5);
}
//oh my god ,i spend most of time to display the final path
function drawPathNode(bLoc,cLoc,nLoc){
    context.save;
    context.fillStyle="#de2129";
    //draw vertical or horizontal or four kinds of corner line decide by three grids relative place
    if((cLoc.x==bLoc.x)&&(cLoc.x==nLoc.x)) {
        drawNodeLine(cLoc, true);
    }else if((cLoc.y==bLoc.y)&&(cLoc.y==nLoc.y)){
        drawNodeLine(cLoc,false);
    }else if((bLoc.y==cLoc.y)&&(nLoc.x==cLoc.x)){//
        if((nLoc.x<bLoc.x)){
            if(nLoc.y>bLoc.y){
                drawCorner({x:cLoc.x,y:cLoc.y,d:dir.ur});
            }else {
                drawCorner({x: cLoc.x, y: cLoc.y, d: dir.dr});
            }
        }else if(nLoc.x>bLoc.x){
            if(nLoc.y<bLoc.y) {
                drawCorner({x: cLoc.x, y: cLoc.y, d: dir.ru});
            }else{
                drawCorner({x: cLoc.x, y: cLoc.y, d: dir.rd});
            }
        }
    }else if((bLoc.x==cLoc.x)&&(nLoc.y==cLoc.y)){
        if(nLoc.x<bLoc.x){
            if(bLoc.y>cLoc.y) {
                drawCorner({x: cLoc.x, y: cLoc.y, d: dir.rd});
            }else{
                drawCorner({x: cLoc.x, y: cLoc.y, d: dir.ru});
            }
        }else if(nLoc.x>bLoc.x){
            if(bLoc.y>cLoc.y) {
                drawCorner({x: cLoc.x, y: cLoc.y, d: dir.ur});
            }else{
                drawCorner({x: cLoc.x, y: cLoc.y, d: dir.dr});
            }
        }
    }
    context.restore();
}
//get the final path witch connect start point to end point
var startPath;
var endPath;
var beforeNode,
    nextNode;
function drawFinalPath(){
    if(startPath){
        beforeNode=stack.pop();
        startPath=false;
    }
    if (stack.length()>1){
        if(!endPath) {
            drawSmallBall({x: mazeWidth - 2, y: mazeHeight - 2}, gridSize / 2, '#de2129');
            drawSmallBall({x: 1, y: 1}, gridSize / 2, '#de2129');
            endPath = true;
        }
        var currentNode=stack.pop();
        nextNode=stack.top();
        drawPathNode(beforeNode,currentNode,nextNode);
        beforeNode=currentNode;
    }
}
//animation steps or named updates
function animer(){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawMaze();
    walkToFinal();
    if(isFinish){
        clearInterval(ani);
        drawPath=setInterval(drawFinalPath,10);
    }
}
//start animation

var ani;
var drawPath;
$('.start').click(function(){

    init();
    console.log(drawPath);
    if(drawPath!=null||ani!=null){
        clearInterval(drawPath);
        clearInterval(ani);
    }
    createRandomBarrier();
    ani=setInterval(animer, parseInt(setSpeed.value));
});