function Toolbar () {
    
    this.canvas;
    
    this.defaultStyles;
    
    this.init = function (canvas) {
        this.canvas = canvas;
        this.attachEventListeners();
        this.resetGraphSettings();
        this.defaultStyles = this.getStyleAttributes(); 
    };
        
    
    
    this.attachEventListeners = function(){
        var canvas = this.canvas;
        var toolbar = this;
        
        $('#file-input').change(function(e){
            var file = e.target.files[0];
            Utils.readFile(file, canvas.onLoadDiagram, canvas);
            $(this).val('');
        });
        
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
        
        $("#apply-font-styles").click(function(){
            var styleAttributes = toolbar.getStyleAttributes();
            canvas.applyStyleAttributes(styleAttributes);
        });
       
        $("#reset-font-styles").click(function(){
            toolbar.resetStyleAttributes();
            canvas.applyStyleAttributes(toolbar.defaultStyles);
        });
        
        $("#help-button").click(function(){
            Utils.showMessageDialog("<img src='resources/drawing.png' />");
        });
       
        
        $("#apply-graph-settings").click(function(){
            toolbar.getGraphSettings();
            canvas.onApplyGraphSettings();
        });
        
        $("#reset-graph-settings").click(function(){
             toolbar.resetGraphSettings();
             canvas.onApplyGraphSettings();
        });
        
        $("#zoom-setting").on("change", function(event) {
            canvas.onZoomChange(event.target.value);
        });
        
        $("#reset-zoom").click(function(){
            $("#zoom-setting").get(0).value = 0;
            canvas.onZoomReset();
        });
        
        $("#clear-diagram").click(function(){
            canvas.onClearDiagramClick();
        });
        
        $("#save-diagram").click(function(){
            canvas.onSaveDiagramClick();
        });
                
        $("#load-diagram").click(function(){
            $('#file-input').trigger('click');
        });
    };
    
    this.resetGraphSettings = function(){
        GraphSettings.restoreDefaults();
        
        $("#centerbone-vertex-shape-selector").get(0).value = GraphSettings.CENTERBONE_VERTEX_SHAPE;
        $("#sidebone-vertex-shape-selector").get(0).value =  GraphSettings.SIDEBONE_VERTEX_SHAPE;
        $("#marginH-spinner").get(0).value = GraphSettings.MARGIN_H;
        $("#marginV-spinner").get(0).value = GraphSettings.MARGIN_V;
        $("#centerbone-spacer-h-spinner").get(0).value = GraphSettings.CENTERBONE_SPACER_H;
        $("#centerbone-segment-length-spinner").get(0).value = GraphSettings.CENTERBONE_SEGMENT_LENGTH;
        $("#centerbone-vertex-width-spinner").get(0).value = GraphSettings.CENTERBONE_VERTEX_WIDTH;
        $("#centerbone-vertex-height-spinner").get(0).value = GraphSettings.CENTERBONE_VERTEX_HEIGHT;
        $("#sidebone-spacer-v-spinner").get(0).value = GraphSettings.SIDEBONE_SPACER_V;
        $("#sidebone-segment-length-spinner").get(0).value = GraphSettings.SIDEBONE_SEGMENT_LENGTH;
        $("#sidebone-vertex-width-spinner").get(0).value =  GraphSettings.SIDEBONE_VERTEX_WIDTH;
        $("#sidebone-vertex-height-spinner").get(0).value = GraphSettings.SIDEBONE_VERTEX_HEIGHT;
        $("#lateralbone-spacer-h-spinner").get(0).value = GraphSettings.LATERALBONE_SPACER_H;
        $("#lateralbone-segment-length-spinner").get(0).value = GraphSettings.LATERALBONE_SEGMENT_LENGTH;
        $("#theta-spinner").get(0).value = GraphSettings.THETA;
        
    };
    
    this.getGraphSettings = function(){
        
        GraphSettings.CENTERBONE_VERTEX_SHAPE = $("#centerbone-vertex-shape-selector").get(0).value;
        GraphSettings.SIDEBONE_VERTEX_SHAPE = $("#sidebone-vertex-shape-selector").get(0).value;
        GraphSettings.MARGIN_H = Number($("#marginH-spinner").get(0).value);
        GraphSettings.MARGIN_V = Number($("#marginV-spinner").get(0).value);
        GraphSettings.CENTERBONE_SPACER_H = Number($("#centerbone-spacer-h-spinner").get(0).value);
        GraphSettings.CENTERBONE_SEGMENT_LENGTH = Number($("#centerbone-segment-length-spinner").get(0).value);
        GraphSettings.CENTERBONE_VERTEX_WIDTH = Number($("#centerbone-vertex-width-spinner").get(0).value);
        GraphSettings.CENTERBONE_VERTEX_HEIGHT = Number($("#centerbone-vertex-height-spinner").get(0).value);
        GraphSettings.SIDEBONE_SPACER_V = Number($("#sidebone-spacer-v-spinner").get(0).value);
        GraphSettings.SIDEBONE_SEGMENT_LENGTH = Number($("#sidebone-segment-length-spinner").get(0).value);
        GraphSettings.SIDEBONE_VERTEX_WIDTH = Number($("#sidebone-vertex-width-spinner").get(0).value);
        GraphSettings.SIDEBONE_VERTEX_HEIGHT = Number($("#sidebone-vertex-height-spinner").get(0).value);
        GraphSettings.LATERALBONE_SPACER_H = Number($("#lateralbone-spacer-h-spinner").get(0).value);
        GraphSettings.LATERALBONE_SEGMENT_LENGTH = Number($("#lateralbone-segment-length-spinner").get(0).value);
        GraphSettings.THETA = Number($("#theta-spinner").get(0).value);
        
        GraphSettings.buildStyleMap();
    };
    
    this.resetStyleAttributes = function(){
        
        $("#font-family-select").get(0).value = this.defaultStyles.fontFamily;
        $("#font-size-select").get(0).value = this.defaultStyles.fontSize;
        $("#checkbox-bold").get(0).checked = this.defaultStyles.fontBold;
        $("#checkbox-italic").get(0).checked = this.defaultStyles.fontItalic;
        $("#checkbox-underline").get(0).checked = this.defaultStyles.fontUnderline;
        $("#stroke-width-select").get(0).value = this.defaultStyles.strokeWidth;
        $("#fontColorPicker").get(0).value = '#000000'; 
    	$("#strokeColorPicker").get(0).value = '#8282c8';
    	$("#fillColorPicker").get(0).value = '#c8c8e6';
    };
    
    this.getStyleAttributes = function(){
        return {
            fontFamily: $("#font-family-select").get(0).value,
            fontSize: $("#font-size-select").get(0).value,
            fontBold: $("#checkbox-bold").get(0).checked,
            fontItalic: $("#checkbox-italic").get(0).checked,
            fontUnderline: $("#checkbox-underline").get(0).checked,
            fontColor:  $("#fontColorPicker").get(0).value,
            strokeWidth: $("#stroke-width-select").get(0).value,
            strokeColor: $("#strokeColorPicker").get(0).value,
            fillColor: $("#fillColorPicker").get(0).value
        };
    };
    
    this.getDefaultStyleAttributes = function(){
        return this.defaultStyles;
    };
    
}

