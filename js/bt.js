/**
 * Created by root on 16-6-9.
 */

var nodes=[];
var initLevel=1;
var initColumn;
var isStatue=true;
var level=1;
var bt=new BinaryTree();
drawGrid();
canvas.onmousedown=function(e){
    var loc =windowToCanvas(e.clientX, e.clientY);
    var grid=canvasToGridCoordinate(loc);
    context.clearRect(0,0,canvas.width,canvas.height);
    drawGrid();
    var nodesTemp=[],
        temp=0;
    if(nodes.length==0){
        drawCircle(grid,'l','#ff00ff');
        initColumn=grid.c;
        nodes[nodes.length]={g:grid,l:initLevel,s:1};//g is grid,l is level,s is statue--1 means complete,0 means don't;
        bt.init(nodes[0]);
        nodesTemp[temp]=nodes[0];
        temp++;
    }else {
        nodes.forEach(function (node) {
            if (node.s==0&&node.g.r==grid.r&&node.g.c==grid.c) {
                if(isStatue) {
                    node.s = 1;
                    isStatue=false;
                }
            }
            if(node.s==1&&node.g.r==grid.r&&node.g.c==grid.c){
                var gridL={r:node.g.r+1,c:node.g.c-1};
                var gridR={r:node.g.r+1,c:node.g.c+1};
                drawCircle(gridL,'s');
                drawCircle(gridR,'s');
                nodes[nodes.length]={g:gridL,l:node.l+1,s:0};
                nodes[nodes.length]={g:gridR,l:node.l+1,s:0};
                bt.insert(nodes[nodes.length-1],0,nodes[nodes.length-3]);
                bt.insert(nodes[nodes.length-2],0,nodes[nodes.length-3]);
                isStatue=true;
                level++;
            }
            if(node.s==1) {
                drawCircle(node.g);
                if(!isStatue) {
                    nodesTemp[temp] = node;
                    temp++;
                }
            }
        });
    }
    if(!isStatue) {
        nodes = [];
        for (var i = 0; i < nodesTemp.length; i++) {
            nodes[i] = nodesTemp[i];
        }
    }
}