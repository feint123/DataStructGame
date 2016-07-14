/**
 * Created by root on 16-5-11.
 */
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');

//initView
canvas.width=$(window).width()-15;
canvas.height=$(window).height()-$('.header').height();
$('.console-surface').css('width',$('.console-surface').width()+100)
//create a link structure
    //defines a LinkList
var LinkList=function(){
    this.length=0;
    this.first=null;
};
LinkList.prototype={
        //insert the item to the place which equal index
    insert:function(node,index){
        if(index>this.length){
            return -1;
        }else{
            this.length++;
            if(index==0){
                this.first=node;
            }else{
                var temp=this.first;
                for(var i=0;i<index-1;i++){
                    temp=temp.next;
                }
                node.next=temp.next;
                temp.next=node;
            }
        }
    },
    delete:function(index){
        if(index>this.length-1){
            return -1;
        }else {
            var temp = this.first;
            for (var i = 1; i < index; i++) {
                temp = temp.next;
            }
            temp.next = temp.next.next;
        }
    },
        //clear all of node in this list
    clear:function(){
        this.first=null;
        this.length=0;
    },
        //get the num index of node(index from 0 to length-1)
    get:function(index){
        if(index>this.length-1){
            return -1;
        }else {
            var temp = this.first;
            for (var i = 0; i < index; i++) {
                temp = temp.next;
            }
            return temp;
        }
    }
};
    //defines a Node
var Node=function(value){
    this.next=null;
    this.value=value;
}
//defines some const
FONT_SIZE=21;
WIDTH_INCREASE_RATE=1.5;
//some operations with this game
    //defines a NodeObject;
var NodeObject=function(startX,centerY,node){
    this.startX=startX;
    this.centerY=centerY;
    this.node=node;
};
NodeObject.prototype={
    drawNode:function() {
        var widthes=this.drawText(),
            rectHeight=FONT_SIZE*1.6;
        this.width=widthes.cw+widthes.nw;
        this.drawRect(this.startX,this.centerY-rectHeight/1.8,
            widthes.cw,rectHeight,this.currentColor);
        this.drawRect(this.startX+widthes.cw,this.centerY-rectHeight/1.8,widthes.nw,
            rectHeight,this.nextColor);
        this.drawText();
        return
    },
    drawRect:function(x,y,w,h,color){
        context.save();
        context.fillStyle=color;
        context.beginPath();
        context.fillRect(x,y,w,h);
        context.restore();
    },
    drawText:function(){
        context.save();
        context.fillStyle='white';
        //put the valueText to the center of object
        context.textAlign='center';
        context.textBaseline='middle';
        context.font=FONT_SIZE+'px impact';
        var currentWidth=context.measureText(this.node.value),
            nextWidth;
        context.fillText(this.node.value,this.startX+(currentWidth.width)*WIDTH_INCREASE_RATE/2,
            this.centerY);
        if(this.node.next!=null){
            nextWidth=context.measureText(this.node.next.value);
            context.fillText(this.node.next.value,this.startX+(currentWidth.width)*WIDTH_INCREASE_RATE+
                (nextWidth.width)*WIDTH_INCREASE_RATE/2,
                this.centerY);
        }else{
            nextWidth=10;
            return {
                cw:currentWidth.width*WIDTH_INCREASE_RATE,
                nw:nextWidth*WIDTH_INCREASE_RATE
            };
        }
        context.restore();
        return {
            cw:currentWidth.width*WIDTH_INCREASE_RATE,
            nw:nextWidth.width*WIDTH_INCREASE_RATE
        };
    },
    move:function(){

    },
    nodeAttr:function(currentColor,nextColor,alpha){
        this.currentColor=currentColor;
        this.nextColor=nextColor;
        this.alpha=alpha;
    }
};
//start work
INIT_X=100;
INIT_Y=100;
var ll=new LinkList();
function refreshNodes(){
    context.clearRect(0,0,canvas.width,canvas.height);
    var no,
        nextWidth= 0,
        nextHeight=0;
    for(var i=0;i<ll.length;i++){
        no=new NodeObject(INIT_X+nextWidth,INIT_Y+nextHeight,ll.get(i));
        no.nodeAttr('#df232b','#2086D7','');
        no.drawNode();
        nextWidth+=no.width+20;
        if(nextWidth>canvas.width-2*INIT_X){
            nextWidth=0;
            nextHeight+=FONT_SIZE*2.5;
        }
    }
}
setInterval(refreshNodes,500);

//operation with LinkList
$('.record').val(0);
$('.add').click(function(){
    var index=$('.index')[0].value,
        value=$('.value').val();
    ll.insert(new Node(value),index);
    $('.record')[0].value=parseInt($('.record')[0].value)+1;
    $('.index')[0].value=$('.record')[0].value;
    $('.value').val('');
});
$('.clear').click(function(){
   ll.clear();
    $('.record').val(0);
    $('.index')[0].value=0;
});
$('.delete').click(function(){
    var index=$('.index')[1].value;
    ll.delete(index);
    $('.record')[0].value=parseInt($('.record')[0].value)-1;
    $('.index')[0].value=$('.record')[0].value;
});
