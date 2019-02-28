function Utils(){}

Utils.removeFromArray = function(arr, object){
    var i = arr.length
    while (i--) {
        if (arr[i] === object) { 
            arr.splice(i, 1);
        } 
    };
};