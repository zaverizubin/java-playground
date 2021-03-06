class GraphConfiguration
{
    constructor (graph, canvas, graphElement) {
        this.graph = graph;
        this.canvas = canvas;
        this.graphElement = graphElement;
        
        this.setGraphConstants();
        this.setGraphProperties();
        this.bindMouseHandlers();
        this.bindKeyHandlers();
        this.bindGraphHandlers();
        this.buildGraphPanningHandlers();
        this.buildShapeLabelChangedHandlers();
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
        mxConstants.GUIDE_COLOR = '#4f1325';
        mxConstants.GUIDE_STROKEWIDTH = 1;
    };
    
    setGraphProperties(){
       
        mxEvent.disableContextMenu(this.graphElement);
        
        var style = this.graph.stylesheet.getDefaultEdgeStyle();
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
        
        new mxRubberband(this.graph);
        this.graph.setConnectable(true);
        this.graph.setTooltips(true);
        this.graph.setCellsCloneable(false);
        this.graph.vertexLabelsMovable = true;
        this.graph.gridSize = 15;
        this.graph.zoomFactor = 1.05;
        this.graph.centerZoom = true;
        this.graph.setGridEnabled(true);
        this.graph.keepEdgesInBackground = true;
        this.graph.container.focus();
        
    };
    
    
    bindMouseHandlers(){
        var canvas = this.canvas;
        mxEvent.addMouseWheelListener(function (evt, up)
        {
            if(mxEvent.isAltDown(evt)){
                canvas.onMouseWheelZoomChange(up);
            }
        });
    };
    
    bindKeyHandlers(){
        var graph = this.graph;
        var keyHandler = new mxKeyHandler(graph);
        keyHandler.bindKey(46, function(evt){
            graph.removeCells();
        });
    }
    
    bindGraphHandlers(){
        mxGraph.prototype.isCellSelectable = function(cell)
        {
            var state = this.view.getState(cell);
            var style = (state !== null) ? state.style : this.getCellStyle(cell);
            return this.isCellsSelectable() && !this.isCellLocked(cell) && style['selectable'] !== 0;
        };
        
        mxVertexHandler.prototype.rotationEnabled = true;
        mxGraphHandler.prototype.guidesEnabled = true;
	mxGraphHandler.prototype.useGuidesForEvent = function(me)
        {
            return !mxEvent.isAltDown(me.getEvent());
        };
	
        mxEdgeHandler.prototype.snapToTerminals = true;
    };
    
    buildGraphPanningHandlers(){
        this.graph.setPanning(true);
        this.graph.panningHandler.useLeftButtonForPanning = false;
        this.graph.panningHandler.addListener(mxEvent.PAN_START, function() {
            this.graph.container.style.cursor = 'move'; 
        });
        this.graph.panningHandler.addListener(mxEvent.PAN_END, function() { 
            this.graph.container.style.cursor = 'default'; 
        });
        this.graph.panningHandler.ignoreCell = false;
    };
    
    buildShapeLabelChangedHandlers(){
        this.graph.convertValueToString = function(cell)
        {
            if (mxUtils.isNode(cell.value)){
                return cell.getAttribute('label', '');
            }
        };  
        
        var cellLabelChanged = this.graph.cellLabelChanged;
        this.graph.cellLabelChanged = function(cell, newValue, autoSize)
        {
          if (mxUtils.isNode(cell.value))
          {
            // Clones the value for correct undo/redo
            var elt = cell.value.cloneNode(true);
            elt.setAttribute('label', newValue);
            arguments[1] = elt;
          }

          cellLabelChanged.apply(this, arguments);
        };
    }
    
    buildGraphFunctions(){
        var graph = this.graph;
        this.graph.connectionHandler.createEdgeState = function(me)
        {
            var edge = graph.createEdge(null, null, null, null, null);
            return new mxCellState(graph.view, edge, graph.getCellStyle(edge));
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
            if(cell === null){
                menu.addItem('Toggle Grid', null, function(){
                    canvas.onToggleGrid();
                });
                menu.addItem('Toggle Guide', null, function(){
                    canvas.onToggleGuide();
                });
                return;
            }
            
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
            
            if(cell.isEdge()){
                menu.addSeparator();
                
                var submenu1 = menu.addItem('Edge Styles', null, null);
                
                menu.addItem('Rounded', null, function(){
                     canvas.onEdgeStyleChange(cell, 'rounded');
                }, submenu1);
                
                menu.addItem('Right Angle', null, function(){
                     canvas.onEdgeStyleChange(cell, 'rightangle');
                }, submenu1);
                
                menu.addSeparator(submenu1);
                
		menu.addItem('Elbow Connector', null, function(){
                     canvas.onEdgeStyleChange(cell, 'elbowEdgeStyle');
                }, submenu1);
                menu.addItem('Segment Connector', null, function(){
                   canvas.onEdgeStyleChange(cell, 'segmentEdgeStyle');         
                }, submenu1);
                menu.addItem('Orth Connector', null, function(){
                    canvas.onEdgeStyleChange(cell, 'orthogonalEdgeStyle');           
                }, submenu1);
                menu.addItem('Side To Side', null, function(){
                    canvas.onEdgeStyleChange(cell, 'sideToSideEdgeStyle');           
                }, submenu1);
                menu.addItem('Top To Bottom', null, function(){
                    canvas.onEdgeStyleChange(cell, 'topToBottomEdgeStyle');           
                }, submenu1);
                
            }
            
            if(cell.isVertex()){
                menu.addSeparator();
                
                menu.addItem('Details', null, function(evt){
                    canvas.onShapeDetailsClick();
                });
                
                menu.addSeparator();
                
                menu.addItem('Properties', null, function(){
                    canvas.onPropertiesClick();
                });
            };
            
        };
    };
}

