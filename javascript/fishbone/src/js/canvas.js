function Canvas (graph) {
    this.graph = graph;
    this.centerBone;
    
    this.canvasWidth = 1220;
    this.canvasHeight = 700;
    
    this.init = function (graphElement) {
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
    
    this.onFontAttributesClick = function(fontAttributes){
        this.applyFontAttributes(fontAttributes);
    }
    
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
    };
    
    this.applyFontAttributes = function(fontAttributes){
        this.graph.getModel().beginUpdate();
        var graph = this.graph;
        try
        {
            var cells = this.graph.getSelectionCells();
            if(cells.length == 0){
                alert(Messages.SELECT_ONE_OR_MORE_SHAPE);
                return;
            }
            cells.forEach(function(cell) {
                if(cell.isVertex){
                    var fontStyleValue=0;
                    if(fontAttributes.fontBold) fontStyleValue+=1;
                    if(fontAttributes.fontItalic) fontStyleValue+=2;
                    var style = "fontFamily=" + fontAttributes.fontFamily + ";" 
                                + "fontSize=" + fontAttributes.fontSize + ";"
                                + "fontStyle=" + fontStyleValue + ";";
                    style = cell.getStyle() + style;    
                    graph.setCellStyle(style,[cell]);
                };
            });
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
}

