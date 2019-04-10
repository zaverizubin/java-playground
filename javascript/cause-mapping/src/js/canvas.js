class Canvas {
    
    constructor(){
        this.clipboard;
        this.toolbar;
        this.graph;
        this.graphListeners;
        this.graphConfiguration;
        this.lastInsertedVertex;
    };
    
    
    init(graphElement, toolbar) {
        this.toolbar = toolbar;
        this.buildGraph(graphElement);
    };
    
    buildGraph(graphElement){
        this.graph = new mxGraph(graphElement);
        this.graphConfiguration = new GraphConfiguration(graphElement);
        this.graphConfiguration.init(this.graph, this);
    };
    
    insertShape(shapeDefinition){
        var graphShapeBuilder = new GraphShapeBuilder(this.graph, shapeDefinition);
        var vertex = graphShapeBuilder.getGraphShape();
        
        if(this.lastInsertedVertex !== undefined){
            graphShapeBuilder.positionVertex(vertex, this.lastInsertedVertex);
        };
        this.lastInsertedVertex = vertex;
    }; 
    
    
    
}