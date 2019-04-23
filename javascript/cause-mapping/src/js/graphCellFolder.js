class GraphCellFolder{
    
    constructor(graph, graphLayout){
        this.graph = graph;
        this.graphLayout = graphLayout;
        this.setImages();
        this.defineCondition();
        this.definePosition();
        this.defineFoldEventHandler();
    };
    
    setImages(){
        mxGraph.prototype.collapsedImage = new mxImage(mxClient.imageBasePath + '/collapsed.gif', 12, 12);
        mxGraph.prototype.expandedImage = new mxImage(mxClient.imageBasePath +  '/expanded.gif', 12, 12);  
    };
    
    defineCondition(){
        this.graph.isCellFoldable = function(cell){
            return this.model.getOutgoingEdges(cell).length > 0;
        };
    };
    
    definePosition(){
        var graphLayout = this.graphLayout;
        this.graph.cellRenderer.getControlBounds = function(state){
            if (state.control != null){
                
                var oldScale = state.control.scale;
                var w = state.control.bounds.width / oldScale;
                var h = state.control.bounds.height / oldScale;
                var s = state.view.scale;			
                if(graphLayout.layoutMgr.getLayout(state.cell) instanceof mxCompactTreeLayout && graphLayout.layoutMgr.getLayout(state.cell).horizontal){
                    return new mxRectangle(state.x + state.width + 5,
                        state.y + state.height / 2 - h / 2 * s,
                        w * s, h * s);
                }else{
                    return new mxRectangle(state.x + state.width / 2 - w / 2 * s,
                        state.y + state.height + 5,
                        w * s, h * s);
                }
                
            }
            return null;
        };
    };

    defineFoldEventHandler(){
        var graphCellFolder = this;
        
        this.graph.foldCells = function(collapse, recurse, cells)
            {
                this.model.beginUpdate();
                try
                {
                    graphCellFolder.toggleSubtree(this, cells[0], !collapse);
                    this.model.setCollapsed(cells[0], collapse);
                    //graphCellFolder.graphLayout.layoutMgr.executeLayout(graphCellFolder.graphLayout.layout, graphCellFolder.graph.getDefaultParent())
                   // graphCellFolder.layout.execute(this.getDefaultParent());
                }
                finally
                {
                    this.model.endUpdate();
                }
            };
    };
    
    toggleSubtree(graph, cell, show){
        show = (show != null) ? show : true;
        var cells = [];
       // var graph = this.graph;
        graph.traverse(cell, true, function(vertex){
            if (vertex != cell)
            {
                cells.push(vertex);
            }
            // Stops recursion if a collapsed cell is seen
            return vertex == cell || !graph.isCellCollapsed(vertex);
        });

        graph.toggleCells(show, cells, true);
    };
    
}

