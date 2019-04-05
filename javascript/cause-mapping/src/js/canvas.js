function Canvas () {
    
    this.clipboard;
    
    this.toolbar;
    
    this.graph;
    
    this.graphListeners;
    
    this.graphConfiguration;
    
    this.canvasWidth = GraphSettings.CANVAS_WIDTH;
    
    this.canvasHeight = GraphSettings.CANVAS_HEIGHT;
    
    this.init = function (graphElement, toolbar) {
        this.toolbar = toolbar;
        this.buildGraph(graphElement);
    };
    
    this.buildGraph = function(graphElement){
        
    };
}