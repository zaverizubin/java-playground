function SideBone (graph) {
   this.graph = graph;
   
   this.parent = this.graph.getDefaultParent();
   
   this.vertex;
   
   this.edge;
   
   this.targetEdge;
   
   this.id;
   
   this.vertexX;
   
   this.vertexY;
   
   this.vertexWidth = 100;
   
   this.vertexHeight = 50;
   
   this.init = function (id, x, y, targetEdge) {
        this.id = id;
        this.vertexX = x;
        this.vertexY = y;
        this.targetEdge = targetEdge;
        
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
        this.buildVertex();
        this.buildEdge();
   };
   
   this.buildVertex = function(){
       this.vertex = this.graph.insertVertex(this.parent, "v_" + this.id, 'Cause-' + this.id,
                                             this.vertexX, this.vertexY,
                                             this.vertexWidth, this.vertexHeight, Constants.VERTEX_STYLE);
   }
   
   this.buildEdge = function(){
       var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(this.vertexX+ this.vertexWidth/2 + 50,  this.targetEdge.getGeometry().sourcePoint.y)
        
        var cell = new mxCell('', geometry, Constants.OTHERBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.source = this.vertex;
        this.edge = cell;
        
        this.graph.addCell(cell);
   }
   
   this.getVertex = function(){
       return this.vertex;
   };
}

