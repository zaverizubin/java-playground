function Toolbar () {
    
    this.canvas;
    
    this.defaultStyles;
    
    this.init = function (canvas) {
        this.canvas = canvas;
        this.styleJQueryWidgets();
        this.attachEventListeners();
        this.defaultStyles = this.getStyleAttributes(); 
    };
    
    
    this.styleJQueryWidgets = function(){
        $(".toolbar").accordion({
            heightStyle: "content",
            collapsible: true,
            icons: {header: "ui-icon-circle-plus", activeHeader: "ui-icon-circle-minus"}
        });
        $("#font-size-select").selectmenu({width: 100});
        $("#font-family-select").selectmenu({width: 100});
        $("#stroke-width-select").selectmenu({width: 100});
        $("#checkbox-bold").checkboxradio();
        $("#checkbox-italic").checkboxradio();
        $("#checkbox-underline").checkboxradio();
        $("#slider").slider({
            create: function(event, ui) {
               $("#custom-handle").text(0); 
            }
        });
        $("#properties-window").dialog();
        $("#properties-window").dialog("option", "position", { my: "left", at: "center center", of: $(".app") } );
        $("#properties-window").dialog("close");
    };
        
    
    this.attachEventListeners = function(){
        var canvas = this.canvas;
        var toolbar = this;
        
        $("#add-cause").click(function(){
            canvas.onAddCauseClick();
        });
        
        $("#delete-cause").click(function(){
            canvas.onDeleteCauseClick();
        });
        
        $("#fontColorPicker").spectrum({
            color: "#000", allowEmpty: true
        });
        
        $("#strokeColorPicker").spectrum({
            color: "#8282c8", allowEmpty: true
        });
        
        $("#fillColorPicker").spectrum({
            color: "#c8c8e6", allowEmpty: true
        });
        
        $("#apply-font-styles").click(function(){
            var styleAttributes = toolbar.getStyleAttributes();
            canvas.onStyleAttributesClick(styleAttributes);
        });
       
        $("#reset-font-styles").click(function(){
            toolbar.resetStyleAttributes();
            canvas.onStyleAttributesClick(toolbar.defaultStyles);
        });
       
        $("#slider").on("slide", function(event, ui) {
            $("#custom-handle").text(ui.value);
            canvas.onZoomChange(ui.value);
        });
        
        $("#slider").on("slidechange", function(event,ui) {
            $("#custom-handle").text(ui.value);
        });
        
        $("#reset-zoom").click(function(){
            $("#slider").slider("value",0);
            canvas.onZoomReset();
        });
        
        $("#properties").click(function(){
            canvas.onPropertiesWindowOpen();
        });
    };
    
    this.resetStyleAttributes = function(){
        $("#font-family-select").val("Arial").selectmenu("refresh");
        $("#font-size-select").val(this.defaultStyles.fontSize).selectmenu("refresh");
        $("#checkbox-bold").prop('checked', this.defaultStyles.fontBold).checkboxradio( "refresh" );
        $("#checkbox-italic").prop('checked', this.defaultStyles.fontItalic).checkboxradio( "refresh" );
        $("#checkbox-underline").prop('checked', this.defaultStyles.fontItalic).checkboxradio( "refresh" );
        $("#stroke-width-select").val(this.defaultStyles.strokeWidth).selectmenu("refresh");
        $("#fontColorPicker").spectrum({
            color: "#000", allowEmpty: true
        });
        
        $("#strokeColorPicker").spectrum({
            color: "#8282c8", allowEmpty: true
        });
        
        $("#fillColorPicker").spectrum({
            color: "#c8c8e6", allowEmpty: true
        });
    };
    
    this.getStyleAttributes = function(){
        return {
            fontFamily: $("#font-family-select").children("option:selected").val(),
            fontSize: $("#font-size-select").children("option:selected").val(),
            fontBold: $("#checkbox-bold").is(':checked'),
            fontItalic: $("#checkbox-italic").is(':checked'),
            fontUnderline: $("#checkbox-underline").is(':checked'),
            fontColor: $("#fontColorPicker").spectrum('get').toHexString(),
            strokeWidth: $("#stroke-width-select").children("option:selected").val(),
            strokeColor: $("#strokeColorPicker").spectrum('get').toHexString(),
            fillColor: $("#fillColorPicker").spectrum('get').toHexString()
        };
    }
}

