class Utils{
    
    static removeFromArray(arr, object){
        var i = arr.length;
        while (i--) {
            if (arr[i] === object) { 
                arr.splice(i, 1);
            } 
        };
    };
    
    static showMessageDialog (message){
        var dialog = $("#message-window").get(0);
        dialog.opened = true;
        dialog.renderer = function(root, dialog) {
            if (!root.firstElementChild) {
                const header = window.document.createElement('header');
                header.innerHTML = '<b>Message</b>';

                const main = window.document.createElement('main');
                main.innerHTML = message;
                root.appendChild(header);
                root.appendChild(main);
            };
        };
    };
    
    static showPlainTextMessageDialog (message){
        var dialog = $("#message-window").get(0);
        dialog.opened = true;
        dialog.renderer = function(root, dialog) {
            if (!root.firstElementChild) {
                const header = window.document.createElement('header');
                header.innerHTML = '<b>Message</b>';

                const main = window.document.createElement('main');
                main.textContent  = message;
                root.appendChild(header);
                root.appendChild(main);
            };
        };
    };
    
    static showConfirmationBox (message, width, height, okCallback){
        var dialog = $("#message-window").get(0);
        dialog.opened = true;
        dialog.renderer = function(root, dialog) {
            const header = window.document.createElement('header');
            header.innerHTML = '<b>Message</b>';

            const main = window.document.createElement('main');
            main.innerHTML = message;

            const okButton = window.document.createElement('vaadin-button');
            okButton.setAttribute('theme', 'primary');
            okButton.textContent = 'OK';
            okButton.setAttribute('style', 'margin-right: 1em');
            okButton.addEventListener('click', function() {
                okCallback();
                dialog.opened = false;
            });

            const cancelButton = window.document.createElement('vaadin-button');
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', function() {
              dialog.opened = false;
            });

            root.appendChild(header);
            root.appendChild(main);
            root.appendChild(okButton);
            root.appendChild(cancelButton);
        };
    };
    
    static readFile(file, callback, onObject){
        var textType = /text\/xml/;
        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = function(e) {
                callback.call(onObject, reader.result);
            };
            reader.readAsText(file);    
        };
    };
    
}











