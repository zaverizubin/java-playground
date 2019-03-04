function Canvas () {
    
    this.toolbar;
    
    this.graph;
    
    this.centerBone;
    
    this.canvasWidth = 1220;
    
    this.canvasHeight = 700;
    
    this.init = function (graphElement, toolbar) {
        this.toolbar = toolbar;
        this.mxGraphConfigure();
        this.buildGraph(graphElement);
        this.buildCenterBone();
    };
    
    this.getToolbar =function(){
        return this.toolbar;
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
    
    this.onApplyStylesClick = function(styleAttributes){
        this.applyStyleAttributes(styleAttributes, false);
    };
    
    this.onResetStylesClick = function(styleAttributes){
        this.applyStyleAttributes(styleAttributes, true);
    };
    
    
    this.onZoomChange = function(value){
        this.graph.zoomTo(1 + (value/100), false);
    };
    
    this.onZoomReset = function(){
        this.graph.zoomActual();
    };
    
    this.mxGraphConfigure = function(){
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
        this.centerBone = new CenterBone(this);
        this.centerBone.init();
    };
    
    this.applyStyleAttributes = function(styleAttributes, isReset){
        var cells = this.graph.getSelectionCells();
        if(cells.length === 0){
            alert(Messages.SELECT_ONE_OR_MORE_SHAPE);
            return;
        };
            
        this.graph.getModel().beginUpdate();
        var graph = this.graph;
        try
        {
           this.centerBone.applyStyles(styleAttributes);
           if(isReset){
               this.centerBone.reset();
           };
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    this.onPropertiesWindowOpen = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length > 1 || cells.length ===0){
            alert(Messages.SELECT_SINGLE_SHAPE);
            return;
        };
        var cell = cells[0];
        $("#properties-window").dialog("open");
        this.showProperties(cell);
    };
    
    this.showProperties = function(cell){
        
        if(!$('#properties-window').dialog('isOpen')){
            return;
        }
        
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

