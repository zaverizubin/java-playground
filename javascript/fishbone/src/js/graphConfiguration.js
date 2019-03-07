function GraphConfiguration(graphElement)
{
    this.canvas;
    
    this.graph;
    
    mxEvent.disableContextMenu(graphElement);
    
    mxGraph.prototype.isCellSelectable = function(cell)
    {
        var state = this.view.getState(cell);
        var style = (state !== null) ? state.style : this.getCellStyle(cell);
        return this.isCellsSelectable() && !this.isCellLocked(cell) && style['selectable'] !== 0;
    };
    
    this.init = function(graph, canvas){
        
        this.canvas = canvas;
        
        this.graph = graph;
        
        this.graph.setTooltips(true);
        
        this.graph.setCellsCloneable(false);
        
        this.graph.getTooltipForCell = function(cell)
        {
          if(cell.isVertex()){
            return Messages.VERTEX_TOOLTIP;
            };
        };

        this.graph.popupMenuHandler.autoExpand = true;

        this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
        {
            if(cell === null || cell.isEdge() 
              || cell.getValue().cellType === Constants.CENTERBONE_VERTEX){
                return;
            };
            
            menu.addItem('Delete', null, function(){
                canvas.onDeleteCauseClick();
            });
            
            menu.addItem('Swap', null, function(){
                canvas.onSwapClick();
            });

            menu.addItem('Flip', null, function(){
                canvas.onFlipClick();
            });
        };
    };
}

