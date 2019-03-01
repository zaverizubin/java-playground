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
   
   this.edgeSlope = 75;
   
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
        var id = this.id;
        this.vertex = this.graph.insertVertex(this.parent, null, {toString:function(){return 'Cause-' + id},cellType:Constants.SIDEBONE_VERTEX},
                                             this.vertexX, this.vertexY,
                                             this.vertexWidth, this.vertexHeight, Constants.SIDEBONE_VERTEX_STYLE);
   }
   
   this.buildEdge = function(){
       var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(this.vertexX+ this.vertexWidth/2 + this.edgeSlope,  this.targetEdge.getGeometry().sourcePoint.y)
        
        var cell = new mxCell('', geometry, Constants.SIDEBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.source = this.vertex;
        cell.value = {toString:function(){return ''},cellType:Constants.SIDEBONE_EDGE};
        this.edge = cell;
        this.graph.addCell(cell);
   }
   
   this.delete = function(){
       this.graph.removeCells([this.vertex]);
   }
   
   this.isSelected = function(){
       return this.graph.isCellSelected(this.vertex);
   };
   
   this.isAboveCenterBone = function(){
       return this.vertex.getGeometry().y <  this.targetEdge.getGeometry().sourcePoint.y;
   };
   
   this.isRightOfBone = function(sideBone){
      return this.vertex.getGeometry().x > sideBone.getVertex().getGeometry().x;
   };
   
   this.moveToLeft = function(dx){
       this.graph.moveCells([this.vertex, this.edge], -dx, 0);
   };
   
   this.getVertex = function(){
       return this.vertex;
   };
   
   this.getEdge = function(){
       return this.edge;
   };
}

