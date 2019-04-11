class GraphConfiguration
{
    constructor (graph, canvas, graphElement) {
        this.graph = graph;
        this.canvas = canvas;
        this.graphElement = graphElement;
        
        this.setGraphConstants();
        this.setGraphProperties();
        this.setGraphKeyHandlers();
        this.buildGraphFunctions();
        this.buildGraphContextMenu();
    };
    
    setGraphConstants(){
        mxConstants.HANDLE_FILLCOLOR = '#F44271';
        mxConstants.HANDLE_STROKECOLOR = '#000';
        mxConstants.VERTEX_SELECTION_COLOR = '#000';
        mxConstants.EDGE_SELECTION_COLOR = '#000';
        mxConstants.DEFAULT_HOTSPOT = 0.3;
        mxConstants.MIN_HOTSPOT_SIZE = 8;
        mxConstants.MAX_HOTSPOT_SIZE = 15;
        mxConstants.STYLE_AUTOSIZE = 1;
        mxConstants.HIGHLIGHT_COLOR = "#FF0000";
    };
    
    setGraphProperties(){
        
        mxVertexHandler.prototype.rotationEnabled = true;
        mxEvent.disableContextMenu(this.graphElement);
        mxGraph.prototype.isCellSelectable = function(cell)
        {
            var state = this.view.getState(cell);
            var style = (state !== null) ? state.style : this.getCellStyle(cell);
            return this.isCellsSelectable() && !this.isCellLocked(cell) && style['selectable'] !== 0;
        };
        
        new mxRubberband(this.graph);
        this.graph.setConnectable(true);
        this.graph.setTooltips(true);
        this.graph.setCellsCloneable(false);
        this.graph.vertexLabelsMovable = true;
        
    };
    
    setGraphKeyHandlers(){
        var graph = this.graph;
        var keyHandler = new mxKeyHandler(graph);
        keyHandler.bindKey(46, function(evt){
            graph.removeCells();
        });
    };
    
    buildGraphFunctions(){
        var graph = this.graph;
        this.graph.connectionHandler.createEdgeState = function(me)
        {
            var edge = graph.createEdge(null, null, null, null, null);
            return new mxCellState(graph.view, edge, graph.getCellStyle(edge));
        };
                                
        this.graph.convertValueToString = function(cell)
        {
            if (mxUtils.isNode(cell.value)){
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
       
    buildGraphContextMenu(){
        var canvas = this.canvas;
        this.graph.popupMenuHandler.autoExpand = true;
        this.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
        {
            menu.addItem('Delete', null, function(){
                canvas.onDeleteClick();
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

