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
        this.layoutMgr.getLayout = function(cell)
        {
            if (cell.getChildCount() > 0)
            {
                    return layout;
            }
        };
        this.layoutMgr.executeLayout(layout, this.graph.getDefaultParent())
        this.isLayoutSpecified = true;
    };
    
    clearLayout(){
        this.layoutMgr.getLayout = function(cell)
        {
            return null;
        };
        this.isLayoutSpecified = false;
    };
    
    
    
}

