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
        $(".font-size").selectmenu({width: 220});
        $(".font-family").selectmenu({width: 220 });
        $("input").checkboxradio();
    };
    
    this.attachEventListeners = function(){
        var canvas = this.canvas;
        $("#add-cause").click(function(){
            canvas.onAddCauseClick();
        });
        $("#delete-cause").click(function(){
            canvas.onDeleteCauseClick();
        });
        $("#apply-font-attributes").click(function(){
            var fontAttributes = {
                fontFamily:$("#font-family").children("option:selected").val(),
                fontSize:$("#font-size").children("option:selected").val(),
                fontBold:$("#checkbox-bold").is(':checked'),
                fontItalic:$("#checkbox-italic").is(':checked')
            }
            canvas.onFontAttributesClick(fontAttributes);
        });
        
    };
}

