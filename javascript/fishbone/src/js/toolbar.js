function Toolbar (canvas) {
    
    this.canvas = canvas;
    
    this.init = function () {
        this.styleJQueryWidgets();
        this.attachEventListeners();
    };
    
    this.styleJQueryWidgets = function(){
        $(".toolbar").accordion({
            heightStyle: "content",
            collapsible: true,
            icons: {
                header: "ui-icon-circle-plus",
                activeHeader: "ui-icon-circle-minus"
              }
        });
        $( ".font-size" ).selectmenu({width: 220});
        $( ".font-face" ).selectmenu({width: 220 });
        $("input").checkboxradio();
    }
    
    this.attachEventListeners = function(){
        var canvas = this.canvas;
        $("#add-cause").click(function(){
            canvas.onAddCauseClick();
        });
    }
}

