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
            if (mxUtils.isNode(cell.value))
            {
              return cell.getAttribute('label', '');
            }
            return '';
        };
        
        var cellLabelChanged = this.graph.cellLabelChanged;
        this.graph.cellLabelChanged = function(cell, newValue, autoSize)
        {
          if (mxUtils.isNode(cell.value))
          {
            // Clones the value for correct undo/redo
            var elt = cell.value.cloneNode(true);
            elt.setAttribute('label', newValue);
            newValue = elt;
          }

          cellLabelChanged.apply(this, arguments);
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
                || cell.getAttribute('cellType') === GraphSettings.CENTERBONE_VERTEX
                || cell.getAttribute('cellType') === GraphSettings.CENTERBONE_EDGE
                || cell.getAttribute('cellType') === GraphSettings.SIDEBONE_EDGE
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
            
            menu.addItem('Copy Styles', null, function(){
                canvas.onCopyStylesContextMenuClick(false);
            });
            
            menu.addItem('Paste Styles', null, function(){
                canvas.onPasteStylesContextMenuClick(false);
            });
            
            menu.addSeparator();
            
            menu.addItem('Copy Graph Settings', null, function(){
                canvas.onCopyGraphSettingsContextMenuClick(false);
            });
            
            menu.addItem('Paste Graph Settings', null, function(){
                canvas.onPasteGraphSettingsContextMenuClick(false);
            });
            
            menu.addSeparator();
            
            menu.addItem('Properties', null, function(){
                canvas.onPropertiesWindowOpen();
            });
        };
    };
}

