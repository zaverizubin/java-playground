function Utils(){}

Utils.removeFromArray = function(arr, object){
    var i = arr.length
    while (i--) {
        if (arr[i] === object) { 
            arr.splice(i, 1);
        } 
    };
};

Utils.showAlertDialog = function(text){
    $("#alert-window").dialog({title: "Alert", width: 400,  buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }});
    $("#alert-window").dialog("open");
    $("#alert-content").text(text);
};