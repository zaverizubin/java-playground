function LateralBone (graph) {
   this.graph = graph;
   
   this.parent = this.graph.getDefaultParent();
   
   this.vertex;
   
   this.id;
   
   this.vertexX;
   
   this.vertexY;
   
   this.vertexWidth = 150;
   
   this.vertexHeight = 50;
   
   this.init = function (id, x, y) {
        this.id = id;
        this.vertexX = x;
        this.vertexY = y;
        
        this.graph.getModel().beginUpdate();
        try
        {
            this.buildBone();
            this.graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [this.mainEdge]));
        }
        finally
        {
            this.graph.getModel().endUpdate();
        }
    };
    
   this.buildBone = function (){
       this.vertex = this.graph.insertVertex(this.parent, null, 'Cause-' + this.id, this.vertexX, this.vertexY, this.vertexWidth, this.vertexHeight);
   };
   
   this.getVertex = function(){
       return this.vertex;
   };
}

