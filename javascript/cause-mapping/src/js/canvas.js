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

            var objectGraphBuilder = new ObjectGraphBuilder(this);
            var cells = this.graph.getChildCells(this.graph.getDefaultParent(), true, true);
            objectGraphBuilder.buildObjectGraphFromCells(cells);
            this.centerBone = objectGraphBuilder.getCenterBone();
            
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
        
        var dialog = $("#shape-details").get(0);
        dialog.opened = true;
        
        $('#overlay').addClass("shape-details");
        
        var btnNotes = $('#overlay #shape-notes-button');
        var btnActions = $('#overlay #shape-actions-button');
        var btnEvidence = $('#overlay #shape-evidence-button');
        
        var vsNotes = $('#overlay #vertical-layout-notes');
        var vsActions = $('#overlay #vertical-layout-actions');
        var vsEvidence = $('#overlay #vertical-layout-evidence');
        
        vsActions.toggle(false);
        vsEvidence.toggle(false);
        
        btnNotes.click(function(){
            vsNotes.toggle(true);
            vsActions.toggle(false);
            vsEvidence.toggle(false);
        });
        
        btnActions.click(function(){
            vsNotes.toggle(false);
            vsActions.toggle(true);
            vsEvidence.toggle(false);
        });
        
        btnEvidence.click(function(){
            vsNotes.toggle(false);
            vsActions.toggle(false);
            vsEvidence.toggle(true);
        });
        
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