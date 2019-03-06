function LateralBone (canvas) {
   
    BaseBone.call(this, canvas);
   
    this.targetEdge;
   
    this.edgeX;
   
    this.edgeY;
   
   
    this.init = function (id, x, y, targetEdge) {
        BaseBone.prototype.init.call(this);
        this.id = id;
        this.edgeX = x;
        this.edgeY = y;
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
        this.buildEdge();
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildEdge = function(){
       var geometry = new mxGeometry();
       
        geometry.sourcePoint = new mxPoint(this.vertexX + this.vertexWidth/2 + this.edgeSlope,
                                            this.targetEdge.getGeometry().sourcePoint.y);
                                            
        geometry.targetPoint = new mxPoint(this.vertexX + this.vertexWidth/2 + this.edgeSlope,
                                            this.targetEdge.getGeometry().sourcePoint.y);
        
        var cell = new mxCell('', geometry, Constants.LATERALBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.value = {toString:function(){return ''},cellType:Constants.LATERALBONE_EDGE};
        this.edge = cell;
        this.graph.addCell(cell);
    };
   
    this.delete = function(){
       this.graph.removeCells([this.vertex]);
    };
   
    this.isSelected = function(){
       return this.graph.isCellSelected(this.vertex);
    };
   
    this.isLeftOfSideBone = function(){
       return this.vertex.getValue().id %2 !== 0;
    };
   
    this.isBelowBone = function(lateralBone){
        return this.vertex.getValue().id > lateralBone.getVertex().getValue().id;
    };
   
    this.moveBone = function(dx){
       this.graph.moveCells([this.vertex, this.edge], dx, 0);
       this.vertex.getValue().id = dx < 0 ? this.vertex.getValue().id-2 : this.vertex.getValue().id+2;
    };
   
    this.flipBone = function(){
       
        
    };
   
    this.swapBones = function(boneToSwap){
        
        
    };
   
    this.getVertex = function(){
        return this.vertex;
    };
   
    this.getEdge = function(){
        return this.edge;
    };
}

LateralBone.prototype = Object.create(BaseBone.prototype);

