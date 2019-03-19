function Utils(){}

Utils.removeFromArray = function(arr, object){
    var i = arr.length;
    while (i--) {
        if (arr[i] === object) { 
            arr.splice(i, 1);
        } 
    };
};

Utils.showMessageDialog = function(text, width, height){
    $("#message-window").dialog({title: "Alert", 
                                 width: (width !== undefined)? width:400,
                                 height: (height !== undefined)? height:200,
                                 buttons: {
                                    Ok: function() {
                                      $( this ).dialog( "close" );
                                    }
                                    }});
    $("#message-window").dialog("open");
    $("#message-window").text(text);
};

Utils.showConfirmationBox = function(message, okCallback, width, height){
    $("#message-window").dialog({ 
        buttons: [{text: "Ok",click: function() {
                    okCallback();
                    $("#message-window").dialog("close");
                }.bind(this)},
                {text: "Cancel", click: function() {
                        $(this).dialog( "close" );}}
                ],
        title: "Alert",
        width: (width !== undefined)? width:400,
        height: (height !== undefined)? height:200,
        modal:true,
        resizable: false,
        dialogClass: "alert"
    }).html(message).show();
};


Utils.readFile = function(file, callback, onObject){
    var textType = /text\/xml/;
    if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function(e) {
            callback.call(onObject, reader.result);
        };
        reader.readAsText(file);    
    };
};
