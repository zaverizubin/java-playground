class GraphCellFolding{
    
    constructor(graph){
        this.graph = graph;
        this.defineCondition();
        this.definePosition();
        this.defineFoldEventHandler();
    };
    
    defineCondition(){
        this.graph.isCellFoldable = function(cell){
            return this.model.getOutgoingEdges(cell).length > 0;
        };
    };
    
    definePosition(){
        this.graph.cellRenderer.getControlBounds = function(state){
            if (state.control != null)
            {
                var oldScale = state.control.scale;
                var w = state.control.bounds.width / oldScale;
                var h = state.control.bounds.height / oldScale;
                var s = state.view.scale;			

                return new mxRectangle(state.x + state.width / 2 - w / 2 * s,
                        state.y + state.height + TreeNodeShape.prototype.segment * s - h / 2 * s,
                        w * s, h * s);
            }
            return null;
        };
    };

    defineFoldEventHandler(){
        var graph = this.graph;
        this.graph.foldCells = function(collapse, recurse, cells)
            {
                this.model.beginUpdate();
                try
                {
                    toggleSubtree(this, cells[0], !collapse);
                    this.model.setCollapsed(cells[0], collapse);

                    // Executes the layout for the new graph since
                    // changes to visiblity and collapsed state do
                    // not trigger a layout in the current manager.
                    layout.execute(graph.getDefaultParent());
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
        var graph = this.graph;
        this.graph.traverse(cell, true, function(vertex){
            if (vertex != cell)
            {
                cells.push(vertex);
            }
            // Stops recursion if a collapsed cell is seen
            return vertex == cell || !graph.isCellCollapsed(vertex);
        });

        this.graph.toggleCells(show, cells, true);
    };
    
}

