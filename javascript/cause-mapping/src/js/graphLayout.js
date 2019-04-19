class GraphLayout{
    
    graph;
    isLayoutSpecified;
    layoutMgr;
    
    constructor(graph){
        this.graph = graph;
        this.isLayoutSpecified = false;
        this.layoutMgr = new mxLayoutManager(this.graph);
    };
    
    
    toggleLayout(){
        if(!this.isLayoutSpecified){
            this.useCompactTreeLayout();
        }else{
            this.clearLayout();
        }
    };
    
    useCompactTreeLayout(){
        var layout = new mxCompactTreeLayout(this.graph, false);
        layout.useBoundingBox = false;
        layout.edgeRouting = false;
        layout.levelDistance = 30;
        layout.nodeDistance = 10;
        
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

