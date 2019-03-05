function SideBone (canvas) {
   
   BaseBone.call(this, canvas);
   
   this.targetEdge;
   
   this.vertexX;
   
   this.vertexY;
   
   this.edgeSlope = 75;
   
   this.init = function (id, x, y, targetEdge) {
        BaseBone.prototype.init.call(this);
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
        this.applyCellStyle(this.vertex, this.canvas.getToolbar().getStyleAttributes());
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
   };
   
   this.buildVertex = function(){
        var id = this.id;
        this.vertex = this.graph.insertVertex(this.parent, null, 
                                            {toString:function(){return 'Cause-' + id},cellType:Constants.SIDEBONE_VERTEX, id:id},
                                            this.vertexX, this.vertexY,
                                            this.vertexWidth,
                                            this.vertexHeight,
                                            Constants.SIDEBONE_VERTEX_STYLE);
   }
   
   this.buildEdge = function(){
       var geometry = new mxGeometry();
        geometry.targetPoint = new mxPoint(this.vertexX + this.vertexWidth/2 + this.edgeSlope,
                                            this.targetEdge.getGeometry().sourcePoint.y);
        
        var cell = new mxCell('', geometry, Constants.SIDEBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.source = this.vertex;
        cell.value = {toString:function(){return ''},cellType:Constants.SIDEBONE_EDGE};
        this.edge = cell;
        this.graph.addCell(cell);
   };
   
   this.delete = function(){
       this.graph.removeCells([this.vertex]);
   };
   
   this.isSelected = function(){
       return this.graph.isCellSelected(this.vertex);
   };
   
   this.isAboveCenterBone = function(){
       return this.vertex.getValue().id %2 !== 0;
   };
   
   this.isRightOfBone = function(sideBone){
        return this.vertex.getValue().id > sideBone.getVertex().getValue().id;
   };
   
   this.move = function(dx){
       this.graph.moveCells([this.vertex, this.edge], dx, 0);
       this.vertex.getValue().id = dx < 0 ? this.vertex.getValue().id-2 : this.vertex.getValue().id+2;
   };
   
   this.flipBone = function(){
       
    this.vertex.getValue().id =  this.isAboveCenterBone()? this.vertex.getValue().id+1 : this.vertex.getValue().id -1;
    
    var yloc =  this.targetEdge.getGeometry().sourcePoint.y 
                + (this.targetEdge.getGeometry().sourcePoint.y-this.vertex.getGeometry().y)
                - this.vertex.getGeometry().height;
        
    var geometry =  new mxGeometry(this.vertex.getGeometry().x, yloc,
                                      this.vertex.getGeometry().width,
                                      this.vertex.getGeometry().height);
    
    this.graph.getModel().setGeometry(this.vertex, geometry);
};
   
   this.getVertex = function(){
       return this.vertex;
   };
   
   this.getEdge = function(){
       return this.edge;
   };
}

SideBone.prototype = Object.create(BaseBone.prototype);

