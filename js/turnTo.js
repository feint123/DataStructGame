/**
 * Created by root on 16-5-20.
 */

function gridToCanvasCoordiante(r,c){

    return {
        x:initPlace.x+c*gridSize,
        y:initPlace.y+r*gridSize
    }
}
function canvasToGridCoordinate(loc){
    return {
        r:Math.floor((loc.y-initPlace.y)/gridSize),
        c:Math.floor((loc.x-initPlace.x)/gridSize)
    }
}
