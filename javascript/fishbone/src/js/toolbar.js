function Toolbar () {
    
    this.canvas;
    
    this.defaultStyles;
    
    this.init = function (canvas) {
        this.canvas = canvas;
        this.styleJQueryWidgets();
        this.attachEventListeners();
        this.resetGraphSettings();
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
        
        
        $("#help-window").dialog({width:690, height:550});
        $("#help-window").dialog("option", "position", { my: "left", at: "center center", of: $(".app") } );
        $("#help-window").dialog("close");
        
        $("#marginH-spinner").spinner({min: 0, max: 200 });
        $("#marginV-spinner").spinner({min: 0, max: 1000 });
        $("#centerbone-spacer-h-spinner").spinner({min: 20, max: 200 });
        $("#centerbone-segment-length-spinner").spinner({min:50, max: 400 });
        $("#centerbone-vertex-width-spinner").spinner({min: 20,max: 200 });
        $("#centerbone-vertex-height-spinner").spinner({min: 20,max: 200 });
        $("#sidebone-spacer-v-spinner").spinner({min: 20,max: 200 });
        $("#sidebone-segment-length-spinner").spinner({min: 50,max: 400 });
        $("#sidebone-vertex-width-spinner").spinner({min: 20,max: 200 });
        $("#sidebone-vertex-height-spinner").spinner({min: 20,max: 200 });
        $("#lateralbone-spacer-h-spinner").spinner({min: 20,max: 200 });
        $("#lateralbone-segment-length-spinner").spinner({min: 50,max: 400 });
        $("#theta-spinner").spinner({min: 40,max: 80 });
        
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
        
        $("#add-detail").click(function(){
            canvas.onAddDetailClick();
        });
        
        $("#delete-detail").click(function(){
            canvas.onDeleteDetailClick();
        });
        
        $("#add-sub-detail").click(function(){
            canvas.onAddSubDetailClick();
        });
        
        $("#delete-sub-detail").click(function(){
            canvas.onDeleteSubDetailClick();
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
            canvas.onApplyStylesClick(styleAttributes);
        });
       
        $("#reset-font-styles").click(function(){
            toolbar.resetStyleAttributes();
            canvas.onResetStylesClick(toolbar.defaultStyles);
        });
        
        $("#help-button").click(function(){
            canvas.onHelpWindowOpen(); 
        });
       
        $("#marginH-spinner").on( "spinchange", function() {
            GraphSettings.MARGIN_H = $("#marginH-spinner").spinner( "value" );
        });
        $("#marginV-spinner").on( "spinchange", function() {
            GraphSettings.MARGIN_V = $("#marginV-spinner").spinner( "value" );
        });
        $("#centerbone-spacer-h-spinner").on( "spinchange", function() {
            GraphSettings.CENTERBONE_SPACER_H = $("#centerbone-spacer-h-spinner").spinner( "value" );
        });
        $("#centerbone-segment-length-spinner").on( "spinchange", function() {
            GraphSettings.CENTERBONE_SEGMENT_LENGTH = $("#centerbone-segment-length-spinner").spinner( "value" );
        });
        $("#centerbone-vertex-width-spinner").on( "spinchange", function() {
            GraphSettings.CENTERBONE_VERTEX_WIDTH = $("#centerbone-vertex-width-spinner").spinner( "value" );
        });
        $("#centerbone-vertex-height-spinner").on( "spinchange", function() {
            GraphSettings.CENTERBONE_VERTEX_HEIGHT = $("#centerbone-vertex-height-spinner").spinner( "value" );
        });
        $("#sidebone-spacer-v-spinner").on( "spinchange", function() {
            GraphSettings.SIDEBONE_SPACER_V = $("#sidebone-spacer-v-spinner").spinner( "value" );
        });
        $("#sidebone-segment-length-spinner").on( "spinchange", function() {
            GraphSettings.SIDEBONE_SEGMENT_LENGTH = $("#sidebone-segment-length-spinner").spinner( "value" );
        });
        $("#sidebone-vertex-width-spinner").on( "spinchange", function() {
            GraphSettings.SIDEBONE_VERTEX_WIDTH = $("#sidebone-vertex-width-spinner").spinner( "value" );
        });
        $("#sidebone-vertex-height-spinner").on( "spinchange", function() {
            GraphSettings.SIDEBONE_VERTEX_HEIGHT = $("#sidebone-vertex-height-spinner").spinner( "value" );
        });
         $("#lateralbone-spacer-h-spinner").on( "spinchange", function() {
            GraphSettings.LATERALBONE_SPACER_V = $("#lateralbone-spacer-h-spinner").spinner( "value" );
        });
        $("#lateralbone-segment-length-spinner").on( "spinchange", function() {
            GraphSettings.LATERALBONE_SEGMENT_LENGTH = $("#lateralbone-segment-length-spinner").spinner( "value" );
        });
        $("#theta-spinner").on( "spinchange", function() {
            GraphSettings.THETA = $("#theta-spinner").spinner( "value" );
        });
        
        $("#apply-graph-settings").click(function(){
            canvas.onApplyGraphSettings();
        });
        
        $("#reset-graph-settings").click(function(){
             toolbar.resetGraphSettings();
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
        
         $("#clear-diagram").click(function(){
            canvas.onClearDiagram();
        });
        
        $("#properties").click(function(){
            canvas.onPropertiesWindowOpen();
        });
    };
    
    this.resetGraphSettings = function(){
        GraphSettings.restoreDefaults();
        
        $("#marginH-spinner").spinner("value", GraphSettings.MARGIN_H);
        $("#marginV-spinner").spinner("value", GraphSettings.MARGIN_V);
        $("#centerbone-spacer-h-spinner").spinner("value", GraphSettings.CENTERBONE_SPACER_H);
        $("#centerbone-segment-length-spinner").spinner("value", GraphSettings.CENTERBONE_SEGMENT_LENGTH);
        $("#centerbone-vertex-width-spinner").spinner("value", GraphSettings.CENTERBONE_VERTEX_WIDTH);
        $("#centerbone-vertex-height-spinner").spinner("value", GraphSettings.CENTERBONE_VERTEX_HEIGHT);
        $("#sidebone-spacer-v-spinner").spinner("value", GraphSettings.SIDEBONE_SPACER_V);
        $("#sidebone-segment-length-spinner").spinner("value", GraphSettings.SIDEBONE_SEGMENT_LENGTH);
        $("#sidebone-vertex-width-spinner").spinner("value", GraphSettings.SIDEBONE_VERTEX_WIDTH);
        $("#sidebone-vertex-height-spinner").spinner("value", GraphSettings.SIDEBONE_VERTEX_HEIGHT);
        $("#lateralbone-spacer-h-spinner").spinner("value", GraphSettings.LATERALBONE_SPACER_H);
        $("#lateralbone-segment-length-spinner").spinner("value", GraphSettings.LATERALBONE_SEGMENT_LENGTH);
        $("#theta-spinner").spinner("value", GraphSettings.THETA);
    }
    
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

