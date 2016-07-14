/**
 * Created by root on 16-6-10.
 */
function symmetryMatrixCompress(arr){
    var len=arr[0].length;
    var resultArr=[];
    for(var i=0;i<len;i++){
        for(var j=0;j<len;j++){
            if(i>j) {
                resultArr[i * (i-1) / 2 + j] = arr[i][j];
            }else{
                resultArr[j*(j-1)/2+i]=arr[i][j];
            }
        }
    }
    return resultArr;
}

var arr=[[1,2,3],[2,1,4],[3,4,1]];
var array=symmetryMatrixCompress(arr);
for(var i=0;i<array.length;i++){
    console.log(array[i]);
}
