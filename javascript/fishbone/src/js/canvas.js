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
    }
}

