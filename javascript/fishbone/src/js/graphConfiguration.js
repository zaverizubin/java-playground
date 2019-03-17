function GraphConfiguration(graphElement)
{
    this.canvas;
    
    this.graph;
    
    mxConstants.HANDLE_FILLCOLOR = '#f44271';
    mxConstants.HANDLE_STROKECOLOR = '#000';
    mxConstants.VERTEX_SELECTION_COLOR = '#000';
    mxConstants.EDGE_SELECTION_COLOR = '#000';
    
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
        
        this.setGraphProperties();
        this.buildGraphFunctions();
        this.buildPopupMenu();
    };
    
    this.setGraphProperties = function(){
        new mxRubberband(this.graph);
        this.graph.setTooltips(true);
        this.graph.setCellsCloneable(false);
        this.graph.vertexLabelsMovable = true;
    };
    
    this.buildGraphFunctions = function(){
        this.graph.convertValueToString = function(cell)
        {
            if(cell.value.label !== undefined){
                return cell.value.label;
            }
            return '';
        };
        this.graph.getTooltipForCell = function(cell){
            if(cell.isVertex()){return Messages.VERTEX_TOOLTIP;};
        };
    };
       
    this.buildPopupMenu = function(){
        var canvas = this.canvas;
        this.graph.popupMenuHandler.autoExpand = true;
        this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
        {
            if(cell === null 
                || cell.getValue().cellType === GraphSettings.CENTERBONE_VERTEX
                || cell.getValue().cellType === GraphSettings.CENTERBONE_EDGE
                || cell.getValue().cellType === GraphSettings.SIDEBONE_EDGE
                    ){
                
                menu.addItem('Properties', null, function(){
                    canvas.onPropertiesWindowOpen();
                });
                
                return;
            };
            
            menu.addItem('Delete', null, function(){
                canvas.onContextMenuDeleteClick();
            });
            
            menu.addItem('Swap', null, function(){
                canvas.onSwapClick();
            });

            menu.addItem('Flip', null, function(){
                canvas.onFlipClick();
            });
            
            menu.addSeparator();
            
            menu.addItem('Move to Front', null, function(){
                canvas.onReorderClick(false);
            });
            
            menu.addItem('Send to Back', null, function(){
                canvas.onReorderClick(true);
            });
            
            menu.addSeparator();
            menu.addItem('Properties', null, function(){
                canvas.onPropertiesWindowOpen();
            });
        };
    };
}

