/**
 * Created by root on 16-5-20.
 */


//defined a gameObject
var GameObject=function(){
    this.offsetX=0;
    this.offsetY=0;

};
GameObject.prototype={
    setAttr:function(parts,size){
        this.temp=parts;
        this.size=size;
    },
    create:function(p,s){
        var parts=p||this.temp;
        var size=s||this.size;
        var halfY=Math.floor(parts.length/2),
            halfX=Math.floor(parts[0].length/2);
        for(var i=this.offsetY;i<parts.length+this.offsetY;i++){
            for(var j=this.offsetX;j<parts[0].length+this.offsetX;j++) {
                var loc = gridToCanvasCoordiante(i-halfY, j-halfX);
                context.save();
                if(parts[i-this.offsetY][j-this.offsetX]==0){
                    context.fillStyle='#fff';
                }else {
                    context.fillStyle = parts[i-this.offsetY][j-this.offsetX] || '#000';
                }
                if(gridOn) {
                    context.fillRect(loc.x + 1, loc.y + 1, size - 2, size - 2);
                }else{
                    context.fillRect(loc.x, loc.y, size, size);
                }
                context.restore();
            }
        }
    },
    move:function(deltaR,deltaC){
        this.offsetX+=deltaC;
        this.offsetY+=deltaR;
    },
    moveTo:function(r,c) {
        this.offsetX=c;
        this.offsetY=r;
    },
    position:function(){
        return {c:this.offsetX,r:this.offsetY};
    },
    setDelta:function(deltaR,deltaC){
        this.deltaR=deltaR;
        this.deltaC=deltaC;
    },
    crashCheck:function(object){
        if(Math.abs(this.position().c-object.position().c)<=16){
            return true;
        }else{
            return false;
        }
    }

};

//GameObjects Action
function objectsAction(objects) {
    objects.forEach(function (object)
    {
        if (object.deltaR > 0) {
            object.move(1, 0);
            object.deltaR--;
        } else if (object.deltaR < 0) {
            object.move(-1, 0);
            object.deltaR++;
        }
        if (object.deltaC > 0) {
            object.move(0, 1);
            object.deltaC--;
        } else if (object.deltaC < 0) {
            object.move(0, -1);
            object.deltaC++;
        }

    });
}