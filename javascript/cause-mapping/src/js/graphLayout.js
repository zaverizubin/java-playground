class GraphLayout{
    
      
    constructor(graph){
        this.graph = graph;
        this.isLayoutSpecified = false;
        this.layoutMgr = new mxLayoutManager(this.graph);
    };
    
    
    toggleLayout(isHorizontal){
        if(!this.isLayoutSpecified){
            this.useCompactTreeLayout(isHorizontal);
        }else{
            this.clearLayout();
        }
    };
    
    useCompactTreeLayout(isHorizontal){
        var layout = new mxCompactTreeLayout(this.graph, false);
        layout.useBoundingBox = false;
        layout.edgeRouting = false;
        layout.levelDistance = 50;
        layout.nodeDistance = 20;
        layout.horizontal = isHorizontal;
        this.layoutMgr.getLayout = function(cell){
            return layout;
        };
        this.layoutMgr.executeLayout(layout, this.graph.getDefaultParent())
        this.isLayoutSpecified = true;
        if(isHorizontal){
            var style = this.graph.stylesheet.getDefaultEdgeStyle();
            style[mxConstants.STYLE_EDGE] = mxEdgeStyle.SideToSide;
        }else{
            var style = this.graph.stylesheet.getDefaultEdgeStyle();
            style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
        }
        
    };
    
    clearLayout(){
        this.layoutMgr.getLayout = function(cell)
        {
            return null;
        };
        this.isLayoutSpecified = false;
    };
    
    
    
}

