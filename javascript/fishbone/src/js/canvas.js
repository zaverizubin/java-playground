function Canvas (graph) {
    this.graph = graph;
    this.centerBone;
    
    this.canvasWidth = 1220;
    this.canvasHeight = 700;
    
    this.init = function (graphElement) {
        this.graph = new mxGraph(graphElement);
        this.centerBone = new CenterBone(this.graph);
        this.centerBone.init(this.canvasWidth, this.canvasHeight);
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
        this.centerBone.addLateralBone();
    };
}

