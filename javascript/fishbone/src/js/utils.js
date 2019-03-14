function Utils(){}

Utils.removeFromArray = function(arr, object){
    var i = arr.length
    while (i--) {
        if (arr[i] === object) { 
            arr.splice(i, 1);
        } 
    };
};

Utils.showMessageDialog = function(text){
    $("#message-window").dialog({title: "Alert", width: 400,  height: 250, buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }});
    $("#message-window").dialog("open");
    $("#message-window").text(text);
};

Utils.showConfirmationBox = function(message, okCallback){
    $("#message-window").dialog({ 
        buttons: [{text: "Ok",click: function() {
                    okCallback();
                    $("#message-window").dialog("close");
                }.bind(this)},
                {text: "Cancel", click: function() {
                        $(this).dialog( "close" )}}
                ],
        title: "Alert",
        modal:true,
        resizable: false,
        width: 400,
        dialogClass: "alert"
    }).html(message).show();
};