/**
 * Created by root on 16-5-20.
 */
//init canvas
var canvas =document.getElementById('canvas');   //get canvas object
var context=canvas.getContext('2d');  //get context object

canvas.width=$(window).width();   //set canvas width
canvas.height=$(window).height();   //set canvas height
$('body').css("overflow","hidden");

var gridOn=false;
MAX_GRID_SIZE=40; //set max grid size
var columns=60;    //set column num
var rows=30;   //set row num

/**
 * get gridsize
 * @returns {number}
 */
function getGridSize(){
    var cSize=Math.floor(canvas.width/columns),
        rSize=Math.floor(canvas.height/rows);
    var gridSize=cSize>rSize?rSize:cSize;
    gridSize=gridSize<MAX_GRID_SIZE?gridSize:MAX_GRID_SIZE;
    return gridSize;
}

var gridSize=getGridSize();
var initPlace={
    x:canvas.width/2-(gridSize*columns)/2,
    y:canvas.height/2-(gridSize*rows)/2
};

var keyCodes={up:38,down:40,left:37,right:39,w:87,s:83,a:65,d:68};
