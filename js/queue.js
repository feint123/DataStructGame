/**
 * Created by root on 16-5-19.
 */

//defined the queue data structure

var Queue= function () {

};

Queue.prototype={
    init:function(){
        this.queue=[];
        this.index=0;
        this.head=0;
    },
    destory:function(){
        this.queue=null;
    },
    isEmpty:function(){
        if(this.index==this.head) return true;
        else return false;
    },
    length:function(){
        return this.index-this.head;
    },
    getHead:function(){
        if(!this.isEmpty()) return this.queue[this.head];
        else return -1;
    },
    enQueue:function(value){
        this.queue[this.index]=value;
        this.index++;
    },
    deQueue:function(){
        if(!this.isEmpty()) {
            var head = this.queue[this.head];
            this.queue[this.head] = null;
            this.head++;
            return head;
        }else{
            return -1;
        }
    }
};

var deltaR=0;
var deltaC=0;

var isDrawBufferCircle=false;
var bufferCenter={};
var bufferRadius=0;

var allObjects=[];

//create the windows
var winNum=4;
var wins=[];



for(var i=winNum-1;i>=0;i--){
    wins[i]=new GameObject();
    wins[i].setAttr(window.winTemp,getGridSize());
    wins[i].moveTo(2,Math.floor(columns/winNum*(i+1/2))-winTemp[0].length/2);
    allObjects[allObjects.length]=wins[i];
}
//create the customer
var object=new GameObject();
object.setAttr(window.cosTemp,getGridSize());
object.moveTo(Math.floor(rows/2),Math.floor(columns/winNum*(2+1/2)-cosTemp.length/2));
allObjects[allObjects.length]=object;

//refresh array of object
function refreshObject(obj){
    for(var i=0;i<allObjects.length;i++){
        obj[i].create();
    }
}
function update(){
    context.clearRect(0,0,canvas.width,canvas.height);
    refreshObject(allObjects);
    //drawGrid();
    objectsAction(allObjects);
    if(isDrawBufferCircle){
        drawBufferCircle(bufferCenter,bufferRadius);
        bufferCenter=gridToCanvasCoordiante(object.position().r,object.position().c);
    }
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update);

