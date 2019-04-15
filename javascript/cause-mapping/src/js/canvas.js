class Canvas {
    
    clipboard;
    toolbar;
    graph;
    graphListeners;
    graphConfiguration;
    lastInsertedVertex;
    shapeDetails;
    
    constructor(){
        
    };
    
    init(graphElement, toolbar) {
        this.toolbar = toolbar;
        this.buildGraph(graphElement);
        this.shapeDetails = new ShapeDetailsBuilder(this.graph);
    };
    
    buildGraph(graphElement){
        this.graph = new mxGraph(graphElement);
        this.graphConfiguration = new GraphConfiguration(this.graph, this, graphElement);
    };
    
    insertShape(shapeDefinition){
        var referenceVertex;
        if(this.graph.getSelectionCell() !== undefined && this.graph.getSelectionCell().isVertex()){
            referenceVertex = this.graph.getSelectionCell();
        }else if(this.lastInsertedVertex !== undefined && this.graph.getModel().getCell(this.lastInsertedVertex.id) !== undefined){
            referenceVertex = this.lastInsertedVertex;
        }
        
        var graphShapeBuilder = new GraphShapeBuilder(this.graph, shapeDefinition, referenceVertex);
        var vertex = graphShapeBuilder.getGraphShape();
        if(referenceVertex){
            graphShapeBuilder.positionVertex(vertex,referenceVertex);
        }
        
        this.lastInsertedVertex = vertex;
    }; 
    
    onReorderClick(sendToBack){
        var cells = this.graph.getSelectionCells();
        this.graph.orderCells(sendToBack, cells);
    };
    
    onDeleteClick(){
        this.graph.removeCells(this.graph.getSelectionCells());
    }
    
    onZoomChange(value){
        this.graph.zoomTo(1 + (value/100), false);
    };
    
    onZoomReset(){
        this.graph.zoomActual();
    };
    
    onClearDiagramClick(){
        var canvas = this;
        Utils.showConfirmationBox(Messages.CLEAR_GRAPH, null, null, function(){
            canvas.clearGraph();
        });
    };
    
    clearGraph(){
        this.graph.removeCells(this.graph.getChildCells(this.graph.getDefaultParent(), true, true));
        this.graph.getModel().clear();
    };
        
    onSaveDiagramClick(){
        var codec = new mxCodec();
        codec.lookup = function(id){return model.getCell(id);}
        var node = codec.encode(this.graph.getModel());
        var content = mxUtils.getXml(node);
        
        Utils.showPlainTextMessageDialog(content);
    };
    
    onLoadDiagram(xmlContent){
        this.graph.getModel().beginUpdate();
        try
        {   
            this.clearGraph();
            var doc = mxUtils.parseXml(xmlContent);
            var codec = new mxCodec(doc);
            codec.lookup = function(id){return model.getCell(id);}
            codec.decode(doc.documentElement, this.graph.getModel());
        }
        finally
        {
           this.graph.getModel().endUpdate();
        }
    };
    
    onShapeDetailsClick(){
        var cells = this.graph.getSelectionCells();
        if(cells.length > 1 || cells.length ===0){
            Utils.showMessageDialog(Messages.SELECT_SINGLE_GRAPH_ELEMENT);
            return;
        };
        
        this.shapeDetails.buildDetails(cells[0]);
    };
    
    
    onPropertiesClick(){
        var cells = this.graph.getSelectionCells();
        if(cells.length > 1 || cells.length ===0){
            Utils.showMessageDialog(Messages.SELECT_SINGLE_GRAPH_ELEMENT);
            return;
        };
        var cell = cells[0];
        var dialog = $("#properties-window").get(0);
        dialog.opened = true;
        
        var shapeProperty = new ShapeProperty();
        shapeProperty.setShapeProperties(this.graph, cell);
        
        $('#overlay').addClass("shape-properties");
        var grid = $('#overlay #properties-grid').get(0);
        grid.items = shapeProperty.getShapeProperties();  
    };
    
}