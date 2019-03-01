function Canvas (graph) {
    
    this.graph = graph;
    
    this.toolbar = toolbar;
    
    this.centerBone;
    
    this.canvasWidth = 1220;
    
    this.canvasHeight = 700;
    
    this.init = function (graphElement, toolbar) {
        this.toolbar = toolbar;
        this.mxGraphConfiguration();
        this.buildGraph(graphElement);
        this.buildCenterBone();
    };
    
    this.getCanvasWidth =function(){
        return this.canvasWidth;
    };
    
    this.getCanvasHeight =function(){
        return this.canvasHeight;
    };
    
    this.getCenterBone =function(){
        return this.centerBone;
    };
    
    this.getGraph =function(){
        return this.graph;
    };
    
    this.onAddCauseClick = function(){
        this.centerBone.addSideBone();
    };
    
    this.onDeleteCauseClick = function(){
        this.centerBone.deleteSideBone();
    };
    
    this.onStyleAttributesClick = function(styleAttributes){
        this.applyStyleAttributes(styleAttributes);
    };
    
    this.onZoomChange = function(value){
        this.graph.zoomTo(1 + (value/100), false);
    };
    
    this.onZoomReset = function(){
        this.graph.zoomActual();
    };
    
    this.mxGraphConfiguration = function(){
        mxGraph.prototype.isCellSelectable = function(cell)
        {
            var state = this.view.getState(cell);
            var style = (state !== null) ? state.style : this.getCellStyle(cell);

          return this.isCellsSelectable() && !this.isCellLocked(cell) && style['selectable'] !== 0;
        };
    };
    
    this.buildGraph = function(graphElement){
        this.graph = new mxGraph(graphElement);
    };
    
    this.buildCenterBone = function(){
        this.centerBone = new CenterBone(this.graph);
        this.centerBone.init(this.canvasWidth, this.canvasHeight);
        this.applyCellStyle(this.centerBone.getVertex(), this.toolbar.getStyleAttributes());
    };
    
    this.applyStyleAttributes = function(styleAttributes){
        this.graph.getModel().beginUpdate();
        var graph = this.graph;
        try
        {
            var cells = this.graph.getSelectionCells();
            if(cells.length === 0){
                alert(Messages.SELECT_ONE_OR_MORE_SHAPE);
                return;
            };
            var me = this;
            cells.forEach(function(cell) {
                 me.applyCellStyle(cell, styleAttributes);
            });
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.applyCellStyle = function(cell, styleAttributes){
        var fontStyleValue=0;
        if(styleAttributes.fontBold) fontStyleValue+=1;
        if(styleAttributes.fontItalic) fontStyleValue+=2;
        var style = "fontFamily=" + styleAttributes.fontFamily + ";" 
                    + "fontSize=" + styleAttributes.fontSize + ";"
                    + "fontStyle=" + fontStyleValue + ";"
                    + "fontColor=" + styleAttributes.fontColor + ";"
                    + "strokeWidth=" + styleAttributes.strokeWidth + ";"
                    + "strokeColor=" + styleAttributes.strokeColor + ";"
                    + "fillColor=" + styleAttributes.fillColor + ";";
        var defaultStyle = "";
        switch(cell.getValue().cellType){
            case Constants.CENTERBONE_VERTEX:
                defaultStyle = Constants.CENTERBONE_VERTEX_STYLE;
                break;
            case Constants.SIDEBONE_VERTEX:
                defaultStyle = Constants.SIDEBONE_VERTEX;
                break;
            case Constants.CENTERBONE_EDGE:
                defaultStyle = Constants.CENTERBONE_EDGE;
                break;
            case Constants.SIDEBONE_EDGE:
                defaultStyle = Constants.SIDEBONE_EDGE;
                break;
        }
        style = defaultStyle + style;    
        this.graph.setCellStyle(style,[cell]);
    }
    
    this.onPropertiesWindowOpen = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length > 1 || cells.length ===0){
            alert(Messages.SELECT_SINGLE_SHAPE);
            return;
        };
        var cell = cells[0];
        
        $("#properties-window").dialog("open");
        
        
        var cellGeometry;
        if(cell.isEdge()){
            cellGeometry = this.graph.getView().getState(cell,false).cellBounds;
        }else{
            cellGeometry = cell.getGeometry();
        }
        $("#x-location").html(cellGeometry.x  + "px");
        $("#y-location").html(cellGeometry.y  + "px");
        $("#width").html(cellGeometry.width  + "px");
        $("#height").html(cellGeometry.height  + "px");
        
        if(cell.getStyle().indexOf("fontSize") >=0){
            $("#font-size").html(cell.getStyle().split("fontSize=")[1].substr(0,1) +"px");
        }else{
            $("#font-size").html("-");
        };
        if(cell.getStyle().indexOf("fontColor") >=0){
            $("#font-color > .colorbox").css("background-color", cell.getStyle().split("fontColor=")[1].substr(0,7));
        }else{
            $("#font-color > .colorbox").css("background-color", "#fff");
        };    
        if(cell.getStyle().indexOf("strokeColor") >=0){
            $("#stroke-color > .colorbox").css("background-color", cell.getStyle().split("strokeColor=")[1].substr(0,7));
        }else{
            $("#stroke-color > .colorbox").css("background-color", "#fff");
        };
        if(cell.getStyle().indexOf("fillColor") >=0){
            $("#fill-color > .colorbox").css("background-color", cell.getStyle().split("fillColor=")[1].substr(0,7));
        }else{
            $("#fill-color > .colorbox").css("background-color", "#fff");
        };
        if(cell.getStyle().indexOf("strokeWidth") >=0){
            $("#stroke-width").html(cell.getStyle().split("strokeWidth=")[1].substr(0,1) +"px");
        }else{
            $("#stroke-width").html("-");
        };
    };
}

