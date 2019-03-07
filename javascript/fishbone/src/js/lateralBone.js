function LateralBone (canvas) {
   
    BaseBone.call(this, canvas);
   
    this.edgeX;
   
    this.edgeY;
   
    this.edgeTheta;
   
    this.spacerV = 50;
    
    this.edgeLength = 90;
    
    this.init = function (parentBone) {
        BaseBone.prototype.init.call(this);
        this.parentBone = parentBone;
        this.calculateGeometryDetails();

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
    
    this.calculateGeometryDetails = function(){
       
        this.counter = this.parentBone.getChildBones().length + 1;
        var leftChildBoneCount = this.parentBone.getLeftChildBones().length;
        var rightChildBoneCount = this.parentBone.getRightChildBones().length;
        
        var sourceEdgeX = this.parentBone.getVertex().getGeometry().x + this.parentBone.getVertex().getGeometry().width/2;
        var sourceEdgeY = this.parentBone.getVertex().getGeometry().y + this.parentBone.getVertex().getGeometry().height;
        
        var targetEdgeX = this.parentBone.getEdge().getGeometry().targetPoint.x;
        var targetEdgeY = this.parentBone.getEdge().getGeometry().targetPoint.y;
        
        this.edgeTheta = Math.atan(Math.abs((targetEdgeY - sourceEdgeY)/(targetEdgeX - sourceEdgeX)));
        
        if(leftChildBoneCount <= rightChildBoneCount){
            this.id = 1 + leftChildBoneCount*2;
            this.edgeX = targetEdgeX - (leftChildBoneCount + 1) * this.spacerV / Math.tan(this.edgeTheta);
            this.edgeY = this.parentBone.isAboveCenterBone()
                            ?targetEdgeY - (leftChildBoneCount + 1) * this.spacerV
                            :targetEdgeY + (leftChildBoneCount + 1) * this.spacerV;
        }else {
            this.id = 2 + rightChildBoneCount*2; 
            this.edgeX = targetEdgeX - (rightChildBoneCount + 1) * this.spacerV / Math.tan(this.edgeTheta);
            this.edgeY = this.parentBone.isAboveCenterBone()
                            ?targetEdgeY - (rightChildBoneCount + 1) * this.spacerV
                            :targetEdgeY + (rightChildBoneCount + 1) * this.spacerV;
        };
        
        
    };
    
    this.buildBone = function (){
        this.buildEdge();
        this.applyCellStyle(this.edge, this.canvas.getToolbar().getStyleAttributes());
    };
   
    this.buildEdge = function(){
        var id = this.id;
        var counter  = this.parentBone.getChildBones().length + 1;
        
        var valueObject =   {
                                toString:function(){return 'Detail-' + counter;},
                                cellType:Constants.LATERALBONE_EDGE,
                                id:id
                            };
                            
        var geometry = new mxGeometry();
        
        geometry.sourcePoint = (this.id%2 !==0) ? new mxPoint(this.edgeX - this.edgeLength, this.edgeY)
                                                :new mxPoint(this.edgeX + this.edgeLength, this.edgeY);
        geometry.targetPoint = new mxPoint(this.edgeX, this.edgeY);
        
        var cell = new mxCell(valueObject, geometry, Constants.LATERALBONE_EDGE_STYLE);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.parent = this.graphParent;
        this.edge = cell;
        this.graph.addCell(cell);
        
        
    };
   
    this.delete = function(){
       this.graph.removeCells([this.edge]);
    };
   
    this.isSelected = function(){
       return this.graph.isCellSelected(this.edge);
    };
   
    this.isLeftOfSideBone = function(){
       return this.edge.getValue().id %2 !== 0;
    };
   
    this.isBelowBone = function(lateralBone){
        return this.edge.getValue().id > lateralBone.getEdge().getValue().id;
    };
   
    this.moveBone = function(dx){
       this.graph.moveCells([this.edge], dx, 0);
       this.edge.getValue().id = dx < 0 ? this.edge.getValue().id-2 : this.edge.getValue().id+2;
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

