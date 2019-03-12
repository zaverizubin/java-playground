function Canvas () {
    
    this.toolbar;
    
    this.graph;
    
    this.graphListeners;
    
    this.graphConfiguration;
    
    this.centerBone;
    
    this.canvasWidth = GraphSettings.CANVAS_WIDTH;
    
    this.canvasHeight = GraphSettings.CANVAS_HEIGHT;
    
    this.init = function (graphElement, toolbar) {
        this.toolbar = toolbar;
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
    
    this.onContextMenuDeleteClick = function(){
        this.onDeleteDetailClick();
        this.onDeleteCauseClick();
    };
    
    this.onAddCauseClick = function(){
        this.centerBone.addChildBone();
    };
    
    this.onDeleteCauseClick = function(){
        this.centerBone.deleteSelectedChildBones();
    };
    
    this.onAddDetailClick = function(){
        var selectedChildBones = this.centerBone.getSelectedChildBones();
        
        if(selectedChildBones.length === 0){
            Utils.showMessageDialog(Messages.SELECT_ONE_OR_MORE_CAUSE);
            return;
        };
        selectedChildBones.forEach(function(childBone){
           childBone.addChildBone(); 
        });
    };
    
    this.onDeleteDetailClick = function(){
        var childBones = this.centerBone.getChildBones();
        childBones.forEach(function(childBone){
            if(childBone.getSelectedChildBones().length > 0){
                childBone.deleteSelectedChildBones();
            }
        });
    };
    
    this.onApplyStylesClick = function(styleAttributes){
        this.applyStyleAttributes(styleAttributes, false);
    };
    
    this.onResetStylesClick = function(styleAttributes){
        this.applyStyleAttributes(styleAttributes, true);
    };
    
    this.onResetGraphSettings = function(styleAttributes){
        this.applyStyleAttributes(styleAttributes, true);
    };
    
    this.onZoomChange = function(value){
        this.graph.zoomTo(1 + (value/100), false);
    };
    
    this.onZoomReset = function(){
        this.graph.zoomActual();
    };
    
    this.onApplyGraphSettings = function(){
        var canvas = this;
        var graph = this.graph;
        Utils.showConfirmationBox(Messages.CLEAR_GRAPH, function(){
            graph.removeCells(graph.getChildCells(graph.getDefaultParent(), true, true));
            canvas.buildCenterBone();
        });
    };
    
    this.onClearDiagram = function(){
        var canvas = this;
        Utils.showConfirmationBox(Messages.CLEAR_GRAPH, function(){
            canvas.centerBone.deleteAllChildBones();
        });
    };
    
    this.onSwapClick = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length !== 2 
            || cells[0].getValue().cellType !== cells[1].getValue().cellType
            || cells[0].getValue().bone.getParentBone() !== cells[1].getValue().bone.getParentBone()){
            Utils.showMessageDialog(Messages.SWAP_SELECT_SHAPE);
            return false;
        };
        var bone = cells[0].getValue().bone;
        bone.getParentBone().swapChildBones();
    };
    
    this.onFlipClick = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length !== 1){
            Utils.showMessageDialog(Messages.FLIP_SELECT_SHAPE);
            return false;
        };
        var bone = cells[0].getValue().bone;
        bone.getParentBone().flipChildBone();
    };
    
    this.buildGraph = function(graphElement){
        this.graphConfiguration = new GraphConfiguration(graphElement);
        this.graph = new mxGraph(graphElement);
        this.graphConfiguration.init(this.graph, this);
    };
    
    this.buildCenterBone = function(){
        this.centerBone = new CenterBone(this);
        this.centerBone.init();
    };
    
    this.applyStyleAttributes = function(styleAttributes, isReset){
        var cells = this.graph.getSelectionCells();
        if(cells.length === 0){
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
    
    this.onHelpWindowOpen = function(){
        $("#help-window").dialog("open");
    };
    
    this.onPropertiesWindowOpen = function(){
        var cells = this.graph.getSelectionCells();
        if(cells.length > 1 || cells.length ===0){
            Utils.showMessageDialog(Messages.SELECT_SINGLE_GRAPH_ELEMENT);
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

