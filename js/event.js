/**
 * Created by root on 16-5-20.
 */
canvas.onmousedown=function(e){
    var loc=windowToCanvas(e.clientX, e.clientY);
    var gLoc=canvasToGridCoordinate(loc);
    allObjects.forEach(function(object) {
        if (gLoc.r > object.position().r - 8 && gLoc.r < object.position().r + 8 &&
            gLoc.c > object.position().c - 8 && gLoc.c < object.position().c + 8) {
            bufferCenter = gridToCanvasCoordiante(object.position().r, object.position().c);
            bufferRadius = 30 * gridSize;
            isDrawBufferCircle = true;
            return;
        } else {
            isDrawBufferCircle = false;
        }
            object.setDelta(gLoc.r - object.position().r,gLoc.c - object.position().c);
    });
}